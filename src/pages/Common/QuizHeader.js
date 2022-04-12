//
//  Libraries
//
import { Typography, Box } from '@mui/material'
import { teal } from 'material-ui-colors'
//
//  Components
//
import MyButton from '../../components/controls/MyButton'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false
//===================================================================================
const QuizHeader = ({ quizRow, quizQuestion }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qdetail } = quizRow
  let hyperLink
  qdetail.substring(0, 8) === 'https://'
    ? (hyperLink = true)
    : (hyperLink = false)
  if (g_log1) console.log('hyperLink ', hyperLink)
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <Box>
        <Typography
          variant='subtitle2'
          gutterBottom
          style={{ color: teal['A700'] }}
        >
          Question {quizQuestion}
        </Typography>

        {hyperLink && (
          <MyButton
            onClick={openTab(qdetail)}
            type='submit'
            style={{ color: 'blue' }}
            variant='outlined'
            size='small'
            text='Question'
          ></MyButton>
        )}

        {!hyperLink && (
          <Box>
            <Typography variant='h6' style={{ color: 'blue' }} gutterBottom>
              {qdetail}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  )
}

export default QuizHeader
