//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Formik, Form } from 'formik'
import { Container, Grid } from '@mui/material'
import { Storage } from '@mui/icons-material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Common Sub Components
//
import { useQForm, QForm } from '../useQForm'
import QuizPageHeader from '../Common/QuizPageHeader'
//
//  Controls
//
import MyCheckbox from '../../components/controls/MyCheckbox'
import MyButton from '../../components/controls/MyButton'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizSettings = () => {
  if (g_log1) console.log('Start QuizSettings')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Initial Values
  //
  const initialFValues = {
    z_TestData: snapShot.v_TestData,
    z_HideParams: snapShot.v_HideParams,
    z_ShowInfo: snapShot.v_ShowInfo,
    z_ShowLinearProgress: snapShot.v_ShowLinearProgress,
    z_ShowLinearScore: snapShot.v_ShowLinearScore
  }
  //
  //  Saved Values on Submit
  //
  const savedValues = {
    z_TestData: false,
    z_HideParams: false,
    z_ShowInfo: false,
    z_ShowLinearProgress: false,
    z_ShowLinearScore: false
  }
  //.............................................................................
  //.  Input field validation
  //.............................................................................
  const validate = (fieldValues = values) => {
    if (g_log1) console.log('fieldValues ', fieldValues)
    let temp = { ...errors }
    if ('z_TestData' in fieldValues) temp.z_TestData = ''
    if ('z_HideParams' in fieldValues) temp.z_HideParams = ''
    if ('z_ShowInfo' in fieldValues) temp.z_ShowInfo = ''
    if ('z_ShowLinearProgress' in fieldValues) temp.z_ShowLinearProgress = ''
    if ('z_ShowLinearScore' in fieldValues) temp.z_ShowLinearScore = ''
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
    if (g_log1) console.log('validate ', validate())
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
    savedValues.z_TestData = values.z_TestData
    savedValues.z_HideParams = values.z_HideParams
    savedValues.z_ShowInfo = values.z_ShowInfo
    savedValues.z_ShowLinearProgress = values.z_ShowLinearProgress
    savedValues.z_ShowLinearScore = values.z_ShowLinearScore
    //
    //  Update Store
    //
    if (g_log1) console.log('Update Store: z_TestData ', savedValues.z_TestData)
    if (g_log1) console.log('Update Store: z_ShowInfo ', savedValues.z_ShowInfo)
    ValtioStore.v_Page = 'QuizTest'
    ValtioStore.v_TestData = savedValues.z_TestData
    ValtioStore.v_HideParams = savedValues.z_HideParams
    ValtioStore.v_ShowInfo = savedValues.z_ShowInfo
    ValtioStore.v_ShowLinearProgress = savedValues.z_ShowLinearProgress
    ValtioStore.v_ShowLinearScore = savedValues.z_ShowLinearScore
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
  if (g_log1) console.log('initialFValues ', initialFValues)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <Formik
          initialValues={initialFValues}
          onSubmit={onSubmitForm}
          enableReinitialize
        >
          <Form>
            <QuizPageHeader
              title='Quiz Settings'
              subTitle='Change the settings as required'
              icon={<Storage fontSize='large' />}
            />
            <QForm>
              {/*.................................................................................................*/}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <MyCheckbox
                    name='z_TestData'
                    label='Static Data'
                    value={values.z_TestData}
                    onChange={handleInputChange}
                    error={errors.z_TestData}
                  />
                </Grid>

                <Grid item xs={4}>
                  <MyCheckbox
                    name='z_HideParams'
                    label='Hide Params'
                    value={values.z_HideParams}
                    onChange={handleInputChange}
                    error={errors.z_HideParams}
                  />
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <MyCheckbox
                  name='z_ShowInfo'
                  label='Show Info'
                  value={values.z_ShowInfo}
                  onChange={handleInputChange}
                  error={errors.z_ShowInfo}
                />
              </Grid>

              <Grid item xs={4}>
                <MyCheckbox
                  name='z_ShowLinearProgress'
                  label='Show Linear Progress'
                  value={values.z_ShowLinearProgress}
                  onChange={handleInputChange}
                  error={errors.z_ShowLinearProgress}
                />
              </Grid>

              <Grid item xs={4}>
                <MyCheckbox
                  name='z_ShowLinearScore'
                  label='Show Linear Score'
                  value={values.z_ShowLinearScore}
                  onChange={handleInputChange}
                  error={errors.z_ShowLinearScore}
                />
              </Grid>

              {/*.................................................................................................*/}
              <Grid item xs={12}>
                <MyButton type='submit' text='Test SignIn' value='Submit' />
              </Grid>
            </QForm>
          </Form>
        </Formik>
      </Container>
    </Grid>
  )
}

export default QuizSettings
