import { Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import SummaryOrder from './SummaryOrder';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import RecentOrders from './RecentOrders';
import MostOrderedCourt from './MostOrderedCourt';
import MonthlyRevenue from './MonthlyRevenue';
import UserData from '../master/user/UserHandle/UserData';
import { GetCurrentUser, MResUser } from 'src/models/master/User/User';

function Home() {
  const [fetchTrigger, setFetchTrigger] = React.useState(0);
  const [monthOrder, setMonthOrder] = useState<Date>(new Date());
  const [userData, setUserData] = React.useState<MResUser>(GetCurrentUser());
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth={'lg'}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {userData.role === 'Admin' && (
            <>
              <Grid item xs={12} md={8} xl={8} sx={{ maxHeight: '600px' }}>
                <MonthlyRevenue />
              </Grid>
              <Grid item xs={12} md={4} xl={4} sx={{ maxHeight: '600px' }}>
                <SummaryOrder />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={6} xl={6} sx={{ maxHeight: '600px' }}>
            <RecentOrders
              fetchTrigger={fetchTrigger}
              setFetchTrigger={setFetchTrigger}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6} sx={{ maxHeight: '600px' }}>
            <MostOrderedCourt
              fetchTrigger={fetchTrigger}
              setFetchTrigger={setFetchTrigger}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
