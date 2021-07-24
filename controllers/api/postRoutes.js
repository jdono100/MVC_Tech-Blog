const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res, next) => {
  Post.findAll({
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
  })
    .then((allPosts) => res.json(allPosts))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
      next();
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
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
  }).then((onePost) => {
    if (!onePost) {
      res.status(404).json({ message: 'No posts could be found with that ID!'});
      return;
    }
    res.json(onePost);
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (res, req) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
    .then((createPost) => res.json(createPost))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put(':/id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((updatePost) => {
    if (!updatePost) {
      res.status(404).json({ message: 'No posts could be found with that ID!'});
      return;
    }
    res.json(updatePost);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete(':/id', (req, res) => {
  Post.destroy(
    {
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((deletePost) => {
    if (!deletePost) {
      res.status(404).json({ message: 'No posts could be found with that ID!'});
      return;
    }
    res.json(deletePost);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;