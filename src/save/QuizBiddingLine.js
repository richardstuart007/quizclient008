//
//  Libraries
//
import { Avatar, Typography, Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Sub Components
//
import spade from '../../assets/spade.svg'
import heart from '../../assets/heart.svg'
import diamond from '../../assets/diamond.svg'
import club from '../../assets/club.svg'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
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
    <>
      <Grid container alignItems='center' justify='center'>
        {/* .......................................................................................... */}
        {round.map((element, idx) => (
          <div key={roundidx * 4 + 100 + idx} className='displayInline'>
            <Grid container alignItems='center' justify='center'>
              <Grid item sx={{ paddingLeft: '8px' }}>
                <Typography variant='h6'>{element.bid}</Typography>
              </Grid>
              {element.suit === 'C' && (
                <Grid item>
                  <Avatar
                    src={club}
                    sx={{ height: '1.25rem', width: '1.25rem' }}
                  />
                </Grid>
              )}
              {element.suit === 'D' && (
                <Grid item>
                  <Avatar
                    src={diamond}
                    sx={{ height: '1.25rem', width: '1.25rem' }}
                  />
                </Grid>
              )}
              {element.suit === 'H' && (
                <Grid item>
                  <Avatar
                    src={heart}
                    sx={{ height: '1.25rem', width: '1.25rem' }}
                  />
                </Grid>
              )}
              {element.suit === 'S' && (
                <Grid item>
                  <Avatar
                    src={spade}
                    sx={{ height: '1.25rem', width: '1.25rem' }}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        ))}

        {/* .......................................................................................... */}
      </Grid>
    </>
  )
}

export default QuizBiddingLine
