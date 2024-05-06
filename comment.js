// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Import comment model
const Comment = require('./models/comment');

// Create a new comment
app.get('/create', async (req, res) => {
  try {
    const comment = new Comment({ comment: 'Hello World!' });
    await comment.save();
    res.send('Comment created');
  } catch (err) {
    res.send(err);
  }
});

// Read all comments
app.get('/read', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send(comments);
  } catch (err) {
    res.send(err);
  }
});

// Update a comment
app.get('/update/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    comment.comment = 'Hi World!';
    await comment.save();
    res.send('Comment updated');
  } catch (err) {
    res.send(err);
  }
});

// Delete a comment
app.get('/delete/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await comment.remove();
    res.send('Comment deleted');
  } catch (err) {
    res.send(err);
  }
});

// Start web server
app.listen(port, () => {
  console.log(`Web server started on http://localhost:${port}`);
});