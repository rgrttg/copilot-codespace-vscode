// create web server
// npm install express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// npm install cors
var cors = require('cors');
app.use(cors());

// npm install mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');

var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

// create a comment
app.post('/comments', function (req, res) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (err)
            res.send(err);
        res.json(req.body);
    });
});