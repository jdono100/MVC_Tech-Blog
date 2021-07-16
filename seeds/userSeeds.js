const { User } = require('../models');

const userData = [
  {
    username: 'antom99',
    github: 'AnthonyKrueger',
    email: 'wonderpancakes@gmail.com',
    password: 'Password1'
  }, 
  {
    username: 'bearomnous',
    github: 'jdono100',
    email: 'jdono100@gmail.com',
    password: 'Password2'
  },
  {
    username: 'yeet5000',
    github: 'yeeeeeeeeeehaw',
    email: 'yeet5000@gmail.com',
    password: 'Password3'
  },
  {
    username: 'johnmarston',
    github: 'ineedredemption',
    email: 'iluvabigailandjack@gmail.com',
    password: 'Password4'
  },
  {
    username: 'jimmer67',
    github: 'jimboslice',
    email: 'jamesjimjimothy@gmail.com',
    password: 'Password5'
  }
];

const seedUsers = async () => {
  // Individual creates instead of bulkCreate to make sure passwords are being hashed
  await User.create(userData[0]);
  await User.create(userData[1]);
  await User.create(userData[2]);
  await User.create(userData[3]);
  await User.create(userData[4]);
}

module.exports = seedUsers;