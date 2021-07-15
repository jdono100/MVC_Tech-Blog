const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'github']
      }
    ]
  }).then((allPosts) => {
    const allPosts = allPosts.map(posts => posts.get({ plain: true }));
    res.render('dashboard', { allPosts, loggedIn: true});
  }).catch((err) => {
    console.log(err);
    res.status(400).json();
  });
});

router.get('/new-post', auth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'github']
      }
    ]
  }).then((newPost) => {
    const post = newPost.map(post => post.get({ plain: true }));
    res.render('new-post', { post, loggedIn: true});
  }).catch((err) => {
    console.log(err);
    res.status(400).json();
  });
});

router.get('/edit/:id', auth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'created_at', 'post_text'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github']
        }
      }, 
      {
        model: User,
        attributes: ['username', 'github']
      }
    ]
  }).then((editPost) => {
    if (!editPost) {
      res.status(400).json({ message: 'No posts could be found with that ID!'});
      return;
    }
    const post = editPost.get({ plain: true });

    res.render('edit-post', {
      post,
      loggedIn: true
    });
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', auth, (req, res) => {
  Post.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then((postDelete) => {
    if (!postDelete) {
      res.status(400).json({ message: 'No posts could be found with that ID!' });
      return;
    }
    res.json(postDelete);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;