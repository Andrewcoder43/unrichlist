const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb://localhost/your_blog_database', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Your routes will go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  excerpt: String,
  imageUrl: String
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;

const BlogPost = require('./models/blogPost'); // Adjust the path as needed

app.get('/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });
    
    if (!post) {
      return res.status(404).send('Blog post not found');
    }
    
    res.render('blogPost', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});