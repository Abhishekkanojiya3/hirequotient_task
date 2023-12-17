const User = require('../Models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Profiles CRUD operations

const createProfile = async(req, res) => {
    try {
        const { userId, bio, website } = req.body;

        const profile = new Profile({
            user: userId,
            bio,
            website,
        });

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getProfile = async(req, res) => {
    try {
        const { userId } = req.user;

        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const updateProfile = async(req, res) => {
    try {
        const { userId } = req.user;
        const { bio, website } = req.body;

        const profile = await Profile.findOneAndUpdate({ user: userId }, { $set: { bio, website } }, { new: true });

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Posts CRUD operations

const createPost = async(req, res) => {
    try {
        const { userId, title, content } = req.body;

        const post = new Post({
            user: userId,
            title,
            content,
        });

        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getPost = async(req, res) => {
    try {
        const postId = req.params.postId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const updatePost = async(req, res) => {
    try {
        const postId = req.params.postId;
        const { title, content } = req.body;

        const post = await Post.findByIdAndUpdate(
            postId, { $set: { title, content } }, { new: true }
        );

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

// Comments CRUD operations

const createComment = async(req, res) => {
    try {
        const { userId, postId, text } = req.body;

        const comment = new Comment({
            user: userId,
            post: postId,
            text,
        });

        await comment.save();

        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getComment = async(req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const updateComment = async(req, res) => {
    try {
        const commentId = req.params.commentId;
        const { text } = req.body;

        const comment = await Comment.findByIdAndUpdate(
            commentId, { $set: { text } }, { new: true }
        );

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    createPost,
    getPost,
    updatePost,
    createComment,
    getComment,
    updateComment,
};