const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_text',
      'created_at'
    ],
    include: [
      {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username', 'github'],
        }
      },
      {
        model: User,
        attributes: ['username', 'github'],
      }
    ]
  }).then((allPosts) => {
    const allPosts = allPosts.map(post => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  }).catch((err) => {
    console.log(err);
    res.status(400).json();
  });
});

router.get('/post/:id', (req, res) => {
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
          attributes: ['username', 'github'],
        }
      },
      {
        model: User,
        attributes: ['username', 'github'],
      }
    ]
  }).then((getPostById) => {
    if (!getPostById) {
      res.status(400).json({ message: 'No posts could be found with that ID!'});
      return;
    }
    const onePost = getPostById.get({ plain: true});
    res.render('onePost', {
      onePost,
      loggedIn: req.session.loggedIn
    });
  }).catch((err) => {
    console.log(err);
    res.status(400).json();
  })
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('register');
});

module.exports = router;