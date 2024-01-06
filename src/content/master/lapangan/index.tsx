import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import React from 'react';
import FormInsertUpdateUser from './FormInsertUpdateUser';
import JenisLapanganData from './LapanganHandler/LapanganData';
import { JenisLapangan } from 'src/models/master/JenisLapangan/jenisLapangan';
import { Lapangan } from 'src/models/master/Lapangan/Lapangan';

function MasterLapangan() {
  const [open, setOpen] = useState(false);
  const [fetchTrigger, setFetchTrigger] = React.useState(0);
  const [dataPeserta, setDataPeserta] = React.useState(new Lapangan());
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [dataJenisLapangan, setDataJenisLapangan] = React.useState<
    JenisLapangan[]
  >([]);

  useEffect(() => {
    fetchJenisLapangan();
  }, []);

  const fetchJenisLapangan = async () => {
    var response = await new JenisLapangan().fetchJenisLapangan();
    if (response.resultCode == '1000') {
      setDataJenisLapangan(response.data);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Master Lapangan - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader open={open} setOpen={setOpen} setIsUpdate={setIsUpdate} />
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
            <JenisLapanganData
              fetchTrigger={fetchTrigger}
              setFetchTrigger={setFetchTrigger}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              setOpen={setOpen}
              setDataPeserta={setDataPeserta}
              dataJenisLapangan={dataJenisLapangan}
            ></JenisLapanganData>
          </Grid>
        </Grid>
        <FormInsertUpdateUser
          open={open}
          setOpen={setOpen}
          fetchTrigger={fetchTrigger}
          setFetchTrigger={setFetchTrigger}
          dataPeserta={dataPeserta}
          setDataPeserta={setDataPeserta}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          dataJenisLapangan={dataJenisLapangan}
        ></FormInsertUpdateUser>
      </Container>
      <Footer />
    </>
  );
}

export default MasterLapangan;
