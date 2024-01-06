import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  ListItemText,
  List,
  ListItem,
  Divider,
  Switch,
  ListItemAvatar,
  Avatar,
  styled,
  Typography,
  TextField,
  Grid
} from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import PhoneLockedTwoToneIcon from '@mui/icons-material/PhoneLockedTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import Text from 'src/components/Text';
import { MResGetGrouppedStatus } from 'src/models/Report/Report';
import { ca } from 'date-fns/locale';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

function SummaryOrder() {
  const [checked, setChecked] = useState(['phone_verification']);
  const [monthOrder, setMonthOrder] = useState<Date>(new Date());
  const [statusOrder, setStatusOrder] = useState(new MResGetGrouppedStatus());
  useEffect(() => {
    fetchStatusOrder();
  }, [monthOrder]);

  const fetchStatusOrder = async () => {
    try {
      var response = await new MResGetGrouppedStatus().GetGrouppedStatus(
        monthOrder
      );
      // alert(JSON.stringify(response));
      if (response.resultCode == '1000') {
        setStatusOrder(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card>
      <CardHeader title="Summary Order's" />
      <Grid sx={{ padding: '16px;' }}>
        <Grid item xs={12} md={4} lg={4}>
          <DatePicker
            label={'Pick Month !'}
            value={monthOrder}
            onChange={(newValue) => {
              setMonthOrder(newValue as Date);
              // alert(newValue);
            }}
            views={['month', 'year']}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Divider />
      <List disablePadding>
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemAvatar>
            <AvatarWrapperSuccess>
              <PhoneLockedTwoToneIcon />
            </AvatarWrapperSuccess>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Accepted</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text color="success">Accepted Transaction</Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
          <Text>{statusOrder.acceptedCount}</Text>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemAvatar>
            <AvatarWrapperWarning>
              <EmailTwoToneIcon />
            </AvatarWrapperWarning>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Pending</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text color="warning">Pending Transaction</Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
          <Text>{statusOrder.pendingCount}</Text>
        </ListItem>
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemAvatar>
            <AvatarWrapperError>
              <LockTwoToneIcon />
            </AvatarWrapperError>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Reject</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text color="error">Rejected Transaction</Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
          <Text>{statusOrder.rejectedCount}</Text>
        </ListItem>
        <Divider />
      </List>
    </Card>
  );
}

export default SummaryOrder;
