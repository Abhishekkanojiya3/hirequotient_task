const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middlewares/authMiddleware');

// Profile routes
router.post('/profile', authMiddleware, userProfileController.createProfile);
router.get('/profile', authMiddleware, userProfileController.getProfile);
router.put('/profile', authMiddleware, userProfileController.updateProfile);

// Post routes
router.post('/post', authMiddleware, userProfileController.createPost);
router.get('/post/:postId', authMiddleware, userProfileController.getPost);
router.put('/post/:postId', authMiddleware, userProfileController.updatePost);

// Comment routes
router.post('/comment', authMiddleware, userProfileController.createComment);
router.get('/comment/:commentId', authMiddleware, userProfileController.getComment);
router.put('/comment/:commentId', authMiddleware, userProfileController.updateComment);

module.exports = router;