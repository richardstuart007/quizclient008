//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizTest from './QuizTest/QuizTest'
import QuizSettings from './QuizSettings/QuizSettings'
import QuizRegister from './QuizRegister/QuizRegister'
import QuizSignin from './QuizSignin/QuizSignin'
import QuizSelect from './QuizSelect/QuizSelect'
import Quiz from './Quiz/Quiz'
import QuizResults from './QuizResults/QuizResults'
import QuizReview from './QuizReview/QuizReview'
import QuizGoodbye from './QuizGoodbye/QuizGoodbye'
//
//  Utilities
//
import { ValtioStore } from './ValtioStore'
//
//  Debug logging
//
let g_log1 = false
//===================================================================================
function QuizControl() {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Set Debug State
  //
  g_log1 = snapShot.v_Log
  if (g_log1) console.log('Start QuizControl')
  //
  //  Retrieve the state
  //
  const page = snapShot.v_Page
  if (g_log1) console.log('Page: ', page)
  //
  //  Present the selected component
  //
  switch (page) {
    case 'QuizSettings':
      return <QuizSettings />
    case 'QuizTest':
      return <QuizTest />
    case 'QuizRegister':
      return <QuizRegister />
    case 'QuizSignin':
      return <QuizSignin />
    case 'QuizSelect':
      return <QuizSelect />
    case 'Quiz':
      return <Quiz />
    case 'QuizResults':
      return <QuizResults />
    case 'QuizReview':
      return <QuizReview />
    case 'QuizGoodbye':
      return <QuizGoodbye />
    default:
      return <p>error</p>
  }
}

export default QuizControl
