//
//  Libraries
//
import { Typography, Table, TableBody, Card } from '@mui/material'
import { cyan, teal } from 'material-ui-colors'
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//
//  Sub Components
//
import QuizBiddingTableHeader from './QuizBiddingTableHeader'
import QuizBiddingTableLine from './QuizBiddingTableLine'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizBidding = ({ qid }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('qid ', qid)
  let testingQid = qid
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Get store BiddingRow
  //
  let BiddingRowAll = []
  snapShot.v_Bidding.forEach(row => {
    const rowData = { ...row }
    if (g_log1) console.log('rowData ', rowData)
    BiddingRowAll.push(rowData)
  })
  if (g_log1) console.log('BiddingRowAll ', BiddingRowAll)
  //
  //  Find the BiddingRow
  //
  let BiddingRow = BiddingRowAll.find(element => element.bid === testingQid)
  if (g_log1) console.log('BiddingRow ', BiddingRow)
  //
  //  Has BiddingRow ?
  //
  let hasBidding
  BiddingRow === undefined ? (hasBidding = false) : (hasBidding = true)
  if (g_log1) console.log('hasBidding ', hasBidding)
  //
  //  No BiddingRow, return
  //
  if (hasBidding === false) return null
  //
  //  Build Bidding Arrays
  //
  let Bidding = BiddingRow.bbidding
  if (g_log1) console.log('Bidding ', Bidding)
  let bidsArray = []
  Bidding.forEach(bid => {
    if (g_log1) console.log('bid ', bid)
    const level = bid.substr(0, 1)
    if (g_log1) console.log('level ', level)
    const bidObj = {
      bid: '',
      suit: ''
    }
    switch (level) {
      case 'P':
        bidObj.bid = bid
        bidObj.suit = null
        bidsArray.push(bidObj)
        break
      case 'X':
        bidObj.bid = bid
        bidObj.suit = null
        bidsArray.push(bidObj)
        break
      default:
        if (bid.substr(1, 1) === 'N') {
          bidObj.bid = bid
          bidObj.suit = null
          bidsArray.push(bidObj)
        } else {
          bidObj.bid = level
          bidObj.suit = bid.substr(1, 1)
          bidsArray.push(bidObj)
        }
        break
    }
  })
  if (g_log1) console.log('bidsArray ', bidsArray)
  //
  //  Array of rounds
  //
  let roundsArray = []
  let roundArray = []
  let i = 0
  bidsArray.forEach(bidObj => {
    i++
    roundArray.push(bidObj)
    if (i % 4 === 0) {
      roundsArray.push(roundArray)
      roundArray = []
    }
  })
  roundsArray.push(roundArray)
  if (g_log1) console.log('roundsArray ', roundsArray)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Typography
        variant='subtitle2'
        style={{ color: teal['A700'] }}
        sx={{ marginTop: '8px' }}
      >
        Bidding
      </Typography>
      <Card sx={{ maxWidth: 400 }} style={{ backgroundColor: cyan['A100'] }}>
        <Table>
          {/* .......................................................................................... */}
          <QuizBiddingTableHeader />
          {/* .......................................................................................... */}
          <TableBody>
            {roundsArray.map((innerArray, roundidx) => (
              <>
                <QuizBiddingTableLine
                  key={roundidx + 1}
                  round={innerArray}
                  roundidx={roundidx + 1}
                />
              </>
            ))}
          </TableBody>
          {/* .......................................................................................... */}
        </Table>
      </Card>
    </>
  )
}

export default QuizBidding
