const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const { create } = require('../../models/User');
const auth = require('../../utils/auth');

router.get('/', (res) => {
  User.findAll({
    attributes: { 
      exclude: ['password'] 
    }
  })
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { 
      exclude: ['password']
    },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_text', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then((oneUser) => {
      if (!oneUser) {
        res.status(404).json({ message: 'No users could be found with that ID!' });
        return;
      }
      res.json(oneUser);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    github: req.body.github
  }).then((createUser) => {
    req.session.save(() => {
      req.session.user_id = createUser.id;
      req.session.username = createUser.username;
      req.session.github = createUser.github;
      req.session.loggedIn = true;
      res.json(createUser);
    });
  });
});

router.put('/:id', auth, (req, res) => {
  User.update(req.body,
    {
      individualHooks: true,
      where: {
        id: req.params.id
      }
  }).then((updateUser) => {
    if (!updateUser[0]) {
      res.status(404).json({ message: 'No users could be found with that ID!' });
      return;
    }
    res.json(updateUser);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', auth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleteUser) => {
    if (!deleteUser) {
      res.status(404).json({ message: 'No users could be found with that ID!' });
      return;
    }
    res.json(deleteUser);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
})

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((userLogin) => {
    if (!userLogin) {
      res.status(400).json({ message: 'No users could be found with that ID!' });
      return;
    }
    const pwCheck = userLogin.checkPw(req.body.password);
    if (!pwCheck) {
      res.status(400).json({ message: 'Incorrect password'});
      return;
    }
    req.session.save(() => {
      req.session.user_id = userLogin.id;
      req.session.username = createUser.username;
      req.session.github = createUser.github;
      req.session.loggedIn = true;
      res.json({ user: userLogin, message: 'Login successful!'});
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;