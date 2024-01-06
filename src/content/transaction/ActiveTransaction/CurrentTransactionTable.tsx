import React, { useEffect } from 'react';
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
  TablePagination,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  Input,
  InputBase
} from '@mui/material';
import { Pagination } from 'src/models/pagination';
import {
  Order,
  RequestInsertApprove,
  RequestRejectOrder
} from 'src/models/transaction/Order';
import { format, set } from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Download } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { enGB } from 'date-fns/locale';
import { GetCurrentUser } from 'src/models/master/User/User';

interface CurrentTransactionProps {
  pagination?: Pagination; // Make pagination optional
  setPagination: React.Dispatch<React.SetStateAction<Pagination | undefined>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  fetchTrigger: number;
  setFetchTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const CurrentTransactionTable: React.FC<CurrentTransactionProps> = ({
  pagination,
  setPagination,
  orders,
  setOrders,
  fetchTrigger,
  setFetchTrigger
}) => {
  const [anchorEl, setAnchorEl] = React.useState();
  const [openToolTip, setOpenToolTip] = React.useState(false);
  const [request, setRequest] = React.useState<RequestInsertApprove>(
    new RequestInsertApprove()
  );
  const [requestReject, setRequestReject] = React.useState<RequestRejectOrder>(
    new RequestInsertApprove()
  );
  const [orderData, setOrderData] = React.useState<Order>(new Order());
  const [open, isOpen] = React.useState(false);
  const [pop, setPop] = React.useState<File>(null);
  const [indexAnchor, setIndexAnchor] = React.useState(0);
  const CurrentUser = GetCurrentUser();
  const [blinking, setBlinking] = React.useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (CurrentUser.role === 'Admin') {
        setBlinking((prevBlinking) => {
          if (!prevBlinking) {
            console.log('blinking: true');
            return true;
          } else {
            console.log('blinking: false');
            return false;
          }
        });
      }
    }, 1000); // 500ms interval for blinking

    return () => clearInterval(interval);
  }, [CurrentUser.role]);

  const handlePopoverOpen = (event, data: Order, index: number) => {
    setOrderData(data);
    setAnchorEl(event.currentTarget);
    setOpenToolTip(true);
    setIndexAnchor(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenToolTip(false);
  };

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'dd-MM-yyyy HH:mm', { locale: enGB });
  };

  const handleBooking = (event, data) => {
    // alert('booking');
    // alert(JSON.stringify(data));
    // setRequest(data);
    // setIsOpenConfirm(true);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: newPage + 1
    }));
    setFetchTrigger(fetchTrigger + 1);
  };

  const handleConfirmationOrder = async (event) => {
    handlePopoverClose();
    var data = orderData;
    request.IdOrder = data.idOrder;
    // alert(JSON.stringify(request));

    const result = await Swal.fire({
      title: 'Konfirmasi Pesanan: ' + data.idOrder + '?',
      html: `
      <div class="swal2-content" style="
          padding-left: 80px;
          padding-top: 30px;
          text-align: left;
          font-weight: 600;
      ">
      <table>
        <tbody>
          <tr>
            <td>Nama Lapangan</td>
            <td>:</td>
            <td>${data.namaLapangan}</td>
          </tr>
          <tr>
            <td>Mulai Sewa</td>
            <td>:</td>
            <td>
              ${formatDateTime(data.rentStart)}
            </td>
          </tr>
          </tr>
          <tr>
            <td>Akhir Sewa</td>
            <td>:</td>
            <td>
            ${formatDateTime(data.rentEnd)}
            </td>
          </tr>
          <tr>
            <td>Catatan</td>
            <td>:</td>
            <td>${data.catatan.toString()}</td>
          </tr>
          </tr>
          <tr>
            <td>Harga</td>
            <td>:</td>
            <td>${data.estimatedPrice.toString()}</td>
          </tr>
        </tbody>
      </table>
      </div>
    `,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      inputPlaceholder: 'Masukan Catatan',
      preConfirm: async () => {
        try {
          var catatan = document.querySelector(
            '#swal2-input'
          ) as HTMLInputElement | null;
          request.Catatan = catatan.value;
          // alert(JSON.stringify(request));

          const res = await new Order().ConfirmOrder(request);
          if (res.resultCode == '1000') {
            setFetchTrigger(fetchTrigger + 1);
          }
          return res;
        } catch (error) {
          console.error('Error during confirmation:', error);
          throw error; // Re-throw the error to trigger Swal to show an error message
        }
      }
    });

    if (result.isConfirmed) {
      // Handle the confirmed action, e.g., submit the form
      console.log('Confirmed! Notes:', request.Catatan);
      // Add your logic for handling the confirmation with notes
    } else {
      // Handle the case where the user clicked "Cancel"
      console.log('Cancelled');
    }
  };

  const handleRejectOrder = async (
    event,
    status: string,
    titleModal: String
  ) => {
    var data = orderData;

    handlePopoverClose();
    requestReject.IdOrder = data.idOrder;

    const result = await Swal.fire({
      title: titleModal + data.idOrder.toString() + '?',
      html: `
      <div class="swal2-content" style="
          padding-left: 80px;
          padding-top: 30px;
          text-align: left;
          font-weight: 600;
      ">
      <table>
        <tbody>
          <tr>
            <td>Nama Lapangan</td>
            <td>:</td>
            <td>${data.namaLapangan}</td>
          </tr>
          <tr>
            <td>Mulai Sewa</td>
            <td>:</td>
            <td>
              ${formatDateTime(data.rentStart)}
            </td>
          </tr>
          </tr>
          <tr>
            <td>Akhir Sewa</td>
            <td>:</td>
            <td>
            ${formatDateTime(data.rentEnd)}
            </td>
          </tr>
          <tr>
            <td>Catatan</td>
            <td>:</td>
            <td>${data.catatan.toString()}</td>
          </tr>
          </tr>
          <tr>
            <td>Harga</td>
            <td>:</td>
            <td>${data.estimatedPrice.toString()}</td>
          </tr>
        </tbody>
      </table>
      </div>
    `,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      inputPlaceholder: 'Masukan Catatan',
      preConfirm: async () => {
        try {
          var catatan = document.querySelector(
            '#swal2-input'
          ) as HTMLInputElement | null;
          requestReject.Catatan = catatan.value;
          requestReject.Status = status;
          const res = await new Order().RejectOrder(requestReject);
          if (res.resultCode == '1000') {
            setFetchTrigger(fetchTrigger + 1);
          }
          return res;
        } catch (error) {
          console.error('Error during confirmation:', error);
          throw error; // Re-throw the error to trigger Swal to show an error message
        }
      }
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf'];
      const fileType = selectedFile.name.slice(
        ((selectedFile.name.lastIndexOf('.') - 1) >>> 0) + 2
      );

      if (allowedFileTypes.includes(`.${fileType.toLowerCase()}`)) {
        // File type is allowed, proceed with your logic
        console.log('File type is allowed:', selectedFile);
        setPop(selectedFile);
      } else {
        handlePopoverClose();
        isOpen(false);
        // File type is not allowed, show an error message or handle accordingly
        Swal.fire({
          title: 'Error!',
          text: 'File type is not allowed',
          icon: 'error',
          confirmButtonText: 'Ok !'
        });

        //set value of input to null
        e.target.value = null;
      }
    }
  };

  const handleUploadPOP = async (event, idOrder: number) => {
    handlePopoverClose();
    isOpen(false);
    const res = await new Order().uploadProofOfPayment(idOrder, pop);
    if (res.data) {
      setFetchTrigger(fetchTrigger + 1);
    }
  };

  const handleDownloadPOP = async (event, idOrder: number) => {
    handlePopoverClose();
    isOpen(false);
    await new Order().DownloadPOP(idOrder);
  };

  useEffect(() => {
    // alert('fetching');
  }, [pagination]);

  return (
    <>
      <Card>
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        ></Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Nama Lapangan</TableCell>
                <TableCell>Mulai Sewa</TableCell>
                <TableCell>Akhir Sewa</TableCell>
                <TableCell>Perkiraan Harga</TableCell>
                <TableCell>Peminjam</TableCell>
                <TableCell>Catatan</TableCell>
                <TableCell>Bukti Pembayaran</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: Order, index: number) => (
                <TableRow
                  key={'tbl' + index}
                  style={{
                    backgroundColor: order.isBuy ? 'red' : 'white',
                    color: order.isBuy ? 'white' : 'black',
                    animation:
                      order.isBuy && blinking ? 'blinking 1s infinite' : 'none'
                  }}
                >
                  <TableCell>{order.idOrder}</TableCell>
                  <TableCell>
                    {order.namaLapangan}
                    <br />
                    {order.otherOrder > 0 ? (
                      <Typography
                        about={`Ada ${order.otherOrder} pesanan lain di waktu dan tempat ini`}
                        variant="caption"
                        sx={{ color: 'red', fontSize: '0.6rem' }}
                      >{`${order.otherOrder} Pesanan Yang Sama`}</Typography>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.rentStart), 'dd-MM-yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.rentEnd), 'dd-MM-yyyy HH:mm')}
                  </TableCell>
                  <TableCell>{order.estimatedPrice}</TableCell>
                  <TableCell>{order.renter}</TableCell>
                  <TableCell>{order.catatan}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {order.isBuy === true ? (
                      <IconButton
                        onClick={(e) => handleDownloadPOP(e, order.idOrder)}
                      >
                        <Download />
                      </IconButton>
                    ) : (
                      <Typography>Not Uploaded Yet</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handlePopoverOpen(e, order, index)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    <Popover
                      onFocus={(e) => {
                        // alert('test');
                        // console.log('test');
                        for (let i = 0; i < orders.length; i++) {
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
                        {CurrentUser.role == 'Admin' ? (
                          <>
                            <ListItem button>
                              <ListItemText
                                onClick={async (event) => {
                                  await handleConfirmationOrder(event);
                                }}
                                primary="Approve Order"
                              />
                            </ListItem>
                            <ListItem button>
                              <ListItemText
                                onClick={async (event) => {
                                  await handleRejectOrder(
                                    event,
                                    'Rejected',
                                    'Tolak Pesanan '
                                  );
                                }}
                                primary="Reject Order"
                              />
                            </ListItem>
                          </>
                        ) : (
                          <></>
                        )}
                        {order.isBuy === false ? (
                          <>
                            <ListItem button>
                              <ListItemText
                                onClick={(event) => {
                                  // alert(JSON.stringify(orderData));
                                  // setOrderData(order);
                                  isOpen(true);
                                }}
                                primary="Upload Pembayaran"
                              />
                            </ListItem>
                          </>
                        ) : (
                          <></>
                        )}

                        <ListItem button>
                          <ListItemText
                            onClick={(event) =>
                              handleRejectOrder(
                                event,
                                'Canceled',
                                'Batalkan Pesanan '
                              )
                            }
                            primary="Cancel Order"
                          />
                        </ListItem>
                      </List>
                    </Popover>
                  </TableCell>
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
        <Dialog
          open={open}
          onClose={() => isOpen(false)}
          PaperProps={{
            sx: {
              width: '30%',
              maxHeight: 700,
              maxWidth: 'none'
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, textAlign: 'center' }}>
            Upload Bukti Pembayaran (Order ID: {orderData.idOrder})
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} md={12}>
              <InputLabel sx={{ fontWeight: 600 }} htmlFor="file-input">
                Upload File
              </InputLabel>
              <InputBase
                sx={{
                  border: '1px solid #ccc', // Add your preferred border style
                  borderRadius: '4px', // Optional: Add border-radius for rounded corners
                  padding: '8px', // Optional: Add padding for spacing
                  width: '100%'
                }}
                id="file-input"
                type="file"
                inputProps={{ accept: '.jpg, .jpeg, .png, .pdf' }}
                onChange={(e) => handleFileChange(e)}
              />
            </Grid>
            <br />
            <br />

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
                onClick={(e) => handleUploadPOP(e, orderData.idOrder)}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => isOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default CurrentTransactionTable;
