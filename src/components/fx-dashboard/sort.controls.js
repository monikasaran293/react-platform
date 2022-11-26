import { Chip, Stack } from "@mui/material"
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SORT_LIST, SORT_ORDER } from "../../constants/fx.rate.constants"

const SortControls = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {

  const onChipClick = (sortType) => {
    if (sortType === sortBy) {
      setSortOrder(SORT_ORDER[sortOrder])
    } else {
      setSortOrder(SORT_ORDER.desc)
      setSortBy(sortType)
    }
  }

  return (
    <Stack direction="row" spacing={1}>
      {
        Object.keys(SORT_LIST).map((sortType) => {
          const variant = sortBy === sortType ? 'filled' : 'outlined'
          const label = `Sort by ${sortType}`
          let icon = <UnfoldMoreIcon />
          if (sortBy === sortType) {
            icon = sortOrder === SORT_ORDER.desc ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          return <Chip
            icon={icon}
            key={sortType}
            color={'primary'}
            variant={variant}
            clickable
            onClick={() => onChipClick(sortType)}
            label={label} />
        })
      }
    </Stack>
  )
}

export default SortControls