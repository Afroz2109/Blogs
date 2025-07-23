import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Movies = () => {
  const [sportBlog, setSportBlogs] = useState([]);
  const [sport, setSport] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          'https://newsdata.io/api/1/news?apikey=pub_ac56979bb60347a2a3fb37d995dfc38c&q=movies&language=en&category=entertainment'
        );
        setSportBlogs(res.data.results || []);
      } catch (error) {
        console.error('Error fetching News', error);
      }
    };

    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setSport(storedBlogs);

    fetchNews();
  }, []);

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontFamily: 'fantasy', fontWeight: '400' }}>Movies Blogs</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          {sport.map((blog, index) => (
            <Card key={`blog-${index}`} sx={{ width: 300, backgroundColor: '#f4f4f4', boxShadow: 3 }}>
              {blog.image && (
                <CardMedia component="img" height="160" image={blog.image} alt="Blog" />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '8px' }}>
                  {blog.description}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '8px', fontStyle: 'italic' }}>
                  Uploaded on: {blog.uploadDate}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {sportBlog.map((item, index) => (
            <Card key={`news-${index}`} sx={{ width: 300, backgroundColor: '#f4f4f4', boxShadow: 3 }}>
              {item.image_url && (
                <CardMedia component="img" height="160" image={item.image_url} alt="news" />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '8px' }}>
                  {item.description}
                </Typography>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    marginTop: '10px',
                    color: '#1976d2',
                    fontStyle: 'normal',
                  }}
                >
                  View Full Blog →
                </a>
                <Typography variant="body2" sx={{ marginTop: '8px' }}>
                  {item.pubDate || item.time}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
