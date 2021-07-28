const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: { 
      exclude: ['password'] 
    }
  })
    .then((allUsers) => res.json(allUsers))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
      next();
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
      next();
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
      req.session.logged_in = true;
      res.json(createUser);
    });
  });
});

router.put('/:id', async (req, res) => {
  try {
  const updateUser = await User.update(req.body,
    {
      individualHooks: true,
      where: {
        id: req.params.id
      }
  })
  if (!updateUser[0]) {
    res.status(404).json({ message: 'No users could be found with that ID!' });
    return;
  }
  res.json(updateUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

router.delete('/:id', async(req, res) => {
  try {
  const deleteUser = await User.destroy({
    where: {
      id: req.params.id
    }
  })
  if (!deleteUser) {
    res.status(404).json({ message: 'No users could be found with that ID!' });
    return;
  }
  res.json(deleteUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = userData.checkPw(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;