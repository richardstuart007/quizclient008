//
//  Libraries
//
import { Typography, Box } from '@mui/material'
import { teal } from 'material-ui-colors'
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import MyButton from '../../components/controls/MyButton'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings(true)
//===================================================================================
const QuizHeader = params => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct params
  //
  const { quizRow, quizQuestion } = params
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const ShowQid = snapShot.v_ShowQid
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qid, qdetail } = quizRow
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
  //
  //  Question string (with ID ?)
  //
  let QuestionString = `Question ${quizQuestion}`
  if (ShowQid) QuestionString = QuestionString.concat(`        (ID:${qid})`)
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
          {QuestionString}
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
