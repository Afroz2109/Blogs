import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const userEmail = localStorage.getItem("userEmail");

  const navigate= useNavigate()

useEffect(() => {

  const fetchUserBlogs = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/blogs/getblogs`);
      const json = await res.json();

      const allBlogs = Array.isArray(json.data) ? json.data : []; 
      console.log("All Blogs:", allBlogs);

      const userEmail = localStorage.getItem("userEmail");
      console.log("Logged-in User:", userEmail);

      const userBlogs = allBlogs.filter(blog => blog.userEmail === userEmail);
      console.log("Filtered Blogs:", userBlogs);

      setBlogs(userBlogs);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  fetchUserBlogs();
}, []);



  const startEditing = (index) => {
    setEditIndex(index);
    setEditedTitle(blogs[index].title);
    setEditedDescription(blogs[index].description);
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/blogs/updateblogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          image: blogs.find(b => b._id === id)?.image || '',
        }),
      });

      const updated = await res.json();
      if (updated.success) {
        setBlogs(prev => prev.map(blog => blog._id === id ? updated.updatedBlog : blog));
        setEditIndex(null);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/api/v1/blogs/deleteblogs/${id}`, { method: "DELETE" });
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div style={{ backgroundColor: '' }}>
      <h1 onClick={() => navigate('/postblogs')} style={{ padding: '2px', cursor: 'pointer', fontWeight: 'bold' }}>{"<"}</h1>
      <Box sx={{ padding: 1 }}>
        <Typography style={{fontWeight:'bold', color:'#E75480'}} variant="h4" gutterBottom>Your Blogs</Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {blogs.length === 0 ? (
            <Typography>No blogs found.</Typography>
          ) : (
            blogs.map((blog, index) => (
              <Card className='cardblog' key={blog._id} sx={{ width: 350, backgroundColor: '', boxShadow: '2#E75480' }}>
                {blog.image && (
                  <CardMedia 
                  sx={{
                      height: 220,
                      width: 250,
                      objectFit: 'cover',
                      padding:'5px',
                      margin: 'auto',
                      borderRadius: 2,
              }} component="img" height="220" width="280" image={blog.image} alt="Blog" />
              )}
                <CardContent>
                  {editIndex === index ? (
                    <>
                      <TextField value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} label="Title" fullWidth margin="dense" />
                      <TextField value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} label="Description" multiline rows={3} fullWidth margin="dense" />
                      <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={() => handleUpdate(blog._id)}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ fontSize: '1rem' }}>{blog.title}</Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>{blog.description}</Typography>
                       <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color:'#1167b1' }}>
                        Posted on: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown'}
                      </Typography>
                      <Typography variant="caption" sx={{ mt: 1, display: 'block',color:'tomato' }}>Uploaded by: {blog.userEmail}</Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button style={{backgroundColor:'green', color:'white'}} variant="outlined" size="small" onClick={() => startEditing(index)}>Edit</Button>
                        <Button style={{backgroundColor:'red', color:'white'}} variant="outlined" color="error" size="small" onClick={() => handleDelete(blog._id)}>Delete</Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </div>
  );
};

export default YourBlogs;
