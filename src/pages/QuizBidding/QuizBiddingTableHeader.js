//
//  Libraries
//
import { TableCell, TableHead, TableRow } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
// Styles
//
const useStyles = makeStyles({
  tableCell: {
    maxWidth: '100px'
  }
})
//.............................................................................
//.  Initialisation
//.............................................................................

//===================================================================================
const QuizBiddingTableHeader = () => {
  //
  //  Styles
  //
  const classes = useStyles()
  //...................................................................................
  //.  Main Line
  //...................................................................................

  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{ padding: '4px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            North
          </TableCell>
          <TableCell
            sx={{ padding: '4px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            East
          </TableCell>
          <TableCell
            sx={{ padding: '4px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            South
          </TableCell>
          <TableCell
            sx={{ padding: '4px' }}
            align='left'
            style={{ width: 60 }}
            className={classes.tableCell}
          >
            West
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  )
}

export default QuizBiddingTableHeader
