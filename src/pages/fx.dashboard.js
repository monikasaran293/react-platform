import IconButton from '@mui/material/IconButton';
import { useContext, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import PageHeader from "../components/page.header"
import CreateFxPair from '../components/fx-dashboard/create.fx.pair';
import FxPairCard from '../components/fx-dashboard/fx.pair.card';
import SortControls from '../components/fx-dashboard/sort.controls';

import { FxRatesDashboardContext } from '../App';
import { useCountrySymbols } from "../fx.api"

import { SORT_LIST, SORT_ORDER } from '../constants/fx.rate.constants';

const FxDashboard = () => {
  const { state: { fxPairData } } = useContext(FxRatesDashboardContext);

  const { isLoading, status, data } = useCountrySymbols()
  const [showModal, setShowModal] = useState(false)
  const [fxpairs, setFxPairs] = useState([])
  const [sortBy, setSortBy] = useState(SORT_LIST.createdAt)
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.desc)

  useEffect(() => {
    console.log(fxPairData);
  }, [fxPairData])

  useEffect(() => {
    sortFxPairs()
  }, [fxPairData, sortBy, sortOrder])

  const sortFxPairs = () => {
    const sortedPairs = cloneDeep(Object.values(fxPairData))
    switch (sortBy) {
      case SORT_LIST.createdAt:
      case SORT_LIST.lastUpdated:
      case SORT_LIST.rate:
        sortedPairs.sort((a, b) => {
          if (sortOrder === SORT_ORDER.asc)
            return b[sortBy] - a[sortBy]
          return a[sortBy] - b[sortBy]
        })
        break
      default:
        sortedPairs.sort((a, b) => {
          if (sortOrder === SORT_ORDER.asc)
            return b.id > a.id ? -1 : 1
          return a.id > b.id ? -1 : 1
        })
    }
    setFxPairs(sortedPairs)
  }

  return (
    <div>
      <PageHeader text={'FX Rate Converter'} />
      {
        fxpairs.length > 0 &&
        <>
          <SortControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder} />
          <Grid container my={2} spacing={2}>
            {
              fxpairs.map((fxPair) => {
                const { id } = fxPair
                return <Grid key={id} item xs={4}>
                  <FxPairCard id={id} fxPair={fxPair} />
                </Grid>
              })
            }
          </Grid>
        </>
      }

      <Grid container marginY={2} justifyContent={'flex-end'}>
        <IconButton
          size='large'
          onClick={() => setShowModal(true)}
          style={{ background: 'white' }}>
          <AddIcon />
        </IconButton>
      </Grid>
      {
        showModal
        && <CreateFxPair
          symbols={data?.data?.symbols}
          open={showModal}
          handleClose={() => setShowModal(false)} />
      }
    </div >
  )
}

export default FxDashboard