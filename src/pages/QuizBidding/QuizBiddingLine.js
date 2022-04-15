//
//  Libraries
//
import { Box, Avatar, Typography, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings(true)
//===================================================================================
const QuizBiddingLine = props => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('props ', props)
  //
  //  Destructure props
  //
  const { round, roundidx } = props
  if (g_log1) console.log('round ', round)
  if (g_log1) console.log('roundidx ', roundidx)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <span>
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Grid container alignItems='center' justify='center'>
            {/* .......................................................................................... */}
            {round.map((element, idx) => (
              <div key={roundidx * 4 + 100 + idx}>
                <Grid item sx={{ paddingLeft: '8px' }}>
                  <Typography variant='h6'>{element.bid}</Typography>
                </Grid>
                {element.suit !== null && (
                  <Grid item>
                    <Avatar
                      src={element.src}
                      sx={{ height: '1.25rem', width: '1.25rem' }}
                    />
                  </Grid>
                )}
              </div>
            ))}

            {/* .......................................................................................... */}
          </Grid>
        </Box>
      </span>
    </div>
  )
}

export default QuizBiddingLine
