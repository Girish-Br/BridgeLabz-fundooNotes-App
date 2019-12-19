/****************************************************************************************
 *  @Purpose        : To create a dashboard page with side navigation bar and Dropdown menu.
 *  @file           : dashboard.jsx      
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 3-12-2019
 *****************************************************************************************/
import React from 'react'
import { withRouter } from "react-router-dom";
import GetCards from './getNote.jsx'
import {Tooltip,CardActions} from '@material-ui/core'
import Appbar from './appBar.jsx'
import CreateNote from './createNote';
import  {GetNote,GetNoteForNotPinned,getArchivedNotes}  from '../../controller/userController'
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      pinnedNotes:[],
      dialogBox: false,
      displayList:false,
      archiveCards:false,
      archivedData:[]
    }
    // this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  componentDidMount() {
    GetNoteForNotPinned().then(res => {
      this.setState({ pinnedNotes: res })
      console.log(res)
    })
    GetNote().then(res => {
      this.setState({ notes: res })
      console.log(res)
    })
    getArchivedNotes().then(res=>{
      this.setState({archivedData:res})
      console.log(res)
    })
  }
  handleArchive=()=>{
    this.setState({archiveCards:!(this.state.archiveCards)})
}
  handleDialogBox() {
    this.setState({ dialogBox: true })
  }
   handleTitleClick(evt) {
   this.setState({ title: evt.target.value })
  }
   handleDescClick(evt) {
    this.setState({ description: evt.target.value })
  }
  displayListView=()=>{
    this.setState({displayList: !this.state.displayList})
  }
  render() {
    let listStyle=!this.state.displayList?({display:"flex",width:"100%"}) : ({display:"block",width:"60%"}) 
    let notesCardPinned=this.state.pinnedNotes.map(item=>{
      return(<GetCards data={item}/>)
    })
    let notesCard = this.state.notes.map(item => {
      return (
        <GetCards data={item} />
      )
    })
    let archivedCards = this.state.archivedData.map(item => {
      return (
        <GetCards data={item} />
      )
    })
        let cardsArchived=this.state.archiveCards ? archivedCards:
        <div className="content">
        <div>
        <CreateNote />
        </div>
        <div >
          <div className>
          <p  className="pinned">PINNED:</p>
          </div>
          <div style={{display:listStyle.display,width:listStyle.width}} className="pinnedCards">
          {notesCardPinned}
          </div>
        </div>
        <div >
        <div>
          <p className="others" >OTHER NOTES:</p>
          </div>
          <div style={{display:listStyle.display,width:listStyle.width}} className="otherCards">
        {notesCard}
        </div>
      </div>
      </div>
  
    return (
      <div className="dashboardMainDiv">
        <Appbar view={this.state.displayList} displayList={this.displayListView} handleArchive={this.handleArchive}/>
        {cardsArchived}
      </div>
    )
  }
}
export default withRouter(Dashboard);
