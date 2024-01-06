import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Grid, Container } from '@mui/material';
import { Pagination } from 'src/models/pagination';
import { MResUser } from 'src/models/master/User/User';
import LapanganTable from './LapanganTable';
import { Lapangan } from 'src/models/master/Lapangan/Lapangan';

const LapanganData = (props) => {
  const [pagionation, setPagination] = React.useState(new Pagination());
  const { fetchTrigger, setFetchTrigger } = props;
  const [Users, setUsers] = React.useState<Lapangan[]>([]);
  const { isUpdate, setIsUpdate } = props;
  const { setOpen } = props;
  const { setDataPeserta } = props;

  useEffect(() => {
    fetchLapangan();
  }, [fetchTrigger]);

  const fetchLapangan = async () => {
    var response = await new Lapangan().getAllLapanganPagination(pagionation);
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
              <LapanganTable
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
              ></LapanganTable>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default LapanganData;
