import { Card, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { set, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataSourceRequest } from 'src/models/datasourcerequest';
import { Pagination } from 'src/models/pagination';
import {
  MResGetHistoryOrder,
  MResGetRevenueEachMonth
} from 'src/models/Report/Report';
import { BarChart } from '@mui/x-charts/BarChart';
import DatePicker from '@mui/lab/DatePicker';

function MonthlyRevenue(state) {
  const currentYear = new Date().getFullYear();

  // Set stDate to the first date of the current year
  const stDateDefault = new Date(currentYear, 0, 1);

  // Set enDate to the last date of the current year
  const enDateDefault = new Date(currentYear, 11, 31);

  const [courtOrders, setCourtOrders] = useState<MResGetRevenueEachMonth>(
    new MResGetRevenueEachMonth()
  );
  const [stDate, setStDate] = useState<Date>(stDateDefault);
  const [enDate, setEnDate] = useState<Date>(enDateDefault);
  const [dataset, setDataset] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [dataKey, setDataKey] = useState<number[]>([0]);
  const [monthOrder, setMonthOrder] = useState<Date>(new Date());

  const { fetchTrigger, setFetchTrigger } = state;

  useEffect(() => {
    fetchOrders();
    // alert(JSON.stringify(dataKey));
  }, [fetchTrigger]);

  useEffect(() => {
    fetchOrders();
  }, [monthOrder]);

  const fetchOrders = async () => {
    try {
      var response = await new MResGetRevenueEachMonth().GetRevenueEachMonth(
        monthOrder
      );

      // alert(JSON.stringify(response));

      if (response.resultCode == '1000') {
        setCourtOrders(response.data);

        setLabels(response.data.data.map((x) => x.label));
        setDataKey(response.data.data.map((x) => x.dataKey));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Card sx={{ padding: 2 }}>
      <CardHeader title="Revenue Every Month" />
      <Grid sx={{ padding: '16px;' }}>
        <Grid item xs={12} md={2} lg={2}>
          <DatePicker
            label={'Pick Year !'}
            value={monthOrder}
            onChange={(newValue) => {
              setMonthOrder(newValue as Date);
              // alert(newValue);
            }}
            views={['year']}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Divider />
      {dataKey && courtOrders.data && (
        <BarChart
          xAxis={[{ scaleType: 'band', data: labels }]}
          // series={[{ data: dataKey }]}
          series={[
            {
              data: dataKey != null ? (dataKey as number[]) : [10],
              type: 'bar'
            }
          ]}
          // series={courtOrders.data}
          // width={500}
          height={300}
        />
      )}
    </Card>
  );
}

export default MonthlyRevenue;
