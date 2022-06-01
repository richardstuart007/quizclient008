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
import QuizSettings from './QuizSettings/QuizSettings'
import QuizRegister from './QuizRegister/QuizRegister'
import QuizSignin from './QuizSignin/QuizSignin'
import QuizServerData from './QuizServerData/QuizServerData'
import QuizSelect from './QuizSelect/QuizSelect'
import Quiz from './Quiz/Quiz'
import QuizReview from './QuizReview/QuizReview'
import QuizRefs from './QuizRefs/QuizRefs'
//
//  Static Data
//
import QuizStaticData from '../datastatic/QuizStaticData'
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
    if (g_log1) console.log('Get Parameters')
    ValtioStore.v_Params = false
    const queryString = window.location.search
    if (g_log1) console.log('queryString ', queryString)
    const urlParams = new URLSearchParams(queryString)
    //
    //  Extract the parameters
    //
    if (urlParams.has('testdata')) {
      if (g_log1) console.log('Has Parameters')
      const vpStaticData = urlParams.get('testdata')
      const vpAllowSelection = urlParams.get('allowselection')
      const vpPage = urlParams.get('page')
      const vpEmail = urlParams.get('email')
      const vpName = urlParams.get('name')
      const vpOwner = urlParams.get('owner')
      const vpGroup1 = urlParams.get('group1')
      const vpGroup2 = urlParams.get('group2')
      const vpGroup3 = urlParams.get('group3')
      const vpShowLinearProgress = urlParams.get('ShowLinearProgress')
      const vpShowLinearScore = urlParams.get('ShowLinearScore')
      if (g_log1) console.log('vpStaticData ', vpStaticData)
      if (g_log1) console.log('vpAllowSelection ', vpAllowSelection)
      if (g_log1) console.log('vppage ', vpPage)
      if (g_log1) console.log('vpemail ', vpEmail)
      if (g_log1) console.log('vpname ', vpName)
      if (g_log1) console.log('vpowner ', vpOwner)
      if (g_log1) console.log('vpgroup1 ', vpGroup1)
      if (g_log1) console.log('vpgroup2 ', vpGroup2)
      if (g_log1) console.log('vpgroup3 ', vpGroup3)
      //
      //  Update the Store
      //
      ValtioStore.v_Params = true
      vpStaticData === 'true'
        ? (ValtioStore.v_StaticData = true)
        : (ValtioStore.v_StaticData = false)
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
      vpShowLinearProgress === 'false'
        ? (ValtioStore.v_ShowLinearProgress = false)
        : (ValtioStore.v_ShowLinearProgress = true)
      vpShowLinearScore === 'false'
        ? (ValtioStore.v_ShowLinearScore = false)
        : (ValtioStore.v_ShowLinearScore = true)
      if (g_log1) console.log('snapShot.v_Page ', snapShot.v_Page)
      //
      //  Remove Parameters
      //
      const HideParams = snapShot.v_HideParams
      if (HideParams) {
        if (g_log1) console.log('Hide Parameters')
        // eslint-disable-next-line
        history.replaceState({}, null, 'Params')
      }
    }
  }
  //
  //  Retrieve the Current Page
  //
  let CurrentPage = snapShot.v_Page
  if (g_log1) console.log('CurrentPage: ', CurrentPage)
  //
  //  Override the page if QuizRestart (QuizSelect/QuizServerData)
  //
  if (CurrentPage === 'QuizRestart') {
    //
    //  Load Server data to store
    //
    if (snapShot.v_StaticData === false) {
      if (g_log1) console.log(`Override Page: ${CurrentPage} to QuizServerData`)
      ValtioStore.v_Page = 'QuizServerData'
      CurrentPage = 'QuizServerData'
    }
    //
    //  Load Static data to Store
    //
    else {
      QuizStaticData()
      if (g_log1) console.log(`Override Page: ${CurrentPage} to QuizSelect`)
      ValtioStore.v_Page = 'QuizSelect'
      CurrentPage = 'QuizSelect'
    }
  }
  //
  //  Override the page if Server Data and not signed in
  //
  if (
    (CurrentPage === 'QuizSelect' || CurrentPage === 'QuizServerData') &
    (snapShot.v_StaticData === false) &
    (snapShot.v_SignedIn === false)
  ) {
    if (g_log1) console.log(`Override Page: ${CurrentPage} to QuizSignin`)
    ValtioStore.v_Page = 'QuizSignin'
    CurrentPage = 'QuizSignin'
  }
  //
  //  Present the selected component
  //
  switch (CurrentPage) {
    case 'QuizSettings':
      return <QuizSettings />
    case 'QuizRegister':
      return <QuizRegister />
    case 'QuizSignin':
      return <QuizSignin />
    case 'QuizServerData':
      return <QuizServerData />
    case 'QuizSelect':
      return <QuizSelect />
    case 'QuizRefs':
      return <QuizRefs />
    case 'Quiz':
      return <Quiz />
    case 'QuizReview':
      return <QuizReview />
    default:
      return <QuizSelect />
  }
}

export default QuizControl
