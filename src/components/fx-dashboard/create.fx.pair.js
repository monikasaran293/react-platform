import { useContext, useReducer } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material"
import { FxRatesDashboardContext } from "../../App";

const CreateFxPair = ({ symbols, open, handleClose }) => {
  const { dispatch } = useContext(FxRatesDashboardContext);

  const options = Object.keys(symbols)

  const [symbolPair, setSymbolPair] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { to: options[0], from: options[1], background: '#ffffff' }
  )

  const onSubmit = () => {
    const { from, to } = symbolPair
    const fxId = `${from}-${to}`

    dispatch({
      type: 'ADD_FX_PAIR',
      data: {
        id: fxId,
        ...symbolPair,
        createdAt: new Date()
      }
    })
    handleClose()
  }
  const renderSymbolOptions = (id) => {
    return <div style={{ paddingBlock: '10px' }}>
      <InputLabel id={id}>{id.toUpperCase()}*</InputLabel>
      <Select
        labelId={id}
        fullWidth
        value={symbolPair[id]}
        label={id}
        onChange={(e) => setSymbolPair({ [id]: e.target.value })} >
        {
          options.map((code) => (
            <MenuItem key={code} value={code}>
              {symbols[code].description}-{symbols[code].code}
            </MenuItem>
          ))
        }
      </Select>
    </div>
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Create FX Pair</DialogTitle>

      <DialogContent>
        {renderSymbolOptions('from')}
        {renderSymbolOptions('to')}
        <div style={{ paddingTop: '30px' }}>
          <TextField
            fullWidth
            type={'color'}
            label={'Color'}
            placeholder={'color'}
            value={symbolPair.background}
            onChange={(e) => setSymbolPair({ background: e.target.value })} />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onSubmit} variant={'contained'}>OK</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateFxPair