import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import WriteblogImg from "../assets/blogwrite.png"
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Postblogs = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const userEmail = localStorage.getItem("userEmail");  
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(reader.result); 
  };
  reader.readAsDataURL(file);
};


  const handlePost = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return alert("You must be logged in to post a blog.");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/blogs/addblogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image, userEmail }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Blog posted!");
        setTitle('');
        setDescription('');
        setImage(null);
      } else {
        alert(result.message || "Failed to post blog.");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  const textFieldStyle = {
    '& .MuiInputBase-input': { color: 'black' },
    '& .MuiInputLabel-root': { color: 'black' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    }
  };

  return (
    <div className='postblog' style={{ backgroundColor: '#FFB6C1', height: '100vh' }}>
      <h1 onClick={() => navigate('/')} style={{ padding: '10px', cursor: 'pointer', fontWeight: 'bold', color:'white' }}>{"<"}</h1>
      <Box className='inputbox'  sx={{ maxWidth: 600, margin: 'auto', p: 3, border:'1px solid white', borderRadius:'6px',backgroundColor:'white'}}>
        <Typography style={{ color: 'purple', fontWeight: 'bold' }} variant="h4" gutterBottom>
          Create Blogs Here
          <img style={{ height: '90px', marginTop: '-1.5%' }} src={WriteblogImg} alt="" />
        </Typography>

        <TextField style={{border:'1px solid black', borderRadius:'4px'}} label="Blog Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" sx={textFieldStyle} />
        <TextField style={{border:'1px solid black', borderRadius:'4px'}} label="Blog Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" sx={textFieldStyle} />

          {image && (
            <img
            src={image}
            alt="Uploaded Preview"
            style={{
            width: "100%",
            maxHeight: "150px",
            marginTop: "10px",
             borderRadius: "8px",
             objectFit: "cover",
          }}
           />
          )}

        <Button variant="outlined" component="label" sx={{ mt: 2, color: 'white', backgroundColor: 'darkcyan' }}>
          Upload Blog Image
          <input className='imageup' type="file" accept="image/*" hidden onChange={handleImageUpload} />
        </Button>

        <Button variant="contained" color="primary" onClick={handlePost} sx={{ mt: 2, ml: 3 }}>
          Post Blog
        </Button>

        <Button onClick={() => navigate('/yourblogs')} style={{ backgroundColor: 'purple', color: 'white', marginTop: '3%', marginLeft:'5%' }}>
          View Blogs
        </Button>
      </Box>
    </div>
  );
};

export default Postblogs;
