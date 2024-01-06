import { Card, CardHeader, Divider } from '@mui/material';
import MostOrderedCourtTable from './MostOrderedCourtTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataSourceRequest } from 'src/models/datasourcerequest';
import { Pagination } from 'src/models/pagination';
import {
  MResGetHistoryOrder,
  MResMostOrderedCourt
} from 'src/models/Report/Report';

function MostOrderedCourt(state) {
  const currentYear = new Date().getFullYear();

  // Set stDate to the first date of the current year
  const stDateDefault = new Date(currentYear, 0, 1);

  // Set enDate to the last date of the current year
  const enDateDefault = new Date(currentYear, 11, 31);

  const [courtOrders, setCourtOrders] = useState<MResMostOrderedCourt[]>([]);
  const [pagination, setPagination] = useState<Pagination>(new Pagination());
  const [dsr, setDsr] = useState<DataSourceRequest>();
  const [stDate, setStDate] = useState<Date>(stDateDefault);
  const [enDate, setEnDate] = useState<Date>(enDateDefault);

  const { fetchTrigger, setFetchTrigger } = state;

  useEffect(() => {
    fetchOrders();
  }, [fetchTrigger]);

  const fetchOrders = async () => {
    try {
      var response = await new MResMostOrderedCourt().GetMostOrderedCourt(
        pagination
      );

      // alert(JSON.stringify(response));

      if (response.resultCode == '1000') {
        setCourtOrders(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Card>
      <CardHeader title="Most Popular Court" />
      <Divider />
      {courtOrders && pagination && (
        <MostOrderedCourtTable
          courtOrders={courtOrders}
          pagination={pagination}
          fetchTrigger={fetchTrigger}
          setFetchTrigger={setFetchTrigger}
          setCourtOrders={setCourtOrders}
          setPagination={setPagination}
        />
      )}
    </Card>
  );
}

export default MostOrderedCourt;
