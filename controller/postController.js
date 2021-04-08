const Post = require('../models/Post')
const Profile = require('../models/Profile')
const mongoose = require('mongoose')

exports.getPost = (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404))
}

exports.getPostById = (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404))
}

exports.deleteById = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notAuthorized: "User not authorized to delete." })
                    }

                    // Delete

                    post.remove().then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json("Post not found"))
        })

}

exports.likePost = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then((post) => {
                    console.log(post);

                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyLiked: "User already liked the post" })
                    }

                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json("Post not found"))
        })

}

exports.unlikePost = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then((post) => {
                    console.log(post);

                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notLiked: "You have not liked this post yet" })
                    }

                    // get remove index 
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json(post))
                })
                .catch(err => res.status(404).json("Post not found"))
        })

}

exports.createPost = (req, res) => {
    const { user, text, name, avatar } = req.body;

    const newPost = new Post({
        user: req.user.id,
        text,
        name,
        avatar
    })
    newPost.save().then((post) => res.json(post))

}

exports.addComment = async (req, res) => {
    // const profile = await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)
    // post.comments
    const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    }
    post.comments.unshift(newComment);
    const savepost = await post.save()
    res.json(savepost)
}

exports.deleteComment = async (req, res) => {
    // const profile = await Profile.findOne({ user: req.user.id })
    const post = await Post.findById(req.params.id)

    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' })
    }
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    const savepost = await post.save()
    res.json(savepost)

}