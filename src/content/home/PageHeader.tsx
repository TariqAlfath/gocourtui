import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetCurrentUser, MResUser } from 'src/models/master/User/User';
import React, { useState } from 'react';
function PageHeader() {
  const [userData, setUserData] = React.useState<MResUser>(GetCurrentUser());
  const user = {
    name: '',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {userData.nama}!
        </Typography>
        <Typography variant="subtitle2">
          Step into Justice: Where Every Court Booking Marks the Beginning of a
          Fair Play!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
