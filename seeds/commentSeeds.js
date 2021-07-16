const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'The real answer for these questions is incredibly boring',
    username: 'bearomnous',
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: 'Woohooooo',
    username: 'antom99',
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: 'Thank god, that feature was so annoying',
    username: 'johnmarston',
    user_id: 4,
    post_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;