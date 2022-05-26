//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Typography, Card, Grid } from '@mui/material'
import { cyan } from 'material-ui-colors'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import QuizRefCard from './QuizRefCard'
//
//  Common Components
//
import QuizInfo from '../Common/QuizInfo'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizRefs = () => {
  if (g_log1) console.log('Start QuizRefs')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const Refs = snapShot.v_Refs
  const CurrentPage = snapShot.v_Page
  const PagePrevious = snapShot.v_PagePrevious
  if (g_log1) console.log('Refs ', Refs)
  //
  //  References ?
  //
  let references = false
  if (Refs[0]) references = true
  if (g_log1) console.log('references ', references)
  //
  //  No data to review
  //
  if (!references) {
    if (g_log1) console.log('No references')
    return (
      <>
        <Typography
          variant='subtitle1'
          sx={{ marginTop: '8px' }}
          style={{ color: 'red' }}
        >
          No References
        </Typography>
      </>
    )
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Card style={{ backgroundColor: cyan['A100'] }}>
        {Refs.map((linkref, key) => (
          <QuizRefCard key={key} linkref={linkref} />
        ))}
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MyButton
            text='Go Back'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = PagePrevious
            }}
          />
        </Grid>
      </Grid>

      <QuizInfo />
    </>
  )
}

export default QuizRefs
