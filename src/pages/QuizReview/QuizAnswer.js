//
//  Libraries
//
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box
} from '@mui/material'
import { green, red } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings(true)
//===================================================================================
export default function QuizAnswer(props) {
  //
  // Deconstruct Props
  //
  const { answer, AnswerNum, FieldNum } = props
  console.log(answer, AnswerNum, FieldNum)
  if (g_log1) console.log('answer ', answer)
  if (g_log1) console.log('AnswerNum ', AnswerNum)
  if (g_log1) console.log('FieldNum ', FieldNum)
  //
  //  .... Default white
  let backgroundColor = 'white'
  //  .... Correct Answer
  if (FieldNum === 1) backgroundColor = green.A100
  //  .... Bad Answer
  else if (AnswerNum === FieldNum) backgroundColor = red.A100
  //.............................................................................
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Card elevation={1} style={{ backgroundColor: backgroundColor }}>
          <CardActionArea>
            <CardContent sx={{ padding: '4px' }}>
              <Typography variant='body2' color='textSecondary'>
                {answer}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  )
}
