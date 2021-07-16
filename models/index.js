const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, { onDelete: 'cascade', hooks: true });
Post.belongsTo(User);

User.hasMany(Comment, { onDelete: 'cascade', hooks: true });
Comment.belongsTo(User);

Post.hasMany(Comment, { onDelete: 'cascade', hooks: true });
Comment.belongsTo(Post);



module.exports = { User, Post, Comment };