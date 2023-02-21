const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic: {
        type: String,
    },
    description: {
        type: String,
    },
    posted_at: {
        type: Date,
        default: Date.now()
    },
    posted_by: {
        type: String,
    }
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;