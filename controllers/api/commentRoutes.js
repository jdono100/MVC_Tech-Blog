const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll(req.body)
    .then((comments) => res.json(comments))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', auth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then((createComment) => res.json(createComment))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete(':/id', auth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleteComment) => {
    if (!deleteComment) {
      res.status(404).json({ message: 'No comments could be found with that ID!'});
      return;
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;