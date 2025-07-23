import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import SportsImg from "../assets/sports.jpg";
import CelebImg from "../assets/Movie-news.jpg";
import AddImg from "../assets/AddImg.png";
import bootcampImg from "../assets/bootcamp.png";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Home = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAd, setShowAd] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const handleSelect = (selectedIndex) => setActiveIndex(selectedIndex);
  const backgroundClass = activeIndex === 0 ? 'background-sports' : 'background-movies';

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/blogs/getblogs`);
        const json = await res.json();
        const allBlogs = Array.isArray(json.data) ? json.data : [];
        setBlogs(allBlogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchUserBlogs();
  }, []);

  useEffect(() => {
    setShowAd(true);
    const initialTimeout = setTimeout(() => setShowAd(false), 1 * 60 * 1000);

    const showAdInterval = setInterval(() => {
      setShowAd(true);
      setTimeout(() => setShowAd(false), 1 * 60 * 1000);
    }, 30 * 60 * 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(showAdInterval);
    };
  }, []);

  return (
    <div className='homediv' style={{ marginTop: '-4.5%',}}>
      <div>
        <div className="Links">
          <li style={{ color: 'purple' }}>Home</li>
          <li onClick={() => navigate('/postblogs')}>Post Blogs</li>
          <li onClick={() => navigate('/yourblogs')}>Your Blogs</li>
        </div>
        <hr className='lines' />
      </div>

      <div className="background-wrapper">
        <div className={`background-layer ${backgroundClass}`}></div>
        <div className="background-content">
          <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block"
                src={SportsImg}
                alt="Sports News"
                style={{ height: '200px', cursor: 'pointer', width: '100%' }}
                onClick={() => navigate('/sports')}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block"
                src={CelebImg}
                alt="Movie News"
                style={{ height: '200px', cursor: 'pointer', width: '100%' }}
                onClick={() => navigate('/movies')}
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {showAd && (
        <div className='deskdiv'>
          <div className='firstadd' style={{
            border: '1px solid wheat',
            width: '97%',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '1.5%',
            marginTop: '2%',
            borderRadius: '6px',
            backgroundColor: 'wheat',
            alignItems: 'center'
          }}>
            <h5 className='addhead' style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: 'purple',
              marginTop: '5%'
            }}>
              Make money by creating new content and get more rewards
            </h5>
            <img className='addImg' src={AddImg} alt="Ad promotion" />
            <h6 className='addpara' style={{ textAlign: 'center' }}>
              What are you waiting for? Start earning now
            </h6>
          </div>

          <div style={{
            border: '1px solid wheat',
            width: '97%',
            borderRadius: '6px',
            backgroundColor: 'wheat',
            padding: '10px',
            marginLeft: '1.5%'
          }} className='timeradd'>
            <h5 className='timehead' style={{
              color: 'blue',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              Join our content creation bootcamp for just <span style={{ color: 'red' }}>₹299</span> and get certified!
            </h5>
            <p className='timepara' style={{
              color: '#FF1493',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              Offer valid till <span style={{ backgroundColor: 'red', color: 'white' }}>1st August 2025</span>
            </p>
            <a className='anchtag' href="#" style={{ display: 'block', textAlign: 'center', color: 'blue' }}>
              Register Now and become a pro
            </a>
            <img className='bootcampimg' src={bootcampImg} alt="Bootcamp promotion" />
          </div>
        </div>
      )}

      <h3 style={{ fontFamily: "fantasy", fontWeight: '400', color: 'green', padding:'20px', marginLeft: '2%', }}>Latest Blogs :</h3>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding:'30px' }}>
        {blogs.length === 0 ? (
          <Typography>No blogs found.</Typography>
        ) : (
          blogs.map((blog) => (
            <Card key={blog._id} sx={{ width: 300, backgroundColor: '#f4f4f4', boxShadow: 1, marginLeft:'1%'}}>
              {blog.image && (
                <CardMedia sx={{
                      height: 220,
                      width: 250,
                      objectFit: 'cover',
                      padding:'5px',
                      margin: 'auto',
                      // borderRadius: 2,
              }} component="img" height="220" width="280" image={blog.image} alt="Blog" />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>{blog.title}</Typography>
                <Typography variant="body2" sx={{ marginTop: '8px' }}>{blog.description}</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color:'blue' }}>
                  Posted on: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown'}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block', color:'tomato'  }}>
                  Uploaded by: {blog.userEmail}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
};

export default Home;
