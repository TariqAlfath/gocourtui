import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { CustomResultBase } from 'src/models/ResultBase/ResultBase';
import {
  JenisLapangan,
  MReqInsertJenisLapangan,
  MReqUpdateJenisLapangan
} from 'src/models/master/JenisLapangan/jenisLapangan';

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
    setDataPeserta(new JenisLapangan());
    setIsUpdate(false);
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      var data = dataPeserta;

      var jlUpdate: MReqUpdateJenisLapangan = new MReqUpdateJenisLapangan();
      jlUpdate.IdJenisLapangan = data.idJenisLapangan;
      jlUpdate.NamaJenisLapangan = data.namaJenisLapangan;

      var insertJL: MReqInsertJenisLapangan = new MReqInsertJenisLapangan();
      insertJL.NamaJenisLapangan = data.namaJenisLapangan;

      var response = new CustomResultBase();

      if (isUpdate) {
        response = await jlUpdate.UpdateJenisLapangan(jlUpdate);
      } else {
        response = await insertJL.InsertJenisLapangan(insertJL);
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
      <DialogTitle sx={{ fontWeight: 600 }}>Jenis Lapangan Form</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="NamaJenisLapangan"
              label="Nama Jenis Lapangan"
              // disabled={isUpdate}
              type="text"
              fullWidth
              value={dataPeserta.namaJenisLapangan}
              onChange={(e) => {
                setDataPeserta((old) => ({
                  ...old,
                  namaJenisLapangan: e.target.value
                }));
              }}
              variant="standard"
              sx={{ marginBottom: '8px' }} // Adjust the margin to your preference
              InputLabelProps={{ shrink: true }} // Set a smaller font size for the label
            />
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
