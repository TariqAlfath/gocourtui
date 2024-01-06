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
import CurrentTransactionTable from './CurrentTransactionTable';
import { Pagination } from 'src/models/pagination';
import { Order } from 'src/models/transaction/Order';

const CurrentTransaction = (props) => {
  const [pagionation, setPagination] = React.useState(new Pagination());
  const [orders, setOrders] = React.useState<Order[]>([]);
  const { fetchTrigger, setFetchTrigger } = props;

  useEffect(() => {
    fetchOrders();
    // alert(JSON.stringify(pagionation));
  }, [fetchTrigger]);

  const fetchOrders = async () => {
    var response = await new Order().fetchOrders(pagionation);
    if (response.resultCode == '1000') {
      setOrders(response.data);
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
            <CardHeader title="Recent Order's" />
            <CardContent>
              <CurrentTransactionTable
                pagination={pagionation}
                setPagination={setPagination}
                orders={orders}
                setOrders={setOrders}
                fetchTrigger={fetchTrigger}
                setFetchTrigger={setFetchTrigger}
              ></CurrentTransactionTable>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default CurrentTransaction;
