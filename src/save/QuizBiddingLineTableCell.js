import TableCell from '@mui/material/TableCell'
//
//  Libraries
//
import { Avatar, Typography, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import spade from '../../assets/spade.svg'
import heart from '../../assets/heart.svg'
import diamond from '../../assets/diamond.svg'
import club from '../../assets/club.svg'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
const QuizBiddingLineTableCell = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('props ', props)
  //
  //  Destructure props
  //
  const { bid, suit } = props
  if (g_log1) console.log('bid ', bid)
  if (g_log1) console.log('suit ', suit)

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <TableCell align='left'>
      <Grid item sx={{ paddingLeft: '8px' }}>
        <Typography variant='h6'>{bid}</Typography>
      </Grid>
      {suit === 'C' && (
        <Grid item>
          <Avatar src={club} sx={{ height: '1.25rem', width: '1.25rem' }} />
        </Grid>
      )}
      {suit === 'D' && (
        <Grid item>
          <Avatar src={diamond} sx={{ height: '1.25rem', width: '1.25rem' }} />
        </Grid>
      )}
      {suit === 'H' && (
        <Grid item>
          <Avatar src={heart} sx={{ height: '1.25rem', width: '1.25rem' }} />
        </Grid>
      )}
      {suit === 'S' && (
        <Grid item>
          <Avatar src={spade} sx={{ height: '1.25rem', width: '1.25rem' }} />
        </Grid>
      )}
    </TableCell>
  )
}

export default QuizBiddingLineTableCell
