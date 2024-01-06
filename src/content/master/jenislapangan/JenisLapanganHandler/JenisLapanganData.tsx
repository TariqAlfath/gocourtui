import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Grid, Container } from '@mui/material';
import { Pagination } from 'src/models/pagination';
import { MResUser } from 'src/models/master/User/User';
import JenisLapanganTable from './JenisLapanganTable';
import { JenisLapangan } from 'src/models/master/JenisLapangan/jenisLapangan';

const JenisLapanganData = (props) => {
  const [pagionation, setPagination] = React.useState(new Pagination());
  const { fetchTrigger, setFetchTrigger } = props;
  const [Users, setUsers] = React.useState<JenisLapangan[]>([]);
  const { isUpdate, setIsUpdate } = props;
  const { setOpen } = props;
  const { setDataPeserta } = props;

  useEffect(() => {
    fetchJenisLapangan();
  }, [fetchTrigger]);

  const fetchJenisLapangan = async () => {
    var response =
      await new JenisLapangan().fetchJenisLapanganDataSourceRequest(
        pagionation
      );
    if (response.resultCode == '1000') {
      // setOrders(response.data);
      setUsers(response.data);
      setPagination(response.pagination);
    }
  };

  return (
    <Container>
      <Card>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} md={12} lg={12}>
            <CardHeader title="User Data" />
            <CardContent>
              <JenisLapanganTable
                pagination={pagionation}
                setPagination={setPagination}
                Users={Users}
                setUsers={setUsers}
                fetchTrigger={fetchTrigger}
                setFetchTrigger={setFetchTrigger}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                setOpen={setOpen}
                setDataPeserta={setDataPeserta}
              ></JenisLapanganTable>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default JenisLapanganData;
