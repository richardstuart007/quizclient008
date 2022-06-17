//
//  Libraries
//
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import {
  Container,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Grid
} from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyQueryPromise from '../../components/controls/MyQueryPromise'
import MyButton from '../../components/controls/MyButton'
import useMyTable from '../../components/controls/useMyTable'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
import getTable from '../../services/getTable'
//
//  Constants
//
const functionName = 'QuizServerData'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'
const NODATA = 'No Data Found'
//
//  Table Heading
//
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'table', label: 'Table' },
  { id: 'status', label: 'Status' },
  { id: 'count', label: 'Count' }
]
//
//  Table Detail
//
let records = [
  { id: 1, table: 'Owner', status: 'Pending', count: 0 },
  { id: 2, table: 'Questions', status: 'Pending', count: 0 },
  { id: 3, table: 'Bidding', status: 'Pending', count: 0 },
  { id: 4, table: 'Hands', status: 'Pending', count: 0 },
  { id: 5, table: 'RefLinks', status: 'Pending', count: 0 },
  { id: 6, table: 'Group1', status: 'Pending', count: 0 },
  { id: 7, table: 'Group1Owner', status: 'Pending', count: 0 },
  { id: 8, table: 'Group2', status: 'Pending', count: 0 },
  { id: 9, table: 'Group3', status: 'Pending', count: 0 }
]
//
//  Global variables
//
let g_Page
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizServerData = () => {
  //
  //  Set Debug State
  //
  if (g_log1) console.log('Start QuizServerData')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page

  const filterFn = {
    fn: items => {
      return items
    }
  }
  //
  //  Status of fetches
  //
  const [fulfilled, setFulfilled] = useState(false)
  //...................................................................................
  //.  Load Options - Owner
  //...................................................................................
  const LoadOptionsOwner = data => {
    if (g_log1) console.log('Load Options Owner ')
    if (g_log1) console.log('Data Options Owner ', data)
    //
    //  Options
    //
    let OwnerOptions = [
      {
        id: 'All',
        title: 'All'
      }
    ]
    data.forEach(item => {
      const itemObj = {
        id: item.oid,
        title: item.otitle
      }
      OwnerOptions.push(itemObj)
    })
    //
    //  Store
    //
    ValtioStore.v_OwnerOptions = OwnerOptions
    if (g_log1) console.log('OwnerOptions ', OwnerOptions)
  }
  //...................................................................................
  //.  Load Server - Owner
  //...................................................................................
  const LoadServerOwner = () => {
    if (g_log1) console.log('LoadServerOwner')
    //
    //  Initial values
    //
    const idx = 0
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'owner',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'oid'
    }
    const myPromiseOwner = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseOwner.then(function (data) {
      if (g_log1) console.log('myPromiseOwner data ', data)
      //
      //  Update Status
      //
      if (myPromiseOwner.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseOwner.isRejected()) {
        if (g_log1) console.log('records[idx].status ', records[idx].status)
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (g_log1) console.log('countOwner count', count)
        //
        //  Load Options and Store
        //
        LoadOptionsOwner(data)
      }
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Questions
  //...................................................................................
  const LoadServerQuestions = () => {
    if (g_log1) console.log('LoadServerQuestions')
    //
    //  Initial values
    //
    const idx = 1
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'questions',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'qid'
    }
    const myPromiseQuestions = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseQuestions.then(function (data) {
      if (g_log1) console.log('myPromiseQuestions data ', data)
      //
      //  Update Status
      //
      if (myPromiseQuestions.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseQuestions.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (g_log1) console.log('countQuestions count', count)
        //
        // update ValtioStore - Data
        //
        if (g_log1) console.log('update v_Questions', data)
        ValtioStore.v_Questions = data
      }
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Bidding
  //...................................................................................
  const LoadServerBidding = () => {
    if (g_log1) console.log('LoadServerBidding')
    //
    //  Initial values
    //
    const idx = 2
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'bidding',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'bid'
    }
    const myPromiseBidding = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseBidding.then(function (data) {
      if (g_log1) console.log('myPromiseBidding data ', data)
      //
      //  Update Status
      //
      if (myPromiseBidding.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseBidding.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (g_log1) console.log('countBidding count', count)
        //
        // update ValtioStore - Data
        //
        if (g_log1) console.log('update v_Bidding', data)
        ValtioStore.v_Bidding = data
      }
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Hands
  //...................................................................................
  const LoadServerHands = () => {
    if (g_log1) console.log('LoadServerHands')
    //
    //  Initial values
    //
    const idx = 3
    let count = 0
    let status = 'Pending'

    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'hands',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'hid'
    }
    const myPromiseHands = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseHands.then(function (data) {
      if (g_log1) console.log('myPromiseHands data ', data)
      //
      //  Update Status
      //
      if (myPromiseHands.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseHands.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (g_log1) console.log('countHands count', count)
        //
        // update ValtioStore - Data
        //
        if (g_log1) console.log('update v_Hands', data)
        ValtioStore.v_Hands = data
      }
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Reflinks
  //...................................................................................
  const LoadServerReflinks = () => {
    if (g_log1) console.log('LoadServerReflinks')
    //
    //  Initial values
    //
    const idx = 4
    let count = 0
    let status = 'Pending'

    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'reflinks',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'rid'
    }
    const myPromiseReflinks = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseReflinks.then(function (data) {
      if (g_log1) console.log('myPromiseReflinks data ', data)

      //
      //  Update Status
      //
      if (myPromiseReflinks.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseReflinks.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (g_log1) console.log('countReflinks count', count)
        //
        // update ValtioStore - Data
        //
        if (g_log1) console.log('update v_RefLinks', data)
        ValtioStore.v_RefLinks = data
      }
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Group1
  //...................................................................................
  const LoadServerGroup1 = () => {
    if (g_log1) console.log('LoadServerGroup1')
    //
    //  Initial values
    //
    const idx = 5
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'group1',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g1id'
    }
    const myPromiseGroup1 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup1.then(function (data) {
      if (g_log1) console.log('myPromiseGroup1 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup1.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup1.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  Default value
      //
      let Group1Options = [
        {
          id: 'All',
          title: 'All'
        }
      ]
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        if (g_log1) console.log('countGroup1 count', count)

        data.forEach(item => {
          const itemObj = {
            id: item.g1id,
            title: item.g1title
          }
          Group1Options.push(itemObj)
        })
      }
      //
      //  Update Store
      //
      ValtioStore.v_Group1Options = Group1Options
      if (g_log1) console.log('Group1Options ', Group1Options)
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Group1Owner
  //...................................................................................
  const LoadServerGroup1Owner = () => {
    if (g_log1) console.log('LoadServerGroup1Owner')
    //
    //  Initial values
    //
    const idx = 6
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlAction: 'SELECTSQL',
      sqlString:
        'qowner, qgroup1, g1title from questions join group1 on qgroup1 = g1id group by qowner, qgroup1 ,g1title order by qowner, qgroup1'
    }
    const myPromiseGroup1Owner = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup1Owner.then(function (data) {
      if (g_log1) console.log('myPromiseGroup1Owner data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup1Owner.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup1Owner.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        if (g_log1) console.log('countGroup1Owner count', count)
        //
        // update ValtioStore - Data
        //
        if (g_log1) console.log('update Group1OptionsOwner', data)
        ValtioStore.v_Group1OptionsOwner = data
      }
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Group2
  //...................................................................................
  const LoadServerGroup2 = () => {
    if (g_log1) console.log('LoadServerGroup2')
    //
    //  Initial values
    //
    const idx = 7
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'group2',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g2id'
    }
    const myPromiseGroup2 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup2.then(function (data) {
      if (g_log1) console.log('myPromiseGroup2 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup2.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup2.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  Default value
      //
      let Group2Options = [
        {
          id: 'All',
          title: 'All'
        }
      ]
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        if (g_log1) console.log('countGroup2 count', count)

        data.forEach(item => {
          const itemObj = {
            id: item.g2id,
            title: item.g2title
          }
          Group2Options.push(itemObj)
        })
      }
      //
      //  Update Store
      //
      ValtioStore.v_Group2Options = Group2Options
      if (g_log1) console.log('Group2Options ', Group2Options)
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load Server - Group3
  //...................................................................................
  const LoadServerGroup3 = () => {
    if (g_log1) console.log('LoadServerGroup3')
    //
    //  Initial values
    //
    const idx = 8
    let count = 0
    let status = 'Pending'
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlTable: 'group3',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g3id'
    }
    const myPromiseGroup3 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup3.then(function (data) {
      if (g_log1) console.log('myPromiseGroup3 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup3.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
        if (g_log1) console.log('records[idx].status ', records[idx].status)
      }
      if (myPromiseGroup3.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  Default value
      //
      let Group3Options = [
        {
          id: 'All',
          title: 'All'
        }
      ]
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        if (g_log1) console.log('countGroup3 count', count)

        data.forEach(item => {
          const itemObj = {
            id: item.g3id,
            title: item.g3title
          }
          Group3Options.push(itemObj)
        })
      }
      //
      //  Update Store
      //

      ValtioStore.v_Group3Options = Group3Options
      if (g_log1) console.log('Group3Options ', Group3Options)
      //
      //  Update Status
      //
      updateFetchStatus()
    })
  }
  //...................................................................................
  //.  Load the dropdown options
  //...................................................................................
  const LoadOptions = () => {
    LoadServerQuestions()
    LoadServerBidding()
    LoadServerHands()
    LoadServerReflinks()
    LoadServerOwner()
    LoadServerGroup1()
    LoadServerGroup1Owner()
    LoadServerGroup2()
    LoadServerGroup3()
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const SubmitForm = e => {
    ValtioStore.v_PagePrevious = CurrentPage
    ValtioStore.v_Page = g_Page
  }
  //...................................................................................
  //.  Update Fetch Status
  //...................................................................................
  const updateFetchStatus = () => {
    //
    //  Status value
    //
    const notFulfilled = records.some(record => record.status !== FULFILLED)
    const newFulfilled = !notFulfilled
    //
    //  Change to Fulfilled if ALL fulfilled
    //
    if (newFulfilled) {
      setFulfilled(newFulfilled)
      if (g_log1) console.log('newFulfilled Final', newFulfilled)
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  useEffect(() => {
    LoadOptions()
    // eslint-disable-next-line
  }, [])
  //...................................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination } = useMyTable(
    records,
    headCells,
    filterFn
  )

  if (g_log1) console.log('Render the Form ')
  if (g_log1) console.log('records ', records)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {/*.................................................................................................*/}
          <TblContainer>
            <TblHead />
            <TableBody>
              {records.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.table}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            {fulfilled ? (
              <MyButton
                text='Quiz Selection'
                onClick={() => {
                  g_Page = 'QuizSelect'
                  SubmitForm()
                }}
              />
            ) : (
              <Typography>All data not received</Typography>
            )}
          </Grid>
          {/*.................................................................................................*/}
        </Grid>
      </Container>
    </>
  )
}

export default QuizServerData
