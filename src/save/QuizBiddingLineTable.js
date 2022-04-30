import TableRow from '@mui/material/TableRow'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizBiddingLineTableCell from './QuizBiddingLineTableCell'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
const QuizBiddingLineTable = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('props ', props)
  //
  //  Destructure props
  //
  const { round, roundidx } = props
  if (g_log1) console.log('round ', round)
  if (g_log1) console.log('roundidx ', roundidx)
  //
  //  round into Object
  //
  const roundBid = {
    north: null,
    east: null,
    south: null,
    west: null
  }
  if (round[0]) roundBid.north = round[0].bid
  if (round[1]) roundBid.east = round[1].bid
  if (round[2]) roundBid.south = round[2].bid
  if (round[3]) roundBid.west = round[3].bid

  if (g_log1) console.log('roundBid ', roundBid)
  //
  //  round into Object
  //
  const roundSuit = {
    north: null,
    east: null,
    south: null,
    west: null
  }
  if (round[0]) roundSuit.north = round[0].suit
  if (round[1]) roundSuit.east = round[1].suit
  if (round[2]) roundSuit.south = round[2].suit
  if (round[3]) roundSuit.west = round[3].suit
  if (g_log1) console.log('roundSuit ', roundSuit)

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <TableRow>
      <QuizBiddingLineTableCell bid={roundBid.north} suit={roundSuit.north} />
      <QuizBiddingLineTableCell bid={roundBid.east} suit={roundSuit.east} />
      <QuizBiddingLineTableCell bid={roundBid.south} suit={roundSuit.south} />
      <QuizBiddingLineTableCell bid={roundBid.west} suit={roundSuit.west} />
    </TableRow>
  )
}

export default QuizBiddingLineTable
