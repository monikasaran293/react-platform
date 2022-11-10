import { Box, Skeleton } from "@mui/material"

const Loader = () => {
  return <Box sx={{ margin: 4 }}>
    <Skeleton variant="text" height={100} />
    <Skeleton variant="rectangular" height={320} />
  </Box>
}

export default Loader