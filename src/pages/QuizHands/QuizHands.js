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
  if (g_log1) console.log('HandsRow', HandsRow)

  if (HandsRow.hnorth) {
    const handObj = {
      position: '',
      hand: []
    }
    handObj.position = 'North'
    handObj.hand = [...HandsRow.hnorth]
    if (g_log1) console.log('handObj ', handObj)
    HandObjArray.push(handObj)
    if (g_log1) console.log('HandObjArray ', HandObjArray)
  }
  if (HandsRow.heast) {
    const handObj = {
      position: '',
      hand: []
    }
    handObj.position = 'East'
    handObj.hand = [...HandsRow.heast]
    if (g_log1) console.log('handObj ', handObj)
    HandObjArray.push(handObj)
    if (g_log1) console.log('HandObjArray ', HandObjArray)
  }
  if (HandsRow.hsouth) {
    const handObj = {
      position: '',
      hand: []
    }
    handObj.position = 'South'
    handObj.hand = [...HandsRow.hsouth]
    if (g_log1) console.log('handObj ', handObj)
    HandObjArray.push(handObj)
    if (g_log1) console.log('HandObjArray ', HandObjArray)
  }
  if (HandsRow.hwest) {
    const handObj = {
      position: '',
      hand: []
    }
    handObj.position = 'West'
    handObj.hand = [...HandsRow.hwest]
    if (g_log1) console.log('handObj ', handObj)
    HandObjArray.push(handObj)
    if (g_log1) console.log('HandObjArray ', HandObjArray)
  }

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
