import {
  Card, IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PageHeader = ({ text, onBackClick = null }) => {
  return <Card sx={{ paddingX: 2, marginY: 4 }}>
    <h2>
      {
        onBackClick
          ? <IconButton aria-label="delete" onClick={onBackClick}>
            <ArrowBackIcon />
          </IconButton>
          : <CalendarMonthIcon />
      }
      {text}
    </h2>
  </Card>
}

export default PageHeader