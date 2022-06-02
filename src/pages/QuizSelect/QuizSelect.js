//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Common Sub Components
//

import QuizInfo from '../Common/QuizInfo'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
import { useQForm, QForm } from '../../components/controls/useQForm'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
import randomSort from '../../services/randomSort'
//
//  Constants
//
const { ROWS_MAX } = require('../../services/constants.js')
//
let g_staticData = null
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
  MaxQuestions: 0
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
//
//  References to display
//
let g_Page
//===================================================================================
const QuizSelect = () => {
  //
  //  Set Debug State
  //
  if (g_log1) console.log('Start QuizSelect')
  //.............................................................................
  //.  Valtio snapShot unpack
  //.............................................................................
  const vUnpack = valtioField => {
    const valtioValue = JSON.parse(JSON.stringify(valtioField))
    return valtioValue
  }
  //.............................................................................
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = vUnpack(snapShot.v_Page)
  //
  //  Get Data from the Store
  //
  const Questions = vUnpack(snapShot.v_Questions)
  const OwnerOptions = vUnpack(snapShot.v_OwnerOptions)
  const Group1Options = vUnpack(snapShot.v_Group1Options)
  const Group2Options = vUnpack(snapShot.v_Group2Options)
  const Group3Options = vUnpack(snapShot.v_Group3Options)
  if (g_log1) console.log('Questions ', Questions)
  if (g_log1) console.log('OwnerOptions ', OwnerOptions)
  if (g_log1) console.log('Group1Options ', Group1Options)
  if (g_log1) console.log('Group2Options ', Group2Options)
  if (g_log1) console.log('Group3Options ', Group3Options)

  //
  //  Set Selection from any previous values
  //
  initialFValues.qowner = vUnpack(snapShot.v_Owner)
  initialFValues.qgroup1 = vUnpack(snapShot.v_Group1)
  initialFValues.qgroup2 = vUnpack(snapShot.v_Group2)
  initialFValues.qgroup3 = vUnpack(snapShot.v_Group3)
  initialFValues.MaxQuestions = vUnpack(snapShot.v_MaxQuestions)
  const disabled = !vUnpack(snapShot.v_AllowSelection)
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
  const SubmitForm = e => {
    if (validate()) {
      updateSelection()
    }
  }
  //...................................................................................
  //.  Update Selection
  //...................................................................................
  const updateSelection = () => {
    //
    //  Save selection
    //
    if (g_log1) console.log(values)
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    savedValues.qgroup3 = values.qgroup3
    savedValues.MaxQuestions = values.MaxQuestions

    //
    //  Filter and sort the Questions
    //
    QuestionsFilterSort()
    //
    //  Update store
    //
    ValtioStore.v_PagePrevious = CurrentPage
    ValtioStore.v_Page = g_Page
    ValtioStore.v_Reset = true
    ValtioStore.v_Owner = savedValues.qowner
    ValtioStore.v_Group1 = savedValues.qgroup1
    ValtioStore.v_Group2 = savedValues.qgroup2
    ValtioStore.v_Group3 = savedValues.qgroup3
    ValtioStore.v_MaxQuestions = savedValues.MaxQuestions
  }
  //...................................................................................
  //.  Filter v_Questions into v_QFilterSort
  //...................................................................................
  const QuestionsFilterSort = () => {
    if (g_log1) console.log('QuestionsFilterSort')
    //
    // Clear the store
    //
    if (g_log1) console.log('clear v_QFilter')
    ValtioStore.v_QFilter = []
    if (g_log1) console.log('clear v_QFilterSort')
    ValtioStore.v_QFilterSort = []
    if (g_log1) console.log('clear v_QRefs')
    ValtioStore.v_QRefs = []
    // ----------------------------------------------------------------------------------
    //
    //  Filter
    //
    if (g_log1) console.log('savedValues ', savedValues)
    const filteredData = Questions.filter(question => {
      if (
        savedValues.qowner &&
        savedValues.qowner !== 'All' &&
        question.qowner !== savedValues.qowner
      ) {
        if (g_log1) console.log('question.qowner ', question.qowner)
        return false
      }
      if (
        savedValues.qgroup1 &&
        savedValues.qgroup1 !== 'All' &&
        question.qgroup1 !== savedValues.qgroup1
      ) {
        if (g_log1) console.log('question.qgroup1 ', question.qgroup1)
        return false
      }
      if (
        savedValues.qgroup2 &&
        savedValues.qgroup2 !== 'All' &&
        question.qgroup2 !== savedValues.qgroup2
      ) {
        if (g_log1) console.log('question.qgroup2 ', question.qgroup2)
        return false
      }
      if (
        savedValues.qgroup3 &&
        savedValues.qgroup3 !== 'All' &&
        question.qgroup3 !== savedValues.qgroup3
      ) {
        if (g_log1) console.log('question.qgroup3 ', question.qgroup3)
        return false
      }
      //
      //  Selected
      //
      return question
    })
    //
    //  No Questions
    //
    if (g_log1) console.log('filteredData ', filteredData)
    if (filteredData.length === 0) {
      setForm_message('QuizSelect: No Questions found')
      return
    }
    //
    //  Save filtered Questions
    //
    ValtioStore.v_QFilter = filteredData
    // ----------------------------------------------------------------------------------
    //
    // Sort Data
    //
    let sortedData = []
    const QuestionSort = vUnpack(snapShot.v_QFilterSortionSort)
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
    if (g_log1) console.log('update v_QFilterSort', quest)
    ValtioStore.v_QFilterSort = quest
    // ----------------------------------------------------------------------------------
    //
    //  Load references
    //
    let refs = []
    quest.forEach(question => {
      const { qrefs } = question
      if (g_log1) console.log('qrefs ', qrefs)
      if (qrefs) {
        qrefs.forEach(ref => {
          const found = refs.find(element => element === ref)
          if (!found) refs.push(ref)
        })
      }
    })
    //
    //  Sort the Refs
    //
    if (g_log1) console.log('refs ', refs)
    refs.sort((a, b) => (a > b ? 1 : -1))
    if (g_log1) console.log('refs ', refs)
    //
    // update ValtioStore - Refs
    //
    if (g_log1) console.log('update v_QRefs', refs)
    ValtioStore.v_QRefs = refs
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Load the data array from the store - if static/server status changes (or first time)
  //
  if (g_staticData !== snapShot.v_StaticData) {
    g_staticData = vUnpack(snapShot.v_StaticData)
  }
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
          <QForm>
            <Grid container spacing={2}>
              {/*.................................................................................................*/}
              <Grid item xs={12}>
                <MySelect
                  name='qowner'
                  label='Owner'
                  value={values.qowner}
                  onChange={handleInputChange}
                  options={OwnerOptions}
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
                  options={Group1Options}
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
                  options={Group2Options}
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={12}>
                <MySelect
                  name='qgroup3'
                  label='Group3'
                  value={values.qgroup3}
                  onChange={handleInputChange}
                  options={Group3Options}
                  disabled={disabled}
                />
              </Grid>

              {/*.................................................................................................*/}

              <Grid item xs={6}>
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
                <Typography style={{ color: 'red' }}>{form_message}</Typography>
              </Grid>

              {/*.................................................................................................*/}
              <Grid item xs={6}>
                <MyButton
                  text='Start Quiz'
                  onClick={() => {
                    g_Page = 'Quiz'
                    SubmitForm()
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <MyButton
                  text='References'
                  onClick={() => {
                    g_Page = 'QuizRefs'
                    SubmitForm()
                  }}
                />
              </Grid>
              {/*.................................................................................................*/}
            </Grid>
          </QForm>
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizSelect
