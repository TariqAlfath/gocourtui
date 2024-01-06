import { Card, CardHeader, Divider } from '@mui/material';
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

  const { fetchTrigger, setFetchTrigger } = state;

  useEffect(() => {
    fetchOrders();
    // alert(JSON.stringify(dataKey));
  }, [fetchTrigger]);

  const fetchOrders = async () => {
    try {
      var response = await new MResGetRevenueEachMonth().GetRevenueEachMonth(
        stDate,
        enDate
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
