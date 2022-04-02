//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
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
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
function QuizControl() {
  if (g_log1) console.log('Start QuizControl')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Get the URL Parameters (once only)
  //
  const Params = snapShot.v_Params
  if (Params === null) {
    ValtioStore.v_Params = false
    const queryString = window.location.search
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString)
    //
    //  Extract the parameters
    //
    if (urlParams.has('testdata')) {
      const vpTestData = urlParams.get('testdata')
      const vpAllowSelection = urlParams.get('allowselection')
      const vpPage = urlParams.get('page')
      const vpEmail = urlParams.get('email')
      const vpName = urlParams.get('name')
      const vpOwner = urlParams.get('owner')
      const vpGroup1 = urlParams.get('group1')
      const vpGroup2 = urlParams.get('group2')
      const vpGroup3 = urlParams.get('group3')
      console.log('vpTestData ', vpTestData)
      console.log('vpAllowSelection ', vpAllowSelection)
      console.log('vppage ', vpPage)
      console.log('vpemail ', vpEmail)
      console.log('vpname ', vpName)
      console.log('vpowner ', vpOwner)
      console.log('vpgroup1 ', vpGroup1)
      console.log('vpgroup2 ', vpGroup2)
      console.log('vpgroup3 ', vpGroup3)
      //
      //  Update the Store
      //
      ValtioStore.v_Params = true
      vpTestData === 'true'
        ? (ValtioStore.v_TestData = true)
        : (ValtioStore.v_TestData = false)
      vpAllowSelection === 'true'
        ? (ValtioStore.v_AllowSelection = true)
        : (ValtioStore.v_AllowSelection = false)
      ValtioStore.v_Page = vpPage
      ValtioStore.v_Email = vpEmail
      ValtioStore.v_Name = vpName
      ValtioStore.v_Owner = vpOwner
      ValtioStore.v_Group1 = vpGroup1
      ValtioStore.v_Group2 = vpGroup2
      ValtioStore.v_Group3 = vpGroup3
    }
  }
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
