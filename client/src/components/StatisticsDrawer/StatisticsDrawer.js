import React, { useEffect, useState } from 'react';
import { Box, Tab, CircularProgress, Typography, Grid, Card, CardContent } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { getPlaces, getByTime } from '../../services/crowd';
import CardWithGraph from '../Card/CardWithGraph';
import StackedAreaChart from './StackedAreaChart';

const StatisticsDrawer = () => {
  const [value, setValue] = useState('1');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = ["North Nazimabad", "Defence Housing Society", "Bahadurabad PECHS", "Malir Cannt"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    try {
      const placesResponse = await getPlaces();
      const fetchedData = placesResponse.data.map((item) => ({
        name: item.video_ref,
        crowdValue: item.data[0]?.number || 0,
        data: item.data.map(entry => ({ number: entry.number, time: entry.time })),
      }));

      console.log(fetchedData)
      setData(fetchedData);

      const avgPromises = videoRefs.map((ref) => getByTime(ref));
      const avgResponses = await Promise.all(avgPromises);
      const combinedData = avgResponses.map((res, index) => ({
        label: videoRefs[index],
        data: res.data.map(entry => ({ number: entry.sum, time: entry._id })),
      }));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching crowd data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // 

    return () => clearInterval(interval); 
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={2} width='470px' textAlign='Left' role='presentation' paddingLeft='120px'>
      <Typography variant='h4' component='div'>
        STATISTICS
      </Typography>
      <Typography variant='body2' component='div' gutterBottom>
        Statistics data here
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Crowd Density" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2}>
            {data.map((camera, index) => (
              <Grid item xs={12} key={index}>
                <CardWithGraph
                  title={camera.name}
                  crowdValue={camera.crowdValue}
                  data={camera.data}
                />
              </Grid>
            ))}
          </Grid>
          <br />
          <Card style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid', height: 'auto' }}>
            <CardContent>
              <StackedAreaChart data={data}
              />
            </CardContent>
          </Card>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default StatisticsDrawer;
