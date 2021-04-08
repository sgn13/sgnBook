const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const ProfileController = require('../../controller/profileController')

router.get('/', passport.authenticate('jwt', { session: false }), ProfileController.getProfile)


//@route    GET api/profile/handle/:handle
//@desc     Get profile by handle 
//@access   PUBLIC

router.get('/handle/:handle', ProfileController.handle)


//@route    GET api/profile/user/:user_id
//@desc     Get profile by handle 
//@access   PUBLIC

router.get('/user/:user_id', ProfileController.user_id)

//@route    GET api/profile/all
//@desc     Get profile by handle 
//@access   PUBLIC
router.get('/all', ProfileController.allUser)

router.post('/postProfile', passport.authenticate('jwt', { session: false }), ProfileController.postProfile)

//@route    POST api/profile/experience
//@desc     Add experience to profile 
//@access   PRIVATE
router.post('/experience', passport.authenticate('jwt', { session: false }), ProfileController.postExperience)

//@route    POST api/profile/education
//@desc     Add education to profile 
//@access   PRIVATE
router.post('/education', passport.authenticate('jwt', { session: false }), ProfileController.postEducation)

//@route    DELETE api/profile/experience/:exp_id
//@desc     DELETE expereienc from profile 
//@access   PRIVATE
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), ProfileController.deleteExperience)

//@route    DELETE api/profile/education/:edu_id
//@desc     DELETE education from profile 
//@access   PRIVATE
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), ProfileController.deleteEducation)

//@route    DELETE api/profile/education/:edu_id
//@desc     DELETE education from profile 
//@access   PRIVATE
router.delete('/', passport.authenticate('jwt', { session: false }), ProfileController.deleteAll)

module.exports = router;