const { Post } = require('../models');

const postData = [
  {
    title: 'Java or JavaScript',
    post_text: 'Which one came first? Which is better? Why is coffee/an Indonesian island a part of the name of two integral programming languages? Who the heck copied my homework?',
    user_id: 1
  },
  {
    title: 'TCG Price Tracker reaches a trillion page views',
    post_text: 'The boys have done it again. Their crazy amazing price tracker for Pokemon Trading Cards now has over a quadrillion page views every day.',
    user_id: 2
  },
  {
    title: 'Twitter removing fleets',
    post_text: "The dumbest gimmick on Twitter finally comes to an end. They tried very hard to replicate the success of 'stories' found on Instagram and Snapchat, when all anybody wants to do on Twitter is either laugh or get angry. Goodbye fleets, you won't be missed.",
    user_id: 5
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;