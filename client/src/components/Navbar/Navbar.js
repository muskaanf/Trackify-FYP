import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItems } from '../consts/ListItems';
import DirectoryDrawer from '../DirectoryDrawer/DirectoryDrawer';
import StatisticsDrawer from '../StatisticsDrawer/StatisticsDrawer';
import NotificationDrawer from '../NotificationDrawer/NotificationDrawer';
import ProfileDrawer from '../ProfileDrawer/ProfileDrawer';
import CameraDrawer from '../CameraDrawer/CameraDrawer';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { Tooltip, Badge } from '@mui/material';

const Navbar = () => {
  const drawerWidth = 80;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const notificationCount = useSelector((state) => state.notifications.count);

  const toggleDrawer = () => {
    if (drawerOpen === true) setDrawerOpen(false);
  };

  const handleListItemClick = (itemId) => {
    if (selectedItemId === itemId) {
      setDrawerOpen(false);
      setSelectedItemId(null);
      return;
    } else {
      if (drawerOpen === true) {
        setDrawerOpen(false);
        setTimeout(() => {
          setSelectedItemId(itemId);
          setDrawerOpen(true);
        }, 200);
      } else {
        setSelectedItemId(itemId);
        setDrawerOpen(true);
      }
    }
  };

  const renderDrawerContent = () => {
    switch (selectedItemId) {
      case 1:
        return <DirectoryDrawer />;
      case 2:
        return <StatisticsDrawer />;
      case 3:
        return <NotificationDrawer />;
      case 4:
        return <ProfileDrawer />;
      case 5:
        return <CameraDrawer />;
    }
  };

  const handleSpeedDialOpen = () => {
    setOpenSpeedDial(true);
  };

  const handleSpeedDialClose = () => {
    setOpenSpeedDial(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const [openSpeedDial, setOpenSpeedDial] = useState(false);

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderColor: 'divider',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <div className='logo' style={{ width: '45px', height: '50px', margin: '15px ' }}>
          <img className='navLogo' src='Logo.png' alt='Logo' width='50px' height='55px' />
        </div>
        <List>
          {ListItems.map((item) => {
            if (item.id === 4 && user?.role !== 'Admin') {
              return null;
            }
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(item.id)}>
                  <ListItemIcon sx={{ color: '#009193' }}>
                    {item.id === 3 ? (
                      <Tooltip title={`${notificationCount} Notifications`}>
                        <Badge badgeContent={notificationCount} color='error'>
                          {item.icon}
                        </Badge>
                      </Tooltip>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <SpeedDial
          ariaLabel='SpeedDial example'
          icon={<SettingsIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={openSpeedDial}
          direction='up'
          sx={{ position: 'absolute', bottom: '20px', right: '15px' }}
        >
          <SpeedDialAction
            key='Logout'
            icon={<LogoutIcon sx={{ color: '#009193' }} />}
            tooltipTitle='Logout'
            onClick={handleLogout}
            sx={{ backgroundColor: 'white', color: 'black' }}
          />
        </SpeedDial>
      </Drawer>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: '240px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '620px',
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
      >
        {renderDrawerContent()}
      </Drawer>
    </>
  );
};

export default Navbar;
