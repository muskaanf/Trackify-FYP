import React from 'react';
import { Card, CardHeader, Avatar, CardActions, Button } from '@mui/material';

const NotificationCard = ({ title, timestamp, onResolve }) => {
  return (
    <Card style={{ borderColor: '#009193', borderWidth: '1px', borderStyle: 'solid', marginBottom: "10px" }}>
      <CardHeader
        avatar={<Avatar alt="Notification" src="/path/to/notification-avatar.jpg" />}
        title={title}
        subheader={new Date(timestamp).toLocaleString()}
      />
      {title.toLowerCase().includes("crowd") ? null : (
        <CardActions>
          <Button size="small" onClick={onResolve}>Resolve</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default NotificationCard;
