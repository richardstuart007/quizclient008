//
//  Libraries
//
import { Button } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5)
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '& .MuiButton-label': {
      color: theme.palette.secondary.main
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main
    }
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.secondary.dark,
    '& .MuiButton-label': {
      color: theme.palette.warning.main
    }
  }
}))
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
export default function MyActionButton(props) {
  if (g_log1) console.log('Start MyActionButton')

  const { color, children, onClick, ...other } = props
  const classes = useStyles()
  return (
    <Button
      className={`${classes.root} ${classes[color]}`}
      sx={{
        ':hover': {
          bgcolor: 'yellow'
        }
      }}
      onClick={onClick}
      {...other}
    >
      {children}
    </Button>
  )
}
