const express = require('express')
const router = express.Router();
const passport = require('passport')
const postController = require('../../controller/postController')

//@route    GET api/posts/
//@desc     Fetch Posts
//@access   PUBLIC
router.get('/', postController.getPost)

//@route    GET api/posts/:id
//@desc     Fetch Posts
//@access   PUBLIC
router.get('/:id', postController.getPostById)

//@route    GET api/posts/:id
//@desc     Delete Posts
//@access   PRIVATE
router.delete('/:id', passport.authenticate('jwt', { session: false }), postController.deleteById)

//@route    POST api/posts/like/:id
//@desc     Like Post
//@access   PRIVATE
router.post('/like/:id', passport.authenticate('jwt', { session: false }), postController.likePost)

//@route    POST api/posts/unlike/:id
//@desc     Like Post
//@access   PRIVATE
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), postController.unlikePost)

//@route    POST api/posts/comment/:id
//@desc     Like Post
//@access   PRIVATE
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), postController.addComment)

//@route    POST api/posts/comment/:id
//@desc     Like Post
//@access   PRIVATE
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), postController.deleteComment)

//@route    POST api/posts/
//@desc     Create Posts
//@access   PRIVATE
router.post('/', passport.authenticate('jwt', { session: false }), postController.createPost)

module.exports = router;