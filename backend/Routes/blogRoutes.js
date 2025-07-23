const express= require('express')
const { getBlogs, addBlogs, updateBlogs, deleteBlogs } = require('../Controllers/blogController');

const app = express()

const blogRouter= express.Router();

blogRouter.get('/getblogs', getBlogs);

blogRouter.post('/addblogs', addBlogs );

blogRouter.put('/updateblogs/:id', updateBlogs);

blogRouter.delete('/deleteblogs/:id', deleteBlogs)


module.exports = blogRouter;