//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizSelectGetData from './QuizSelectGetData'
import * as QuizServices from './QuizServices'
//
//  Common Sub Components
//
import { useQForm, QForm } from '../useQForm'
import QuizInfo from '../Common/QuizInfo'
//
//  Controls
//
import MyQueryPromise from '../../components/controls/MyQueryPromise'
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
import randomSort from '../../services/randomSort'
//
//  Constants
//
const { ROWS_DEFAULT } = require('../../services/constants.js')
const { ROWS_MAX } = require('../../services/constants.js')
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()

//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialFValues = {
  qowner: 'public',
  qgroup1: '',
  qgroup2: '',
  qgroup3: '',
  MaxQuestions: ROWS_DEFAULT
}
//
//  Saved Values on Submit
//
const savedValues = {
  qowner: '',
  qgroup1: '',
  qgroup2: '',
  qgroup3: '',
  MaxQuestions: 0
}
//===================================================================================
const QuizSelect = () => {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //
  //  Set Debug State
  //
  if (g_log1) console.log('Start QuizSelect')
  //
  //  Set initial state
  //
  initialFValues.qowner = snapShot.v_Owner
  initialFValues.qgroup1 = snapShot.v_Group1
  initialFValues.qgroup2 = snapShot.v_Group2
  initialFValues.qgroup3 = snapShot.v_Group3
  const disabled = !snapShot.v_AllowSelection
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (g_log1) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('qowner' in fieldValues)
      temp.qowner =
        fieldValues.qowner.length !== 0 ? '' : 'This field is required.'
    if ('MaxQuestions' in fieldValues)
      temp.MaxQuestions =
        parseInt(fieldValues.MaxQuestions) > 0 &&
        parseInt(fieldValues.MaxQuestions) <= ROWS_MAX
          ? ''
          : `You must select between 1 and ${ROWS_MAX}.`
    setErrors({
      ...temp
    })

    if (fieldValues === values) return Object.values(temp).every(x => x === '')
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  //
  //  Validate
  //
  const onSubmitForm = e => {
    if (validate()) {
      updateSelection()
    }
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  const updateSelection = () => {
    //
    //  Save data
    //
    if (g_log1) console.log(values)
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    savedValues.qgroup3 = values.qgroup3
    savedValues.MaxQuestions = values.MaxQuestions
    //
    // Clear the store
    //
    if (g_log1) console.log('clear v_Data')
    ValtioStore.v_Data = []
    if (g_log1) console.log('clear v_Quest')
    ValtioStore.v_Quest = []
    //
    //  Test mode then filter v_Data to v_Quest, else populate v_Data/v_Quest from server
    //
    if (g_log1) console.log(snapShot.v_TestData)
    snapShot.v_TestData ? testData() : getServerData()
  }
  //...................................................................................
  //.  Get Data from server
  //...................................................................................
  const getServerData = () => {
    //
    //  Process promise
    //
    if (g_log1) console.log('getServerData')
    var myPromise = MyQueryPromise(QuizSelectGetData(savedValues))
    //
    //  Initial status
    //
    if (g_log1) console.log('Initial pending:', myPromise.isPending()) //true
    if (g_log1) console.log('Initial fulfilled:', myPromise.isFulfilled()) //false
    if (g_log1) console.log('Initial rejected:', myPromise.isRejected()) //false
    //
    //  Resolve Status
    //
    myPromise.then(function (data) {
      if (g_log1) console.log('data ', data)
      if (g_log1) console.log('myPromise ', myPromise)
      if (g_log1) console.log('Final fulfilled:', myPromise.isFulfilled()) //true
      if (g_log1) console.log('Final rejected:', myPromise.isRejected()) //false
      if (g_log1) console.log('Final pending:', myPromise.isPending()) //false
      //
      //  No data
      //
      if (!data) {
        setForm_message('No data found')
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // update ValtioStore - Data
        //
        if (g_log1) console.log('update v_Data', data)
        ValtioStore.v_Data = data
        //
        // Sort Data
        //
        let sortedData = []
        const QuestionSort = snapShot.v_QuestionSort
        QuestionSort ? (sortedData = randomSort(data)) : (sortedData = data)
        //
        // update ValtioStore - Questions
        //
        if (g_log1) console.log('update v_Quest', sortedData)
        ValtioStore.v_Quest = sortedData
        //
        //  Update other store values
        //
        updateStore()
      }
    })
  }
  //...................................................................................
  //.  Update Store
  //...................................................................................
  const updateStore = () => {
    if (g_log1) console.log('snapShot.v_Quest', snapShot.v_Quest)
    ValtioStore.v_PagePrevious = CurrentPage
    ValtioStore.v_Page = 'Quiz'
    ValtioStore.v_Reset = true
    ValtioStore.v_Owner = savedValues.qowner
    ValtioStore.v_Group1 = savedValues.qgroup1
    ValtioStore.v_Group2 = savedValues.qgroup2
    ValtioStore.v_Group3 = savedValues.qgroup3
    ValtioStore.v_MaxQuestions = savedValues.MaxQuestions
  }
  //...................................................................................
  //.  Filter v_Data into v_Quest
  //...................................................................................
  const testData = () => {
    if (g_log1) console.log('testData')
    //
    //  Get unfiltered data
    //
    const { QUESTIONS } = require('./DataQuestions.js')
    const data = QUESTIONS
    if (g_log1) console.log('Data ', data)
    //
    //  Filter
    //
    const filteredData = data.filter(question => {
      if (savedValues.qowner && question.qowner !== savedValues.qowner)
        return false
      if (savedValues.qgroup1 && question.qgroup1 !== savedValues.qgroup1)
        return false
      if (savedValues.qgroup2 && question.qgroup2 !== savedValues.qgroup2)
        return false
      if (savedValues.qgroup3 && question.qgroup3 !== savedValues.qgroup3)
        return false
      return question
    })
    //
    //  No data
    //
    if (g_log1) console.log('filteredData ', filteredData)
    if (filteredData.length === 0) {
      setForm_message('QuizSelect: No data found')
      return
    }
    //
    //  Save filtered data
    //
    ValtioStore.v_Data = filteredData
    //
    // Sort Data
    //
    let sortedData = []
    const QuestionSort = snapShot.v_QuestionSort
    QuestionSort
      ? (sortedData = randomSort(filteredData))
      : (sortedData = filteredData)
    if (g_log1) console.log('sortedData ', sortedData)
    //
    //  Apply max number
    //
    let quest = []
    let i = 0
    do {
      if (i < sortedData.length) quest.push(sortedData[i])
      i++
    } while (i < savedValues.MaxQuestions)
    //
    // update ValtioStore - Questions
    //
    if (g_log1) console.log('update v_Quest', quest)
    ValtioStore.v_Quest = quest
    //
    //  Hands and Bidding
    //
    const { HANDS } = require('./DataHands.js')
    ValtioStore.v_Hands = HANDS
    const { BIDDING } = require('./DataBidding.js')
    ValtioStore.v_Bidding = BIDDING
    //
    //  Update other store values
    //
    updateStore()
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Interface to Form
  //
  const { values, errors, setErrors, handleInputChange } = useQForm(
    initialFValues,
    true,
    validate
  )
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Grid container>
        <Container>
          <Formik
            initialValues={initialFValues}
            onSubmit={onSubmitForm}
            enableReinitialize
          >
            <Form>
              <QForm>
                <Grid container spacing={2}>
                  {/*.................................................................................................*/}
                  <Grid item xs={12}>
                    <MySelect
                      name='qowner'
                      label='Owner'
                      value={values.qowner}
                      onChange={handleInputChange}
                      options={QuizServices.getOwnerCollection()}
                      error={errors.qowner}
                      disabled={disabled}
                    />
                  </Grid>

                  {/*.................................................................................................*/}

                  <Grid item xs={12}>
                    <MySelect
                      name='qgroup1'
                      label='Group1'
                      value={values.qgroup1}
                      onChange={handleInputChange}
                      options={QuizServices.getGroup1Collection()}
                      error={errors.qgroup1}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MySelect
                      name='qgroup2'
                      label='Group2'
                      value={values.qgroup2}
                      onChange={handleInputChange}
                      options={QuizServices.getGroup2Collection()}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MySelect
                      name='qgroup3'
                      label='Group3'
                      value={values.qgroup3}
                      onChange={handleInputChange}
                      options={QuizServices.getGroup3Collection()}
                      disabled={disabled}
                    />
                  </Grid>

                  {/*.................................................................................................*/}

                  <Grid item xs={12}>
                    <MyInput
                      name='MaxQuestions'
                      label='MaxQuestions'
                      value={values.MaxQuestions}
                      onChange={handleInputChange}
                      error={errors.MaxQuestions}
                    />
                  </Grid>
                  {/*.................................................................................................*/}
                  <Grid item xs={12}>
                    <Typography style={{ color: 'red' }}>
                      {form_message}
                    </Typography>
                  </Grid>

                  {/*.................................................................................................*/}
                  <Grid item xs={12}>
                    <MyButton type='submit' text='Start Quiz' value='Submit' />
                  </Grid>
                  {/*.................................................................................................*/}
                </Grid>
              </QForm>
            </Form>
          </Formik>
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizSelect
