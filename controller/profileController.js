const User = require('../models/User')
const Profile = require('../models/Profile')

exports.getProfile = async (req, res) => {
    const user_id = await Profile.findOne({ user: req.user.id })
    // console.log(user_id, "user id ");

    if (!user_id) {
        res.status(400).json("There is no profile for this.")
    }
    else {
        res.json(user_id)
    }
}

exports.postProfile = async (req, res) => {
    let profileFields = {}
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }

    //social
    profileFields.social = {}
    if (req.body.youtube) profileFields.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.instagram = req.body.instagram;

    //
    if (req.body.youtube) profileFields.youtube = req.body.youtube;
    // if (req.body.youtube) profileFields.youtube = req.body.youtube;


    // const profileUser = Profile.findOne({ user: req.user.id })

    // if (profileUser) {
    //     const updatedProfile = Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
    //     res.json(updatedProfile)
    // }

    // const checkHandle = Profile.findOne({ handle: profileFields.handle })

    // if (checkHandle) {
    //     // errors.handle = 'That handle already exists';
    //     res.status(400).json("errors");
    // }

    const savedProfile = await new Profile(profileFields).save();

    res.json(savedProfile)



    // const response = await Profile.create(req.body)
    // res.json({ response })


}

exports.handle = async (req, res) => {
    const profile = await Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
    if (!profile) {
        res.status(400).json('There is no profile for this user')
    }
    res.json(profile)
}

exports.user_id = async (req, res) => {
    const profile = await Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
    if (!profile) {
        res.status(400).json('There is no profile for this user')
    }
    res.json(profile)
}


exports.allUser = async (req, res) => {
    const profile = await Profile.find()
        .populate('user', ['name', 'avatar'])
    if (!profile) {
        res.status(400).json('There is no profile for this user')
    }
    res.json(profile)
}

exports.postExperience = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile))
    }
}

exports.postEducation = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile))
    }
}

exports.deleteExperience = async (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

            //splice out of array
            profile.experience.splice(removeIndex, 1);

            profile.save().then(profile => res.json(profile))

        })
        .catch(err => res.status(404).json(err))
}


exports.deleteEducation = async (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

            //splice out of array
            profile.education.splice(removeIndex, 1);

            profile.save().then(profile => res.json(profile))

        })
        .catch(err => res.status(404).json(err))
}

exports.deleteAll = async (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json(err))
}
