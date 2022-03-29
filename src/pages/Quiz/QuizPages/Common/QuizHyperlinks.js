//
//  Libraries
//
import { Typography, Button, Box } from '@mui/material'
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
        <Typography variant='subtitle2' gutterBottom>
          Help Articles
        </Typography>
        {qhl1 && (
          <Button
            onClick={openTab(qhl1)}
            type='submit'
            style={{ color: 'blue' }}
            variant='outlined'
            size='small'
          >
            Article1
          </Button>
        )}

        {qhl2 && (
          <Button
            onClick={openTab(qhl2)}
            type='submit'
            style={{ color: 'blue' }}
            variant='outlined'
            size='small'
          >
            Article2
          </Button>
        )}
      </Box>
    </>
  )
}

export default QuizHyperlinks
