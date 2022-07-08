const express = require('express');
const postsRouter = express.Router();
const Issue = require('../models/posts');

// Get all issues route
postsRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

// Get Posts by created by the user
postsRouter.get('/user/:userId', (req, res, next) => {
  Issue.find({ user: req.params.userId }, (err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

// Add new Posts Route
postsRouter.post('/', (req, res, next) => {
  req.body.user = req.user._id;
  const newIssue = new Issue(req.body);
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedIssue);
  });
});

// Delete Posts by Post ID Route and only by the creator of the post
postsRouter.delete('/:issueId', (req, res, next) => {
  Issue.findOneAndRemove(
    { _id: req.params.issueId, user: req.user._id },
    (err, deletedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Post from ${deletedIssue.base} deleted by ${req.user.username}`);
    }
  );
});

// Update posts by PostsID and only by the creator of the post
postsRouter.put('/:issueId', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Post from ${updatedIssue.base} updated by ${req.user.username}`);
    }
  );
});

// upvote Route for userID
postsRouter.put('/:issueId/upvote', (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      { $pull: { downVotes: req.user._id }, $addToSet: { upVotes: req.user._id } },
      { new: true },
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(200).send(updatedIssue);
      }
    );
  });


// downvote Route for userID
postsRouter.put('/:issueId/downvote', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    { $pull: { upVotes: req.user._id }, $addToSet: { downVotes: req.user._id } },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedIssue);
    }
  );
});

// delete vote Route for userID
postsRouter.put('/:issueId/novote', (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    { $pull: { upVotes: req.user._id, downVotes: req.user._id } },
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(updatedIssue);
    }
  );
});

module.exports = postsRouter;
