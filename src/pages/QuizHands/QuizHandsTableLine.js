import TableRow from '@mui/material/TableRow'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizHandsTableCell from './QuizHandsTableCell'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
const QuizHandsTableLine = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('props ', props)
  //
  //  Destructure props
  //
  const { handObj, handidx } = props
  if (g_log1) console.log('handObj ', handObj)
  if (g_log1) console.log('handidx ', handidx)
  const { position, hand } = handObj
  if (g_log1) console.log('position ', position)
  if (g_log1) console.log('hand ', hand)

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <TableRow>
      <QuizHandsTableCell cell={position} />
      <QuizHandsTableCell cell={hand[0]} />
      <QuizHandsTableCell cell={hand[1]} />
      <QuizHandsTableCell cell={hand[2]} />
      <QuizHandsTableCell cell={hand[3]} />
    </TableRow>
  )
}

export default QuizHandsTableLine
