import { proxy } from 'valtio'

const ValtioStore = proxy({
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
  v_Log: false
})

export { ValtioStore }
