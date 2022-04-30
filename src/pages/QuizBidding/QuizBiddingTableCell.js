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
const QuizBiddingTableCell = props => {
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
  //
  //  Source svg
  //
  let src
  switch (suit) {
    case 'C':
      src = club
      break
    case 'D':
      src = diamond
      break
    case 'H':
      src = heart
      break
    case 'S':
      src = spade
      break
    default:
      src = null
      break
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      {/* .......................................................................................... */}
      {/*  Bid & Suit                                                                               */}
      {/* .......................................................................................... */}
      <TableCell align='left' sx={{ padding: '4px' }}>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
        >
          {/* .......................................................................................... */}
          {/*  Bid                                                                               */}
          {/* .......................................................................................... */}
          <Grid item>
            <Typography variant='h6'>{bid}</Typography>
          </Grid>
          {/* .......................................................................................... */}
          {/*  Suit Symbol                                                                               */}
          {/* .......................................................................................... */}
          {suit !== null && (
            <Grid item>
              <Avatar src={src} sx={{ height: '1rem', width: '1rem' }} />
            </Grid>
          )}

          {/* .......................................................................................... */}
        </Grid>
      </TableCell>
      {/* .......................................................................................... */}
    </>
  )
}

export default QuizBiddingTableCell
