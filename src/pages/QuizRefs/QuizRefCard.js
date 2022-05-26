//
//  Libraries
//
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useSnapshot } from 'valtio'
//
//  Utilities
//
import { ValtioStore } from '../../pages/ValtioStore'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'

//
// Styles
//
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'moccasin'
  },
  cardHover: {
    '&:hover': {
      backgroundColor: 'yellow'
    }
  }
}))

//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//
//  Link found
//
const linkRefObj = {
  rref: '',
  rdesc: '',
  rlink: '',
  rwho: '',
  rtype: ''
}
//===================================================================================

export default function QuizRefCard(props) {
  const { linkref } = props

  if (g_log1) console.log('linkRef ', linkref)
  //
  // Styles
  //
  const classes = useStyles()
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Find reference link
  //
  const links = snapShot.v_Links
  const linkelement = links.find(link => link.rref === linkref)
  //
  //  Reference found
  //
  if (linkelement) {
    if (g_log1) console.log('linkelement ', linkelement)
    //
    //  Link values
    //
    linkRefObj.rref = linkelement.rref
    linkRefObj.rdesc = linkelement.rdesc
    linkRefObj.rlink = linkelement.rlink
    linkRefObj.rwho = linkelement.rwho
    linkRefObj.rtype = linkelement.rtype
  }
  //.............................................................................
  //
  //  Hyperlink open
  //
  const openHyperlink = hyperlink => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //.............................................................................
  return (
    <>
      <Box sx={{ m: 2 }}>
        <Card elevation={1} className={`${classes.cardHover} ${classes.root}`}>
          <CardActionArea>
            <CardContent
              onClick={() => openHyperlink(linkRefObj.rlink)}
              sx={{ padding: '4px' }}
            >
              <Typography variant='body2' color='textSecondary'>
                {linkRefObj.rdesc}... Written By... {linkRefObj.rwho}
                Type... {linkRefObj.rtype}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  )
}
