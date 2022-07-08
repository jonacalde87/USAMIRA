const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  base: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  datecreated: {
    type: Date, 
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Issue', issueSchema);
