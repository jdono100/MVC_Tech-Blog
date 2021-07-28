const router = require('express').Router();
const {
  Post,
  User,
  Comment
} = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res, next) => {
  Post.findAll({
      attributes: ['id', 'title', 'post_text', 'created_at', 'updated_at'],
      include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at', 'updated_at'],
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
    attributes: ['id', 'title', 'post_text', 'created_at', 'updated_at'],
    include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at', 'updated_at'],
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
      res.status(404).json({
        message: 'No posts could be found with that ID!'
      });
      return;
    }
    res.json(onePost);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', async (req, res) => {
  await Post.create({
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

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (req.session.user_id == post.user_id) {
      post.title = req.body.title;
      post.post_text = req.body.post_text;
      post.save();
      res.status(200).json({
        message: "Post Updated"
      })
    } else {
      res.status(400).json({
        message: "Not your post to update"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
})

module.exports = router;