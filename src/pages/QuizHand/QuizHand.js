//
//  Libraries
//
import { Avatar, Typography, Grid, Card } from '@mui/material'
import { grey, teal } from 'material-ui-colors'
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
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
const QuizHand = ({ qid }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1) console.log('qid ', qid)
  let testingQid = qid
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Get store of hands
  //
  let hands = []
  snapShot.v_Hands.forEach(row => {
    const rowData = { ...row }
    if (g_log1) console.log('rowData ', rowData)
    hands.push(rowData)
  })
  if (g_log1) console.log('hands ', hands)
  //
  //  Find the hand
  //
  let hand = hands.find(element => element.hid === testingQid)
  if (g_log1) console.log('hand ', hand)
  //
  //  Has Hand ?
  //
  let hasHand
  hand === undefined ? (hasHand = false) : (hasHand = true)
  if (g_log1) console.log('hasHand ', hasHand)
  //
  //  No hand, return
  //
  if (hasHand === false) return null
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Card
        sx={{ maxWidth: 300, marginTop: '8px', marginBottom: '8px' }}
        style={{ backgroundColor: grey[100] }}
      >
        <Grid item>
          <Typography variant='subtitle2' style={{ color: teal['A700'] }}>
            Your Hand
          </Typography>
        </Grid>
        <Grid container alignItems='center' justify='center'>
          {/* .......................................................................................... */}
          <Grid item sx={{ paddingLeft: '4px' }}>
            <Avatar src={spade} sx={{ height: '1rem', width: '1rem' }} />
          </Grid>
          <Grid item sx={{ paddingRight: '16px' }}>
            <Typography variant='h6'>{hand.hspades}</Typography>
          </Grid>
          {/* .......................................................................................... */}
          <Grid item>
            <Avatar src={heart} sx={{ height: '1rem', width: '1rem' }} />
          </Grid>
          <Grid item sx={{ paddingRight: '16px' }}>
            <Typography variant='h6'>{hand.hhearts}</Typography>
          </Grid>
          {/* .......................................................................................... */}
          <Grid item>
            <Avatar src={diamond} sx={{ height: '1rem', width: '1rem' }} />
          </Grid>
          <Grid item sx={{ paddingRight: '16px' }}>
            <Typography variant='h6'>{hand.hdiamonds}</Typography>
          </Grid>

          {/* .......................................................................................... */}
          <Grid item>
            <Avatar src={club} sx={{ height: '1rem', width: '1rem' }} />
          </Grid>
          <Grid item>
            <Typography variant='h6'>{hand.hclubs}</Typography>
          </Grid>

          {/* .......................................................................................... */}
        </Grid>
      </Card>
    </>
  )
}

export default QuizHand
