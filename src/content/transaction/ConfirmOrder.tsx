import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { InsertOrder } from 'src/models/transaction/Order';
import { format } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';

interface ConfirmOrderProps {
  request: InsertOrder;
  setRequest: React.Dispatch<React.SetStateAction<InsertOrder>>;
  isSuccses: boolean;
  setIsSuccses: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenConfirm: boolean;
  setisOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({
  request,
  setRequest,
  isSuccses,
  setIsSuccses,
  isOpenConfirm,
  setisOpenConfirm
}) => {
  const handleSubmit = async () => {
    try {
      const response = await request.insertOrder();
      console.log(response);
      setIsSuccses(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCatatanChange = (e) => {
    request.Catatan = e.target.value;
    setRequest(request);
  };

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'dd-MM-yyyy HH:mm', { locale: enGB });
  };

  return (
    <Dialog open={isOpenConfirm} onClose={() => setIsSuccses(false)}>
      <DialogTitle>Pemesanan {request.NamaLapangan}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Nama Lapangan</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>{request.NamaLapangan}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tanggal & Jam</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>
                    {formatDateTime(request.RentStart)} -{' '}
                    {formatDateTime(request.RentEnd.toString())}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Harga</TableCell>
                  <TableCell>:</TableCell>
                  <TableCell>{request.TotalHarga.toString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="Catatan"
              variant="outlined"
              onChange={handleCatatanChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setisOpenConfirm(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmOrder;
