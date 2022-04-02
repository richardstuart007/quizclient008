//
//  Utilities
//
import apiAxios from '../../services/apiAxios'
//
// Constants
//
const sqlClient = 'Quiz/QuizGetData'
const { URL_BASE } = require('../../services/constants.js')
const { URL_QUESTIONS } = require('../../services/constants.js')
const { SQL_TABLE } = require('../../services/constants.js')
//
//  Debug logging
//
let g_log1 = false
//===================================================================================
async function QuizSelectGetData({
  qowner,
  qgroup1,
  qgroup2,
  qgroup3,
  MaxQuestions
}) {
  if (g_log1) console.log('Start QuizSelectGetData')
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      //
      //  sqlWhere
      //
      let sqlWhere = `qowner = '${qowner}' and qgroup1 = '${qgroup1}' `
      if (qgroup2) sqlWhere = sqlWhere.concat(` and qgroup2 = '${qgroup2}'`)
      if (qgroup3) sqlWhere = sqlWhere.concat(` and qgroup3 = '${qgroup3}'`)
      sqlWhere = sqlWhere.concat(` FETCH FIRST ${MaxQuestions} ROWS ONLY`)
      if (g_log1) console.log('sqlWhere ', sqlWhere)
      //
      //  Setup actions
      //
      const method = 'post'
      const body = {
        sqlClient: sqlClient,
        sqlTable: SQL_TABLE,
        sqlAction: 'SELECT',
        sqlWhere: sqlWhere
      }
      const URL = URL_BASE + URL_QUESTIONS
      if (g_log1) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (g_log1) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      //
      // Return data
      //
      if (g_log1) console.log('return data 1', resultData)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
    }
  }
  //--------------------------------------------------------------------
  //-  Initial fetch of data
  //--------------------------------------------------------------------
  //
  // Load the store
  //
  const resultData = fetchItems()
  //
  // Return promise
  //
  if (g_log1) console.log('return data 3', resultData)
  return resultData
}

export default QuizSelectGetData
