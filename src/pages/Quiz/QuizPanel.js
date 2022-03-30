//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Typography } from '@mui/material'
import { teal } from 'material-ui-colors'
//
//  Sub Components
//
import QuizPanelCard from './QuizPanelCard'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
let g_log1 = false
//===================================================================================
const QuizPanel = ({ quizRow, handleSelect }) => {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  if (g_log1) console.log('Start QuizPanel')
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qcorrect, qbad1, qbad2, qbad3 } = quizRow
  //
  //  Answers array
  //
  let Answers = []
  let j = 0
  loadAnswers(qcorrect)
  loadAnswers(qbad1)
  loadAnswers(qbad2)
  loadAnswers(qbad3)
  //
  //  Load Answers array with answer element
  //
  function loadAnswers(answer) {
    if (answer) {
      j++
      const ansObj = {
        random: Math.random(),
        id: j,
        details: answer
      }
      Answers.push(ansObj)
    }
  }
  //
  //  Sort the Answers by the random sort id
  //
  Answers.sort((a, b) => (a.random > b.random ? 1 : -1))
  if (g_log1) console.log(Answers)
  //
  //  Format Panel
  //
  return (
    <>
      <Typography
        variant='subtitle2'
        gutterBottom
        style={{ color: teal['A700'] }}
      >
        Answers - click on your selection
      </Typography>

      {Answers.map((answer, key) => (
        <QuizPanelCard key={key} answer={answer} handleSelect={handleSelect} />
      ))}
    </>
  )
}

export default QuizPanel
