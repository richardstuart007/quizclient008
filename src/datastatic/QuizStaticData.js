//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'

//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
const QuizStaticData = () => {
  //
  //  Set Debug State
  //
  if (g_log1) console.log('Start QuizStaticData')
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
  //.  Load Static - Owner
  //...................................................................................
  const LoadStaticOwner = () => {
    if (g_log1) console.log('Load Static Owner ')
    //
    //  Options - Owner
    //
    const { OWNER } = require('./DataOwner.js')
    //
    //  Load Options and Store
    //
    LoadOptionsOwner(OWNER)
  }
  //...................................................................................
  //.  Load Static - Group1 for OWNER
  //...................................................................................
  const LoadStaticGroup1Owner = () => {
    if (g_log1) console.log('Load Static Group1 Owner')
    //
    //  Options
    //
    const { GROUP1OWNER } = require('./DataGroup1Owner.js')
    let Group1OptionsOwner = [
      {
        qowner: 'All',
        qgroup1: 'All',
        g1title: 'All'
      }
    ]
    GROUP1OWNER.forEach(item => {
      const itemObj = {
        qowner: item.qowner,
        qgroup1: item.qgroup1,
        g1title: item.g1title
      }
      Group1OptionsOwner.push(itemObj)
    })
    ValtioStore.v_Group1OptionsOwner = Group1OptionsOwner
    if (g_log1) console.log('v_Group1OptionsOwner ', Group1OptionsOwner)
  }
  //...................................................................................
  //.  Load Static - Group2
  //...................................................................................
  const LoadStaticGroup2 = () => {
    if (g_log1) console.log('Load Static Group2 ')
    //
    //  Options
    //
    const { GROUP2 } = require('./DataGroup2.js')
    let Group2Options = [
      {
        id: 'All',
        title: 'All'
      }
    ]
    GROUP2.forEach(item => {
      const itemObj = {
        id: item.g2id,
        title: item.g2title
      }
      Group2Options.push(itemObj)
    })
    ValtioStore.v_Group2Options = Group2Options
    if (g_log1) console.log('Group2Options ', Group2Options)
  }
  //...................................................................................
  //.  Load Static - Group3
  //...................................................................................
  const LoadStaticGroup3 = () => {
    if (g_log1) console.log('Load Static Group3 ')
    //
    //  Options
    //
    const { GROUP3 } = require('./DataGroup3.js')
    let Group3Options = [
      {
        id: 'All',
        title: 'All'
      }
    ]
    GROUP3.forEach(item => {
      const itemObj = {
        id: item.g3id,
        title: item.g3title
      }
      Group3Options.push(itemObj)
    })
    ValtioStore.v_Group3Options = Group3Options
    if (g_log1) console.log('Group3Options ', Group3Options)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Owner
  //
  LoadStaticOwner()
  //
  //  Groups
  //
  LoadStaticGroup1Owner()
  LoadStaticGroup2()
  LoadStaticGroup3()
  //
  //  Questions
  //
  const { QUESTIONS } = require('./DataQuestions.js')
  ValtioStore.v_Questions = QUESTIONS
  //
  //  Hands
  //
  const { HANDS } = require('./DataHands.js')
  ValtioStore.v_Hands = HANDS
  //
  //  Bidding
  //
  const { BIDDING } = require('./DataBidding.js')
  ValtioStore.v_Bidding = BIDDING
  //
  //  Links
  //
  const { REFLINKS } = require('./DataRefLinks.js')
  ValtioStore.v_RefLinks = REFLINKS
}
export default QuizStaticData
