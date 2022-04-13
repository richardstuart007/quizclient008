//
//  Libraries
//
import { Box } from '@mui/material'
import { orange } from 'material-ui-colors'
//
//  Controls
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
const QuizHyperlinks = ({ quizRow }) => {
  //
  //  Deconstruct row
  //
  const { qhl1, qhl2 } = quizRow
  if (g_log1) console.log('quizRow ', quizRow)
  if (g_log1) console.log('qhl1 ', qhl1)
  if (g_log1) console.log('qhl2 ', qhl2)
  //
  //  Empty links
  //
  if (!qhl1 && !qhl2) {
    return null
  }
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <>
      <Box>
        {qhl1 && (
          <MyButton
            onClick={openTab(qhl1)}
            type='submit'
            style={{ color: orange['A700'] }}
            variant='outlined'
            size='small'
            text='Help Article1'
          ></MyButton>
        )}

        {qhl2 && (
          <MyButton
            onClick={openTab(qhl2)}
            type='submit'
            style={{ color: orange['A700'] }}
            variant='outlined'
            size='small'
            text='Help Article2'
          ></MyButton>
        )}
      </Box>
    </>
  )
}

export default QuizHyperlinks
