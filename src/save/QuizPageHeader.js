import { Paper, Card, Typography } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fdfdff'
  },
  pageHeader: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(1),
    color: '#3c44b1'
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  }
}))

export default function QuizPageHeader(props) {
  const classes = useStyles()
  const { title, subTitle, icon } = props
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        {/* .......................................................................................... */}
        {/* Icon if exists                                                                             */}
        {/* .......................................................................................... */}
        {{ icon } ? <Card className={classes.pageIcon}>{icon}</Card> : null}

        <div className={classes.pageTitle}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          {/* .......................................................................................... */}
          {/* Subtitle if exists                                                                         */}
          {/* .......................................................................................... */}
          {{ subTitle } ? (
            <Typography variant='subtitle2' component='div'>
              {subTitle}
            </Typography>
          ) : null}
          {/* .......................................................................................... */}
        </div>
      </div>
    </Paper>
  )
}
