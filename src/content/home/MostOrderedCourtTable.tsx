import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination
} from '@mui/material';

import Label from 'src/components/Label';
import { CourtOrder } from 'src/models/court_order';
import { Pagination } from 'src/models/pagination';
import { MResMostOrderedCourt } from 'src/models/Report/Report';
import { DataSourceRequest } from 'src/models/datasourcerequest';

interface MostOrderedCourtTableProps {
  courtOrders: MResMostOrderedCourt[];
  pagination?: Pagination; // Make pagination optional
  fetchTrigger: number;
  setCourtOrders: React.Dispatch<React.SetStateAction<MResMostOrderedCourt[]>>;
  setPagination: React.Dispatch<React.SetStateAction<Pagination | undefined>>;
  setFetchTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const MostOrderedCourtTable: React.FC<MostOrderedCourtTableProps> = ({
  courtOrders,
  setCourtOrders,
  pagination,
  setPagination,
  fetchTrigger,
  setFetchTrigger
}) => {
  const handlePageChange = (event: unknown, newPage: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: newPage + 1
    }));
    setFetchTrigger(fetchTrigger + 1);
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Urutan</TableCell>
              <TableCell>Nama Lapangan</TableCell>
              <TableCell>Total Pemesanan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courtOrders.map((order: MResMostOrderedCourt, index: number) => (
              <TableRow key={'tbl' + index}>
                <TableCell>{order.number}</TableCell>
                <TableCell>{order.namaLapangan}</TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Box p={2}>
          <TablePagination
            component="div"
            count={pagination.total || 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={(event) => {
              const newLimit = parseInt(event.target.value, 10);
              // alert(newLimit);
              setPagination((prevPagination) => ({
                ...prevPagination,
                size: newLimit,
                page: 1
              }));
              setFetchTrigger(fetchTrigger + 1);
            }}
            page={pagination.page - 1 || 0}
            rowsPerPage={pagination.size || 5}
            rowsPerPageOptions={[1, 5, 10, 25, 30]}
          />
        </Box>
      )}
    </Card>
  );
};

// MostOrderedCourtTable.propTypes = {
//   courtOrders: PropTypes.array.isRequired,
//   pagination: PropTypes.object, // Adjust PropTypes according to your Pagination type
//   setCourtOrders: PropTypes.func.isRequired,
//   setPagination: PropTypes.func.isRequired
// };

export default MostOrderedCourtTable;
