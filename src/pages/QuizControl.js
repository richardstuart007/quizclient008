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
  //.............................................................................
  //.  Unpack Parameters
  //.............................................................................
  const UnpackParams = () => {
    if (g_log1) console.log('Get Parameters')
    ValtioStore.v_Params = false
    //
    //  Get Query string of Parameters
    //
    const queryString = window.location.search
    if (g_log1) console.log('queryString ', queryString)
    if (!queryString) return
    //
    //  Extract the parameters
    //
    if (g_log1) console.log('Has Parameters')
    //
    //  Update the Store
    //
    ValtioStore.v_Params = true

    const urlParams = new URLSearchParams(queryString)
    if (g_log1) console.log('urlParams ', urlParams)
    //..............................
    //  Dev Mode
    //..............................
    //
    //  Override defaults
    //
    const devmode = urlParams.get('devmode')
    if (devmode) {
      if (devmode === 'true') {
        ValtioStore.v_ShowButtonHelp = true
        ValtioStore.v_ShowButtonSettings = true
        ValtioStore.v_ShowSelectionOwner = true
        ValtioStore.v_ShowSelectionGroup1 = true
        ValtioStore.v_ShowSelectionGroup2 = true
        ValtioStore.v_ShowSelectionGroup3 = true
      }
    }
    //..............................
    //  Data Source
    //..............................
    //
    //  old parameter
    const vptestdata = urlParams.get('testdata')
    if (vptestdata) {
      vptestdata === 'true'
        ? (ValtioStore.v_StaticData = true)
        : (ValtioStore.v_StaticData = false)
    }
    //
    //  new parameter
    const vpStaticData = urlParams.get('staticdata')
    if (vpStaticData) {
      vpStaticData === 'true'
        ? (ValtioStore.v_StaticData = true)
        : (ValtioStore.v_StaticData = false)
    }
    //..............................
    //  Selection
    //..............................
    const vpAllowSelection = urlParams.get('allowselection')
    if (g_log1) console.log('vpAllowSelection ', vpAllowSelection)
    if (vpAllowSelection) {
      vpAllowSelection === 'true'
        ? (ValtioStore.v_AllowSelection = true)
        : (ValtioStore.v_AllowSelection = false)
    }

    const vpOwner = urlParams.get('owner')
    if (vpOwner) ValtioStore.v_Owner = vpOwner
    if (g_log1) console.log('vpOwner ', vpOwner)

    const vpGroup1 = urlParams.get('group1')
    if (vpGroup1) ValtioStore.v_Group1 = vpGroup1
    if (g_log1) console.log('vpGroup1 ', vpGroup1)

    const vpGroup2 = urlParams.get('group2')
    if (vpGroup2) ValtioStore.v_Group2 = vpGroup2

    const vpGroup3 = urlParams.get('group3')
    if (vpGroup3) ValtioStore.v_Group3 = vpGroup3
    //..............................
    //  Remove Parameters
    //..............................
    const HideParams = snapShot.v_HideParams
    if (HideParams) {
      if (g_log1) console.log('Hide Parameters')
      // eslint-disable-next-line
      history.replaceState({}, null, 'Params')
    }
  }
  //.............................................................................
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Get the URL Parameters (once only)
  //
  const Params = snapShot.v_Params
  if (Params === null) {
    UnpackParams()
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
      ValtioStore.v_DataLoad = true
      CurrentPage = 'QuizServerData'
    }
    //
    //  Load Static data to Store (Once only)
    //
    else {
      if (g_log1) console.log('snapShot.v_DataLoad ', snapShot.v_DataLoad)
      if (snapShot.v_DataLoad) {
        ValtioStore.v_DataLoad = false
        if (g_log1) console.log('call QuizStaticData ')
        QuizStaticData()
      }
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
