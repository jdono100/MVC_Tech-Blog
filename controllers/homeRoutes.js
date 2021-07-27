const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
  const postData = await Post.findAll({
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
  })
  const posts = postData.map(post => post.get({ plain: true }));
  res.render('homepage', {
    posts,
    user_id: req.session.user_id,
    loggedIn: req.session.loggedIn
  });
  } catch (err) {
    console.log(err);
    res.status(400).json();
  };
});

router.get('/post/:id', async (req, res) => {
  try {
  const getPostById = await Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'created_at', 'post_text'],
    include: [
      {
        model: User,
        attributes: ['username', 'github'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github'],
        }
      }
    ]
  })
  if (!getPostById) {
    res.status(400).json({ message: 'No posts could be found with that ID!'});
    return;
  }
  const onePost = getPostById.get({ plain: true});
  res.render('post', {
    onePost,
    loggedIn: req.session.loggedIn
  });
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  if(!req.session.loggedIn) {
    res.redirect('/');
    return;
  } else {
    res.render('dashboard');
  }
})

module.exports = router;