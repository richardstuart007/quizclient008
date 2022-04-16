//
//  Libraries
//
import { Typography, AppBar, Toolbar, Avatar, Grid } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import ScoreboardIcon from '@mui/icons-material/Scoreboard'
import HelpIcon from '@mui/icons-material/Help'
import makeStyles from '@mui/styles/makeStyles'
import { format } from 'date-fns'
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
import MyActionButton from '../controls/MyActionButton'
import cards from '../../assets/cards.svg'
//
//  Utilities
//
import { ValtioStore } from '../../pages/ValtioStore'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },
    root: {
      display: 'flex'
    },
    title: {
      marginLeft: theme.spacing(2)
    },
    appBar: {
      width: '100%'
    },
    date: {
      marginLeft: theme.spacing(10)
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
export default function Layout({ children }) {
  const classes = useStyles()
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Show Refresh Button ?
  //
  let showButtonRefresh = true
  if (snapShot.v_Page === 'QuizSelect') showButtonRefresh = false
  //
  //  Show Review Button ?
  //
  if (g_log1) console.log('snapShot.v_Ans ', snapShot.v_Ans)
  let showButtonReview
  snapShot.v_Ans.length > 0
    ? (showButtonReview = true)
    : (showButtonReview = false)
  if (snapShot.v_Page === 'QuizReview') showButtonReview = false
  //
  //  Show Help Button ?
  //
  const helpHyperlink = snapShot.v_Help
  if (g_log1) console.log('helpHyperlink ', helpHyperlink)
  let showButtonHelp
  helpHyperlink && helpHyperlink.length > 0
    ? (showButtonHelp = true)
    : (showButtonHelp = false)
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
      {/* app bar */}

      <AppBar
        position='fixed'
        className={classes.appBar}
        elevation={0}
        color='primary'
      >
        <Toolbar>
          <Grid container alignItems='center'>
            {/* .......................................................................................... */}
            <Grid item>
              <Avatar className={classes.avatar} src={cards} />
            </Grid>
            {/* .......................................................................................... */}
            <Grid item>
              <Typography className={classes.title}> BRIDGE QUIZ</Typography>
            </Grid>
            {/* .......................................................................................... */}
            <Grid item xs></Grid>
            {/* .......................................................................................... */}
            {showButtonHelp ? (
              <MyActionButton
                color='warning'
                onClick={openHyperlink(helpHyperlink)}
              >
                <HelpIcon fontSize='large' />
              </MyActionButton>
            ) : null}
            {/* .......................................................................................... */}
            {showButtonReview ? (
              <MyActionButton
                color='warning'
                onClick={() => {
                  ValtioStore.v_Page = 'QuizReview'
                }}
              >
                <ScoreboardIcon fontSize='large' />
              </MyActionButton>
            ) : null}

            {/* .......................................................................................... */}
            {showButtonRefresh ? (
              <MyActionButton
                color='warning'
                onClick={() => {
                  ValtioStore.v_Page = 'QuizSelect'
                  ValtioStore.v_Help = ''
                  ValtioStore.v_Ans = []
                }}
              >
                <RefreshIcon fontSize='large' />
              </MyActionButton>
            ) : null}
            {/* .......................................................................................... */}
            <Grid item>
              <Typography className={classes.date}>
                Today is the {format(new Date(), 'do MMMM Y')}
              </Typography>
            </Grid>
            {/* .......................................................................................... */}
          </Grid>
        </Toolbar>
      </AppBar>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}
