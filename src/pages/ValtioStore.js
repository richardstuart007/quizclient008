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
  v_QuestionSort: true,
  v_ShowQid: true,
  v_ReviewSkipPass: true,
  v_TestData: true,
  //
  //  Current State Variables
  //
  v_Page: 'QuizSelect',
  v_PagePrevious: '',

  //
  //  Signon Information
  //
  v_Email: '',
  v_Name: '',
  v_SignedIn: false,
  //
  //  Data Selection Parameters
  //
  v_Owner: 'public',
  v_Group1: '',
  v_Group2: '',
  v_Group3: '',
  v_MaxQuestions: 10,
  //
  //  Data Selection Results
  //
  v_Data: [],
  v_Quest: [],
  v_Hands: [],
  v_Bidding: [],
  v_Links: [],
  v_Refs: [],
  //
  //  Quiz State Variables
  //
  v_Reset: true,
  v_Help: '',
  v_Ans: []
})

export { ValtioStore }
