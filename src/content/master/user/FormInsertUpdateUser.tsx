import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid
} from '@mui/material';
import {
  MReqUpdateFlagPeserta,
  MReqUpdateRolePeserta,
  MReqUser,
  MResUser
} from 'src/models/master/User/User';
import { CustomResultBase } from 'src/models/ResultBase/ResultBase';
import { set } from 'date-fns';

function FormInsertUpdateUser(props) {
  const { open, setOpen } = props;
  const { fetchTrigger, setFetchTrigger } = props;
  const { dataPeserta, setDataPeserta } = props;
  const { isUpdate, setIsUpdate } = props;

  // const openToolTip = Boolean(anchorEl);

  const Swal = require('sweetalert2');

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setDataPeserta(new MResUser());
    setIsUpdate(false);
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      var data = dataPeserta;

      var roleUpdate: MReqUpdateRolePeserta = new MReqUpdateRolePeserta();
      roleUpdate.Role = data.role;
      roleUpdate.IdPeserta = data.idUser;

      var insertPeserta: MReqUser = new MReqUser();
      insertPeserta.Username = data.username;
      insertPeserta.Nama = data.nama;
      insertPeserta.Alamat = data.alamat;
      insertPeserta.NomorTelefon = data.nomorTelefon;
      insertPeserta.Role = data.role;
      insertPeserta.Email = data.email;

      var response = new CustomResultBase();

      if (isUpdate) {
        response = await roleUpdate.updateRolePeserta(roleUpdate);
      } else {
        response = await insertPeserta.Register(insertPeserta);
      }

      setOpen(false);

      if (response.resultCode == '1000') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Perubahan Data Berhasil',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        });

        setFetchTrigger(fetchTrigger + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          width: '50%',
          maxHeight: 700,
          maxWidth: 'none'
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>User Form</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              id="username"
              label="Username"
              disabled={isUpdate}
              type="text"
              fullWidth
              value={dataPeserta.username}
              onChange={(e) => {
                dataPeserta.username = e.target.value;
                setDataPeserta(dataPeserta);
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              id="nama"
              label="Nama"
              disabled={isUpdate}
              type="text"
              fullWidth
              value={dataPeserta.nama}
              onChange={(e) => {
                // dataPeserta.nama = e.target.value;
                setDataPeserta((old) => ({
                  ...old,
                  nama: e.target.value
                }));
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              id="Email"
              label="Email"
              type="email"
              disabled={isUpdate}
              fullWidth
              value={dataPeserta.email}
              onChange={(e) => {
                // dataPeserta.email = e.target.value;
                // setDataPeserta(dataPeserta);
                setDataPeserta((old) => ({
                  ...old,
                  email: e.target.value
                }));
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="alamat"
              label="Alamat"
              disabled={isUpdate}
              type="text"
              fullWidth
              value={dataPeserta.alamat}
              onChange={(e) => {
                // dataPeserta.alamat = e.target.value;
                setDataPeserta((old) => ({
                  ...old,
                  alamat: e.target.value
                }));
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="nomortelefon"
              label="Nomor Telefon"
              type="text"
              disabled={isUpdate}
              fullWidth
              value={dataPeserta.nomorTelefon}
              onChange={(e) => {
                // dataPeserta.nomorTelefon = e.target.value;
                setDataPeserta((old) => ({
                  ...old,
                  nomorTelefon: e.target.value
                }));
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              margin="dense"
              label="Role"
              fullWidth
              value={dataPeserta.role}
              sx={{ color: 'black' }}
              onChange={(e) => {
                // dataPeserta.role = e.target.value;
                setDataPeserta((old) => ({
                  ...old,
                  role: e.target.value
                }));
              }}
            >
              <MenuItem value={`Admin`}>Admin</MenuItem>
              <MenuItem value={`Customer`}>Customer</MenuItem>
            </TextField>
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
            {/* <Button
              variant="contained"
              color="primary"
              sx={{ maxHeight: 40 }}
              onClick={handleSearch}
            >
              Search
            </Button> */}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default FormInsertUpdateUser;
