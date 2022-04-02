//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@mui/material'
import { Accessibility } from '@mui/icons-material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyFormikTextField from '../../components/controls/MyFormikTextField'
//
//  Common Sub Components
//
import QuizPageHeader from '../Common/QuizPageHeader'
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_BASE } = require('../../services/constants.js')
const { URL_SIGNIN } = require('../../services/constants.js')
const sqlClient = 'Quiz/Signin'
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
const initialValues = {
  email: 'quizuser@gmail.com',
  password: 'quizuser'
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function QuizSignin() {
  if (g_log1) console.log('Start QuizSignin')
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Deconstruct values
    //
    const { email, password } = values
    //
    //  Post to server
    //
    const URL = URL_BASE + URL_SIGNIN
    fetch(URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.id) {
          setForm_message(`Signin successful with ID(${user.id})`)
          ValtioStore.v_Page = 'QuizSelect'
          ValtioStore.v_Email = email
          ValtioStore.v_Name = user.name
        } else {
          setForm_message('User not registered or password invalid')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Grid container>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            enableReinitialize
          >
            <Form>
              <QuizPageHeader
                title='Sign In'
                subTitle='Register first'
                icon={<Accessibility fontSize='large' />}
              />

              {/*.................................................................................................*/}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MyFormikTextField name='email' label='email' />
                </Grid>
                <Grid item xs={12}>
                  <MyFormikTextField name='password' label='password' />
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Typography style={{ color: 'red' }}>
                    {form_message}
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <MyButton type='submit' text='SignIn' value='Submit' />
                  <Typography variant='subtitle2' gutterBottom>
                    Navigation
                  </Typography>

                  <MyButton
                    text='Register'
                    color='secondary'
                    variant='outlined'
                    onClick={() => {
                      ValtioStore.v_Page = 'QuizRegister'
                    }}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizSignin
