//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
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
const QuizSplash = () => {
  if (g_log1) console.log('Start QuizSplash')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          This product is in Trial/Development.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          It has been developed by Richard Stuart and is FREE to use/distribute.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          As this is a development version it may be upgraded and cause it to
          fail. If this happens then contact me via email.
        </Typography>

        <Typography variant='h6' sx={{ marginTop: '8px' }}>
          Technical.....URL Parameters:
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          &AllowSelection=false Stops the selection values from changing
        </Typography>

        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          &Owner=NZBridge sets Owner default
        </Typography>

        <Typography variant='subtitsubtitle2le2' sx={{ marginTop: '8px' }}>
          &Group1=NZTransfers Sets Group1 default
        </Typography>

        <Typography variant='h6' sx={{ marginTop: '8px' }}>
          Email: richardstuart007@hotmail.com
        </Typography>

        {/*.................................................................................................*/}
        <Grid item xs={12}>
          <MyButton
            type='submit'
            text='Accept'
            value='Submit'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizRestart'
            }}
          />
        </Grid>
      </Container>
    </Grid>
  )
}

export default QuizSplash
