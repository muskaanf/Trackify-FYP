import React from 'react'
import {Box,  Tab} from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab'
import Typography from '@mui/material/Typography';
import UnattendedBag from './UnattendedBag';
import FacialRecognition from './FacialRecognition';

const DirectoryDrawer = () => {
    const [value, setValue] = React.useState("1");
   
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    
    <Box p={2} width='470px' textAlign='Left' role='presentation' paddingLeft='120px'>
      <Typography variant='h4' component='div' >
        DIRECTORY
      </Typography>
      <Typography variant='body2' component='div' gutterBottom>
        Directory data here
      </Typography>
      <TabContext value={value}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handleChange} aria-label="lab API tabs example" style={{alignItems: 'center'}}>
      <Tab label="Unattended Luggage" value="1" />
      <Tab label="Facial Recognition" value="2" />
    </TabList>
  </Box>
  <TabPanel value="1" style={{alignItems: 'center'}}>

  <UnattendedBag/>
</TabPanel>
  
  <TabPanel value="2"> 
  <FacialRecognition/>
  </TabPanel>
</TabContext>
</Box>
  )
}

export default DirectoryDrawer
