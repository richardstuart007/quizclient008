//
//  Libraries
//
import { Grid } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Icons
//
import RefreshIcon from '@mui/icons-material/Refresh'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import HelpIcon from '@mui/icons-material/Help'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import MyActionButton from '../../components/controls/MyActionButton'
//
//  Utilities
//
import { ValtioStore } from '../../pages/ValtioStore'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    }
  }
})
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
export default function QuizNavigation() {
  const classes = useStyles()
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //
  //  Show Refresh Button ?
  //
  let showButtonRefresh = true
  if (CurrentPage === 'QuizSelect') showButtonRefresh = false
  //
  //  Show Review Button ?
  //
  if (g_log1) console.log('snapShot.v_Ans ', snapShot.v_Ans)
  let showButtonReview
  snapShot.v_Ans.length > 0
    ? (showButtonReview = true)
    : (showButtonReview = false)
  if (CurrentPage === 'QuizReview') showButtonReview = false
  //
  //  Show Help Button ?
  //
  const helpHyperlink = snapShot.v_Help
  if (g_log1) console.log('helpHyperlink ', helpHyperlink)
  let showButtonHelp
  helpHyperlink && helpHyperlink.length > 0
    ? (showButtonHelp = true)
    : (showButtonHelp = false)
  //
  //  Show Settings Button ?
  //
  let showButtonSettings = true
  if (CurrentPage === 'QuizSettings') showButtonSettings = false
  if (CurrentPage === 'Quiz') showButtonSettings = false
  if (CurrentPage === 'QuizReview') showButtonSettings = false
  //...................................................................................
  //
  //  Hyperlink open
  //
  const openHyperlink = hyperlink => () => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}
        {showButtonHelp ? (
          <MyActionButton
            startIcon={<HelpIcon fontSize='small' />}
            color='warning'
            onClick={openHyperlink(helpHyperlink)}
            text='Help'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}

        {showButtonReview ? (
          <MyActionButton
            startIcon={<ScoreboardIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizReview'
            }}
            text='Review'
          ></MyActionButton>
        ) : null}

        {/* .......................................................................................... */}
        {showButtonRefresh ? (
          <MyActionButton
            startIcon={<RefreshIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizSelect'
              ValtioStore.v_Help = ''
              ValtioStore.v_Ans = []
            }}
            text='Refresh'
          ></MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {showButtonSettings ? (
          <MyActionButton
            startIcon={<SettingsApplicationsIcon fontSize='small' />}
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizSettings'
              ValtioStore.v_Help = ''
            }}
            text='Settings'
          ></MyActionButton>
        ) : null}
      </Grid>
    </div>
  )
}
