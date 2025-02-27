// Create web server
// Create a web server that listens on port 3000 and serves the following routes:
// GET /comments - returns a list of comments
// POST /comments - creates a new comment
// GET /comments/:id - returns a single comment with the id
// PUT /comments/:id - updates a comment with the id
// DELETE /comments/:id - deletes a comment with the id
// The comments data structure should be an array of objects with the following keys:
// id: a unique id
// username: the username of the person who created the comment
// comment: the comment content
// date: the date the comment was created
// The date should be generated using the Date object in JavaScript.
// You can use the express.js library to help you build the web server.

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let comments = [
    {
        id: 1,
        username: 'user1',
        comment: 'Comment 1',
        date: new Date()
    },
    {
        id: 2,
        username: 'user2',
        comment: 'Comment 2',
        date: new Date()
    },
    {
        id: 3,
        username: 'user3',
        comment: 'Comment 3',
        date: new Date()
    }
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        username: req.body.username,
        comment: req.body.comment,
        date: new Date()
    };
    comments.push(newComment);
    res.json(newComment);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        res.json(comment);
    }
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        comment.username = req.body.username;
        comment.comment = req.body.comment;
        res.json(comment