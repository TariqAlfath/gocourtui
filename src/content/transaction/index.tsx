import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import FormInsertModal from './FormInsertModal';
import Modals from './Modals';
import CurrentTransaction from './ActiveTransaction/CurrentTransaction';
import React from 'react';

function ApplicationsTransactions() {
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [open]);

  const onClose = () => {
    setOpen(false);
  };

  const [fetchTrigger, setFetchTrigger] = React.useState(0);

  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader open={open} setOpen={setOpen} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <CurrentTransaction
              fetchTrigger={fetchTrigger}
              setFetchTrigger={setFetchTrigger}
            ></CurrentTransaction>
          </Grid>
        </Grid>
      </Container>
      <Modals
        open={open}
        setOpen={setOpen}
        fetchTrigger={fetchTrigger}
        setFetchTrigger={setFetchTrigger}
      />
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
