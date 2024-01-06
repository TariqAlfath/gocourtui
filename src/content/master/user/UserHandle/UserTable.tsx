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
  Typography
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
import { da, enGB } from 'date-fns/locale';
import { MReqUpdateFlagPeserta, MResUser } from 'src/models/master/User/User';

interface CurrentUsersProps {
  pagination?: Pagination; // Make pagination optional
  setPagination: React.Dispatch<React.SetStateAction<Pagination | undefined>>;
  Users: MResUser[];
  setUsers: React.Dispatch<React.SetStateAction<MResUser[]>>;
  fetchTrigger: number;
  setFetchTrigger: React.Dispatch<React.SetStateAction<number>>;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDataPeserta: React.Dispatch<React.SetStateAction<MResUser>>;
}

// ... (import statements remain unchanged)

const UserTable: React.FC<CurrentUsersProps> = ({
  pagination,
  setPagination,
  Users,
  setUsers,
  fetchTrigger,
  setFetchTrigger,
  isUpdate,
  setIsUpdate,
  setOpen,
  setDataPeserta
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = React.useState<MResUser>(new MResUser());
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [indexAnchor, setIndexAnchor] = React.useState(0);

  useEffect(() => {
    handlePopoverClose();
  }, [fetchTrigger]);

  const handlePopoverOpen = (event, data: MResUser, index: number) => {
    // alert(JSON.stringify(userData));
    setDataPeserta(data);
    setUserData(data);
    setAnchorEl(event.currentTarget);
    setSelectedUserId(data.idUser);
    setIndexAnchor(index);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
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

  const handleNonAktifPeserta = async (
    event,
    status: boolean,
    titleModal: String
  ) => {
    var data = new MReqUpdateFlagPeserta();
    data.IdPeserta = userData.idUser;
    data.Status = status;
    handlePopoverClose();

    const result = await Swal.fire({
      title: titleModal + userData.nama.toString() + '?',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await new MReqUpdateFlagPeserta().updateFlagPeserta(data);
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
                <TableCell>ID User</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>Nomor Telefon</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Users.map((data: MResUser, index: number) => (
                <TableRow key={'tbl' + index}>
                  <TableCell>{data.idUser}</TableCell>
                  <TableCell>{data.username}</TableCell>
                  <TableCell>{data.nama}</TableCell>
                  <TableCell>{data.alamat}</TableCell>
                  <TableCell>{data.nomorTelefon}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.role}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {data.status === true ? (
                      <Typography>Aktif</Typography>
                    ) : (
                      <Typography>Non Aktif</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handlePopoverOpen(e, data, index)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                  {selectedUserId !== null && (
                    <Popover
                      onFocus={(e) => {
                        // alert('test');
                        // console.log('test');
                        for (let i = 0; i < Users.length; i++) {
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
                      open={Boolean(anchorEl)}
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
                            onClick={async (event) => {
                              // setUserData(data);
                              setOpen(true);
                              setIsUpdate(true);
                            }}
                            primary="Ubah Data"
                          />
                        </ListItem>
                        <ListItem button>
                          {data.status ? (
                            <ListItemText
                              onClick={(event) => {
                                handleNonAktifPeserta(
                                  event,
                                  false,
                                  'Non Aktifkan User '
                                );
                              }}
                              primary="Non Aktifkan User"
                            />
                          ) : (
                            <ListItemText
                              onClick={(event) => {
                                handleNonAktifPeserta(
                                  event,
                                  true,
                                  'Aktifkan User '
                                );
                              }}
                              primary="Aktifkan User"
                            />
                          )}
                        </ListItem>
                      </List>
                    </Popover>
                  )}
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
    </>
  );
};

export default UserTable;
