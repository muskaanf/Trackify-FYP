import React from 'react'
import {TabPanel, TabContext, TabList} from '@mui/lab'
import {Box, Tab} from '@mui/material';
import Typography from '@mui/material/Typography';
import UserProfile from './UserProfile';

const ProfileDrawer = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <Box p={2} width='470px' textAlign='Left' role='presentation' paddingLeft='120px'>
      <Typography variant='h4' component='div' >
        PROFILE
      </Typography>
      <Typography variant='body2' component='div' gutterBottom>
        Profile data here
      </Typography>
      <TabContext value={value}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handleChange} aria-label="lab API tabs example">
    <Tab label="User Profiles" value="1" />
    </TabList>
  </Box>
  <TabPanel value="1">
    <UserProfile/>
  </TabPanel>
</TabContext>
</Box>
  )
}

export default ProfileDrawer
