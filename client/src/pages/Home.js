import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@mui/material';
import vid1 from "../assets/video10.mp4"
import vid2 from "../assets/zabefest.mp4"
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!!user) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      const handlePopState = (event) => {
        if (location.pathname === '/home') {
          navigate('/home', { replace: true });
        }
      };

      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [user, navigate, location]);


  return (
    <div>
      <Navbar />
      <div style={{ overflow: 'hidden' }}>
        <div className="home_video_super_container">
          <img style={{ zIndex: -1, position: "absolute", minWidth: '100%', maxHeight: '100vh', objectFit: 'cover' }} src="./Background.png" />
          <div className="home_video_container">
            <video
              src={vid2}
              autoPlay
              className="home_video"
              loop
              preload="auto"
              muted
              type="video/mp4"

            />
          </div>
          <div className="home_video_container">
            <video
              src={vid1}
              autoPlay
              className="home_video"
              loop
              preload="auto"
              muted
              type="video/mp4"

            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
