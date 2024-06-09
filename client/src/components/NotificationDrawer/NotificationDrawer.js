import React, { useEffect, useState } from 'react';
import NotificationCard from './Notification';
import { Box, Tab, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { getUnattendedLuggage, markUnattendedAsSafe } from '../../services/baggageDetection';
import { getIntruders, markIntrudersAsSafe } from '../../services/faceDetection';
import { getPlaces } from '../../services/crowd';

const NotificationDrawer = () => {
  const [value, setValue] = useState('1');
  const [unattendedLuggage, setUnattendedLuggage] = useState([]);
  const [intruders, setIntruders] = useState([]);
  const [crowdNotifications, setCrowdNotifications] = useState([]);
  const [luggageAlertShown, setLuggageAlertShown] = useState(false);
  const [faceAlertShown, setFaceAlertShown] = useState(false);

  useEffect(() => {
    const fetchUnattendedLuggage = async () => {
      try {
        const response = await getUnattendedLuggage();
        setUnattendedLuggage((prevLuggage) => {
          const newLuggage = response.data.filter(item => !prevLuggage.find(luggage => luggage._id === item._id));
          return [...prevLuggage, ...newLuggage];
        });

        if (response.data.length > 0 && !luggageAlertShown) {
          setLuggageAlertShown(true);
        }
      } catch (error) {
        console.error('Error fetching unattended luggage:', error);
      }
    };

    const fetchIntruders = async () => {
      try {
        const response = await getIntruders();
        setIntruders((prevIntruders) => {
          const newIntruders = response.data.filter(item => !prevIntruders.find(intruder => intruder._id === item._id));
          return [...prevIntruders, ...newIntruders];
        });

        if (response.data.length > 0 && !faceAlertShown) {
          setFaceAlertShown(true);
        }
      } catch (error) {
        console.error('Error fetching intruders:', error);
      }
    };

    const fetchCrowdData = async () => {
      try {
        const response = await getPlaces();
        setCrowdNotifications(response.data.filter(place => {
          const latestData = place.data[0];
          return latestData && latestData.number > 10;
        }).map((place) => ({
          id: place._id,
          title: `Crowd Exceeded Limit: ${place.video_ref}`,
          time: place.data[0]?.time || 'Unknown time'
        })));
      } catch (error) {
        console.error('Error fetching crowd data:', error);
      }
    };

    fetchUnattendedLuggage();
    fetchIntruders();
    fetchCrowdData();
    const interval = setInterval(() => {
      fetchUnattendedLuggage();
      fetchIntruders();
      fetchCrowdData();
    }, 5000);

    return () => clearInterval(interval);
  }, [luggageAlertShown, faceAlertShown]);

  const handleResolveLuggage = async (id) => {
    try {
      await markUnattendedAsSafe(id);
      setUnattendedLuggage((prev) => prev.filter((item) => item._id !== id));
      if (unattendedLuggage.length === 1) {
        setLuggageAlertShown(false);
      }
    } catch (error) {
      console.error('Error resolving unattended luggage:', error);
    }
  };

  const handleResolveIntruder = async (id) => {
    try {
      await markIntrudersAsSafe(id);
      setIntruders((prev) => prev.filter((item) => item._id !== id));
      if (intruders.length === 1) {
        setFaceAlertShown(false);
      }
    } catch (error) {
      console.error('Error resolving intruder:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box p={2} width='470px' textAlign='Left' role='presentation' paddingLeft='120px'>
      <Typography variant='h4' component='div'>
        NOTIFICATION
      </Typography>
      <Typography variant='body2' component='div' gutterBottom>
        Notification data here
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Unattended Luggage" value="1" />
            <Tab label="Facial Recognition" value="2" />
            <Tab label="Crowd Density" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {unattendedLuggage.length === 0 ? (
            <Typography>No unattended luggage found.</Typography>
          ) : (
            unattendedLuggage.map((item) => (
              <NotificationCard
                key={item._id}
                title={`Unattended Luggage Found: ${item.luggage_ref}`}
                timestamp={item.time}
                onResolve={() => handleResolveLuggage(item._id)}
              />
            ))
          )}
        </TabPanel>
        <TabPanel value="2">
          {intruders.length === 0 ? (
            <Typography>No intruders found.</Typography>
          ) : (
            intruders.map((item) => (
              <NotificationCard
                key={item._id}
                title={`Intruder Found: ${item.face_ref}`}
                timestamp={item.time}
                onResolve={() => handleResolveIntruder(item._id)}
              />
            ))
          )}
        </TabPanel>
        <TabPanel value="3">
          {crowdNotifications.length === 0 ? (
            <Typography>No crowd density issues found.</Typography>
          ) : (
            crowdNotifications.map((item) => (
              <NotificationCard
                key={item.id}
                title={item.title}
                timestamp={item.time}
              />
            ))
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default NotificationDrawer;
