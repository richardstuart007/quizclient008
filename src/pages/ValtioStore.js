import { proxy } from 'valtio'

const ValtioStore = proxy({
  //
  // Settings
  //
  v_Params: null,
  v_HideParams: false,
  v_ShowInfo: false,
  v_ShowLinearProgress: true,
  v_ShowLinearScore: true,
  v_AllowSelection: true,
  v_QFilterSortionSort: true,
  v_ShowQid: true,
  v_ReviewSkipPass: true,
  //
  //  Static data or Server Data
  //
  v_StaticData: true,
  //
  //  Navigation State Variables
  //
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
