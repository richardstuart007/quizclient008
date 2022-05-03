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
import QuizHandsTableHeader from './QuizHandsTableHeader'
import QuizHandsTableLine from './QuizHandsTableLine'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizHands = ({ qid }) => {
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
  //  Get store HandsRow (ALL)
  //
  let HandsRowAll = []
  snapShot.v_Hands.forEach(row => {
    const rowData = { ...row }
    if (g_log1) console.log('rowData ', rowData)
    HandsRowAll.push(rowData)
  })
  if (g_log1) console.log('HandsRowAll ', HandsRowAll)
  //
  //  Find the HandsRow for this ID
  //
  let HandsRow = HandsRowAll.find(element => element.hid === testingQid)
  if (g_log1) console.log('HandsRow ', HandsRow)
  //
  //  Has HandsRow ?
  //
  let hasHands
  HandsRow === undefined ? (hasHands = false) : (hasHands = true)
  if (g_log1) console.log('hasHands ', hasHands)
  //
  //  No HandsRow, return
  //
  if (hasHands === false) return null
  //
  //  Build HandObj Array - N/E/S/W
  //
  let HandObjArray = []
  const handObj = {
    position: '',
    hand: []
  }
  if (HandsRow.hnorth) {
    handObj.position = 'North'
    handObj.hand = HandsRow.hnorth
    HandObjArray.push(handObj)
  }
  if (HandsRow.heast) {
    handObj.position = 'East'
    handObj.hand = HandsRow.heast
    HandObjArray.push(handObj)
  }
  if (HandsRow.hsouth) {
    handObj.position = 'South'
    handObj.hand = HandsRow.hsouth
    HandObjArray.push(handObj)
  }
  if (HandsRow.hwest) {
    handObj.position = 'West'
    handObj.hand = HandsRow.hwest
    HandObjArray.push(handObj)
  }
  if (g_log1) console.log('HandObjArray ', HandObjArray)

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
        Hands
      </Typography>

      <Card sx={{ maxWidth: 500 }} style={{ backgroundColor: cyan['A100'] }}>
        <Table>
          {/* .......................................................................................... */}
          <QuizHandsTableHeader />
          {/* .......................................................................................... */}
          <TableBody>
            {HandObjArray.map((handObj, handidx) => (
              <>
                <QuizHandsTableLine
                  key={handidx + 1}
                  handObj={handObj}
                  handidx={handidx + 1}
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

export default QuizHands
