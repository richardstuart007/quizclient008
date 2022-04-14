import { proxy } from 'valtio'

const ValtioStore = proxy({
  v_Params: null,
  v_HideParams: false,
  v_ShowInfo: false,
  v_ShowLinearProgress: true,
  v_ShowLinearScore: true,
  v_AllowSelection: true,
  v_TestData: true,
  v_Page: 'QuizTest',
  v_Email: '',
  v_Name: '',
  v_Owner: '',
  v_Group1: '',
  v_Group2: '',
  v_Group3: '',
  v_Data: [],
  v_Quest: [],
  v_Ans: [],
  v_Reset: true,
  v_MaxQuestions: 0,
  v_Help: ''
})

export { ValtioStore }
