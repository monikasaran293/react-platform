import {
  Card, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Stack } from '@mui/system';

const PageHeader = ({ text, onBackClick = null }) => {
  return <Card sx={{ padding: 2, marginY: 4 }}>
    <Stack direction="row" spacing={1}>
      {
        onBackClick
          ? <IconButton aria-label="delete" onClick={onBackClick}>
            <ArrowBackIcon />
          </IconButton>
          : <CurrencyExchangeIcon />
      }
      <h2 style={{ paddingInline: '10px' }}>
        {text}
      </h2>
    </Stack>

  </Card>
}

export default PageHeader