import { proxy } from 'valtio'

const ValtioStore = proxy({
  //
  // Settings
  //
  v_HideParams: false,
  v_RandomSort: true,
  v_ReviewSkipPass: true,
  v_AllowSelection: true,
  v_ShowQid: true,
  v_ShowInfo: false,
  v_ShowLinearProgress: true,
  v_ShowLinearScore: true,
  v_ShowButtonHelp: false,
  v_ShowButtonSettings: false,
  v_ShowSelectionOwner: false,
  v_ShowSelectionGroup1: true,
  v_ShowSelectionGroup2: false,
  v_ShowSelectionGroup3: false,
  //
  //  Static data or Server Data
  //
  v_StaticData: true,
  //
  //  Navigation State Variables
  //
  v_Params: null,
  v_Page: 'QuizRestart',
  v_PagePrevious: '',
  //
  //  Signon Information
  //
  v_Email: '',
  v_Name: '',
  v_SignedIn: false,
  //
  //  Data - All Options
  //
  v_OwnerOptions: [],
  v_Group1Options: [],
  v_Group2Options: [],
  v_Group3Options: [],
  //
  //  Data - All
  //
  v_Questions: [],
  v_Hands: [],
  v_Bidding: [],
  v_RefLinks: [],
  //
  //  Data Selection Parameters
  //
  v_Owner: 'public',
  v_Group1: '',
  v_Group2: '',
  v_Group3: '',
  v_MaxQuestions: 20,
  //
  //  Data - Selected
  //
  v_QFilter: [],
  v_QFilterSort: [],
  v_QRefs: [],
  //
  //  Quiz State Variables
  //
  v_Reset: true,
  v_Help: '',
  v_Ans: []
})

export { ValtioStore }
