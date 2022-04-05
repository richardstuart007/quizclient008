//
//  Libraries
//
import { Typography, Box } from '@mui/material'
import { green, red } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import QuizReviewCard from './QuizReviewCard'
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
export default function QuizReviewPanel({ quizRow, quizanswer }) {
  if (g_log1) console.log('Start QuizReviewPanel')
  //
  //  Deconstruct
  //
  const { qcorrect, qbad1, qbad2, qbad3 } = quizRow
  let Ans = []
  Ans.push(qbad1)
  Ans.push(qbad2)
  Ans.push(qbad3)

  if (g_log1) console.log(quizanswer)

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant='subtitle2' gutterBottom style={{ color: 'green' }}>
          Answer
        </Typography>

        <QuizReviewCard
          key={1}
          field={qcorrect}
          style={{ color: green['A100'] }}
          backgroundColor={quizanswer === 1 ? green.A100 : 'white'}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        {quizanswer === 1 ? (
          <Typography
            variant='subtitle2'
            gutterBottom
            style={{ color: 'green' }}
          >
            Your Answer is CORRECT
          </Typography>
        ) : (
          <Typography variant='subtitle2' gutterBottom style={{ color: 'red' }}>
            YOUR answer is INCORRECT
          </Typography>
        )}

        {Ans.map((answer, index) => (
          <QuizReviewCard
            key={index + 1}
            field={answer}
            backgroundColor={quizanswer - 2 === index ? red.A100 : 'white'}
          />
        ))}
      </Box>
    </>
  )
}
