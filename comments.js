// create web server
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

// Use the body-parser middleware to parse the body of the request
app.use(bodyParser.json())

// Path: /comments
app.get('/comments', (req, res) => {
    // read the comments.json file
    const comments = fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8')
    // send the comments as a response
    res.send(comments)
})

// Path: /comments
app.post('/comments', (req, res) => {
    // read the comments.json file
    const comments = fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8')
    // parse the comments to an array
    const commentsArray = JSON.parse(comments)
    // add a new comment to the array
    commentsArray.push({
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment
    })
    // write the updated comments to the comments.json file
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(commentsArray))
    // send a response
    res.send('Comment added!')
})

// Path: /comments
app.delete('/comments/:id', (req, res) => {
    // read the comments.json file
    const comments = fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8')
    // parse the comments to an array
    const commentsArray = JSON.parse(comments)
    // find the index of the comment with the id from the URL
    const commentIndex = commentsArray.findIndex(comment => comment.id === req.params.id)
    // remove the comment from the array
    commentsArray.splice(commentIndex, 1)
    // write the updated comments to the comments.json file
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(commentsArray))
    // send a response
    res.send('Comment deleted!')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})