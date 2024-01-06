import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Menu,
  Tooltip,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import fetchAvailableCourt from 'src/models/transaction/ActiveCourt';
import { JenisLapangan } from 'src/models/master/JenisLapangan/jenisLapangan';
import ActiveCourt from 'src/models/transaction/ActiveCourt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { InsertOrder } from 'src/models/transaction/Order';
import ConfirmOrder from './ConfirmOrder';
import { el } from 'date-fns/locale';

function Modals(props) {
  const { open, setOpen } = props;
  const { fetchTrigger, setFetchTrigger } = props;
  const [rentStart, setRentStart] = useState('');
  const [rentEnd, setRentEnd] = useState('');
  const [lapangan, setLapangan] = useState<ActiveCourt[]>([]);
  const [jenisLapangan, setJenisLapangan] = useState<JenisLapangan[]>([]);
  const [selectedLapangan, setSelectedLapangan] = useState('');
  const [tableData, setTableData] = useState([]);
  const [anchorEl, setAnchorEl] = useState();
  const [openToolTip, setOpenToolTip] = useState(false);
  const [request, setRequest] = useState<InsertOrder>(new InsertOrder());
  const [isSuccses, setIsSuccses] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<ActiveCourt>(
    new ActiveCourt()
  );
  const [indexAnchor, setIndexAnchor] = useState(0);

  // const openToolTip = Boolean(anchorEl);

  const Swal = require('sweetalert2');

  const fetchJenisLapangan = async () => {
    var response = await new JenisLapangan().fetchJenisLapangan();

    if (response.resultCode == '1000') {
      setJenisLapangan(response.data);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Data gagal ditambahkan',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  useEffect(() => {
    fetchJenisLapangan();
  }, []);

  useEffect(() => {
    if (isSuccses) {
      setIsSuccses(false);
      setOpen(false);
      setIsOpenConfirm(false);
      setFetchTrigger(fetchTrigger + 1);
      handlePopoverClose();
      if (lapangan.length > 1) {
        fetchAvailableCourt();
      } else {
        setLapangan([]);
      }

      Swal.fire({
        title: 'Success',
        text: 'Data berhasil ditambahkan',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } else {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Data gagal ditambahkan',
      //   icon: 'error',
      //   confirmButtonText: 'Ok'
      // });
    }
  }, [isSuccses]);

  const fetchAvailableCourt = async () => {
    var response = await new ActiveCourt().fetchAvailableCourt(
      new Date(rentStart),
      new Date(rentEnd),
      parseInt(selectedLapangan)
    );

    setLapangan(response.data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (event, data: ActiveCourt, index: number) => {
    setSelectedCourt(data);
    setAnchorEl(event.currentTarget);
    setOpenToolTip(true);
    setIndexAnchor(index);
    // openToolTip = true;
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenToolTip(false);
  };

  const handleSearch = async () => {
    await fetchAvailableCourt();
  };

  const handleBooking = async (event) => {
    var data = selectedCourt;
    request.IdLapangan = data.idLapangan;
    request.NamaLapangan = data.namaLapangan;
    request.RentStart = new Date(rentStart);
    request.RentEnd = new Date(rentEnd);
    request.TotalHarga = data.hargaLapangan;
    request.Catatan = '';

    const formattedDate = request.RentStart.toLocaleString('ID-id', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    await request.SetTotalHarga();
    setRequest(request);
    setIsOpenConfirm(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          width: '100%',
          maxHeight: 700,
          maxWidth: 'none'
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Court Order Form</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              id="rentStart"
              label="Rent Start"
              type="datetime-local"
              fullWidth
              value={rentStart}
              onChange={(e) => setRentStart(e.target.value)}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              id="rentEnd"
              label="Rent End"
              type="datetime-local"
              fullWidth
              value={rentEnd}
              onChange={(e) => {
                setRentEnd(e.target.value);
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={3}>
            <Select
              margin="dense"
              label="Jenis Lapangan"
              fullWidth
              value={selectedLapangan}
              sx={{ color: 'black' }}
              onChange={(e) => setSelectedLapangan(e.target.value)}
            >
              {jenisLapangan.map((data, index) => (
                <MenuItem key={index} value={data.idJenisLapangan}>
                  {data.namaJenisLapangan}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex !important',
              flexDirection: 'row-reverse !important',
              float: 'right !important',
              marginTop: '8px !important'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ maxHeight: 40 }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Display Table */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Lapangan</TableCell>
                <TableCell>Nama Lapangan</TableCell>
                <TableCell>Jenis Lapangan</TableCell>
                <TableCell>Harga Lapangan / Jam</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lapangan?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.idLapangan}</TableCell>
                  <TableCell>{data.namaLapangan}</TableCell>
                  <TableCell>{data.namaJenisLapangan}</TableCell>
                  <TableCell>{data.hargaLapangan}</TableCell>
                  <TableCell>
                    {/* <Button onClick={handlePopoverOpen}>test</Button> */}
                    <IconButton
                      onClick={(e) => handlePopoverOpen(e, data, index)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    <Popover
                      onFocus={(e) => {
                        // alert('test');
                        // console.log('test');
                        for (let i = 0; i < lapangan.length; i++) {
                          if (i != indexAnchor) {
                            var x = document.getElementById(
                              'popover-menu-' + i
                            );
                            x.style.setProperty('display', 'none');
                            // alert(i);
                          }
                        }
                      }}
                      id={`popover-menu-${index}`}
                      open={openToolTip}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <List>
                        <ListItem button>
                          <ListItemText
                            onClick={(event) => handleBooking(event)}
                            primary="Booking"
                          />
                        </ListItem>
                        <ListItem button>
                          <ListItemText primary="Detail Lapangan" />
                        </ListItem>
                      </List>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmOrder
          isOpenConfirm={isOpenConfirm}
          setIsSuccses={setIsSuccses}
          request={request}
          setRequest={setRequest}
          isSuccses={isSuccses}
          setisOpenConfirm={setIsOpenConfirm}
        ></ConfirmOrder>
      </DialogContent>
    </Dialog>
  );
}

export default Modals;
