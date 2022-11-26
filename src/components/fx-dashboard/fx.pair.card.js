import { Card, Grid, IconButton, TextField } from "@mui/material"
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import './fx.pair.card.css'
import { useContext, useEffect, useState } from "react";
import { useRateConverter } from "../../fx.api";
import { FxRatesDashboardContext } from "../../App";
import { format } from "date-fns";

const FxPairCard = ({ id, fxPair }) => {
  const { from, to, background, inverted, lastUpdated, rate = 0 } = fxPair

  const { dispatch } = useContext(FxRatesDashboardContext);
  const { refetch, isLoading, data } = useRateConverter({ from, to })

  const [fromValue, setFromValue] = useState(1)
  const [toValue, setToValue] = useState(fromValue * rate)

  useEffect(() => {
    refetch()
  }, [to, from])

  useEffect(() => {
    const currentRate = data?.data?.result
    if (currentRate) {
      onCardUpdate({ rate: currentRate, lastUpdated: new Date() })
    }
  }, [data])

  useEffect(() => {
    onChangeFromValue(fromValue)
  }, [rate])

  const onCardUpdate = (payload = null) => {
    if (payload) {
      dispatch({
        type: 'UPDATE_FX_PAIR',
        data: { id, payload: { ...fxPair, ...payload } }
      })
    } else {
      dispatch({ type: 'REMOVE_FX_PAIR', data: id })
    }
  }

  const onChangeFromValue = (value) => {
    const updatedToValue = value * rate
    setFromValue(value)
    setToValue(updatedToValue)
  }

  const onChangeToValue = (value) => {
    const updatedFromValue = value / rate
    setToValue(value)
    setFromValue(updatedFromValue)
  }

  return <Card sx={{ padding: '14px', background }}>
    <Grid container>
      <Grid
        item
        xs={3}
        display={'flex'}
        gap={3}
        flexDirection={'column'}
        position={'relative'}
        justifyContent={'space-between'}>
        <div className="rate-label">{from}</div>
        <div className="arrowWrapper" onClick={() => onCardUpdate({ to: from, from: to, inverted: !inverted })}>
          <div className="arrow"></div>
        </div>
        <div className="rate-label">{to}</div>
        <div className="rate">
          <div>{isLoading ? 'Loading...' : rate}</div>
        </div>
      </Grid>

      <Grid container gap={2} item xs={9} justifyContent={'flex-end'}>
        <div>
          <IconButton aria-label="delete" onClick={refetch}>
            <RefreshIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => onCardUpdate()}>
            <CloseIcon />
          </IconButton>
        </div>
        <Grid container gap={2} flexDirection={'column'}>
          <TextField type={'number'} value={fromValue} onChange={(e) => onChangeFromValue(e.target.value)} />
          <TextField type={'number'} value={toValue} onChange={(e) => onChangeToValue(e.target.value)} />
        </Grid>
        <Grid container gap={1} item xs={6} justifyContent={'flex-end'}>
          <div style={{ color: '#7c7979' }}>
            Last Updated
          </div>
          {format(lastUpdated || new Date(), 'dd-MMM-yyyy hh:mm:ss')}
        </Grid>
      </Grid>
    </Grid>
  </Card >
}

export default FxPairCard