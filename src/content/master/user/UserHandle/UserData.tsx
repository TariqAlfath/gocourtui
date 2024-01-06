import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Typography
} from '@mui/material';
import { Pagination } from 'src/models/pagination';
import { Order } from 'src/models/transaction/Order';
import UserTable from './UserTable';
import { MResUser } from 'src/models/master/User/User';

const UserData = (props) => {
  const [pagionation, setPagination] = React.useState(new Pagination());
  // const [orders, setOrders] = React.useState<Order[]>([]);
  const { fetchTrigger, setFetchTrigger } = props;
  const [Users, setUsers] = React.useState<MResUser[]>([]);
  const { isUpdate, setIsUpdate } = props;
  const { setOpen } = props;
  const { setDataPeserta } = props;

  useEffect(() => {
    fetchUsers();
    // alert(JSON.stringify(pagionation));
  }, [fetchTrigger]);

  const fetchUsers = async () => {
    var response = await new MResUser().GetListUsers(pagionation);
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
              <UserTable
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
              ></UserTable>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default UserData;
