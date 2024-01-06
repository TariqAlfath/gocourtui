import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface PageHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ open, setOpen }) => {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Transactions
        </Typography>
        <Typography variant="subtitle2">
          {JSON.parse(localStorage.getItem('Profile')).nama}, are you ready to
          create a new transaction?
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            setOpen(true);
            // alert('test');
          }}
        >
          Create transaction
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
