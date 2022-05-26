//
//  Libraries
//
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import { TableBody, TableRow, TableCell, Grid } from '@mui/material'
import PreviewIcon from '@mui/icons-material/Preview'
//
//  Controls
//
import MyActionButton from '../../components/controls/MyActionButton2'
import MyButton from '../../components/controls/MyButton'
import useMyTable from '../../components/controls/useMyTable'
//
//  Common Components
//
import QuizInfo from '../Common/QuizInfo'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//
//  Table Heading
//
const headCells = [
  { id: 'rid', label: 'ID' },
  { id: 'rdesc', label: 'Description' },
  // { id: 'rlink', label: 'Link' },
  { id: 'rwho', label: 'Who' },
  { id: 'rtype', label: 'Type' },
  { id: 'actions', label: 'View', disableSorting: true }
]
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings(true)
//=====================================================================================
export default function QuizRefs() {
  if (g_log1) console.log('Start QuizRefs')

  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const Refs = snapShot.v_Refs
  if (g_log1) console.log('Refs ', Refs)
  const CurrentPage = snapShot.v_Page
  const PagePrevious = snapShot.v_PagePrevious
  //
  //  Find reference link
  //
  const links = snapShot.v_Links
  //
  //  build records from Refs & Links
  //
  let records = []
  Refs.forEach(ref => {
    const linkelement = links.find(link => link.rref === ref)
    if (linkelement) {
      const rowData = { ...linkelement }
      records.push(rowData)
    }
  })
  if (g_log1) console.log('records ', records)
  //.............................................................................
  //
  //  State
  //
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  //.............................................................................
  //
  //  Hyperlink open
  //
  const openHyperlink = hyperlink => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useMyTable(records, headCells, filterFn)
  if (g_log1)
    console.log('recordsAfterPagingAndSorting ', recordsAfterPagingAndSorting)
  if (g_log1) console.log('records ', records)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map(row => (
            <TableRow key={row.rid}>
              <TableCell>{row.rid}</TableCell>
              {/* <TableCell>{row.rref}</TableCell> */}
              <TableCell>{row.rdesc}</TableCell>
              {/* <TableCell>{row.rlink}</TableCell> */}
              <TableCell>{row.rwho}</TableCell>
              <TableCell>{row.rtype}</TableCell>
              <TableCell>
                <MyActionButton
                  startIcon={<PreviewIcon fontSize='small' />}
                  color='warning'
                  onClick={() => openHyperlink(row.rlink)}
                ></MyActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />

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
