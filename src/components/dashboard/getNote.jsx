/****************************************************************************************
 *  @Purpose        : To create Notes in fundoo notes app
 *  @file           : getNote.jsx
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 11-12-2019
 *****************************************************************************************/
import React from "react";
import DailogBox from "./dialogBox.jsx";
import Menu from "@material-ui/core/Menu";
import EventIcon from "@material-ui/icons/Event";
import Chip from "@material-ui/core/Chip";
import {
  Card,
  IconButton,
  Snackbar,
  Typography,
  Tooltip
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import {
  archiveData,
  notePinned,
  ReminderUpdate,
  colorUpdate,
  noteToTrash,
  deleteNote,
  restoreUpdate
} from "../../controller/userController.js";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import ImageIcon from "@material-ui/icons/Image";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ArchiveIcon from "@material-ui/icons/Archive";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SvgPin from "../../icons/pin.js";
import SvgPinned from "../../icons/pinned.js";
class GetCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteOpen: false,
      anchorEl: null,
      deleteIcon: null,
      id: this.props.data.id,
      color: this.props.data.data().color,
      anchorEl1: null,
      pin: this.props.data.data().pinned,
      snackbarMsg: "",
      snackbarOpen: false,
      iconDisplay: false,
      trash: false,
      reminder: this.props.data.data().reminder
    };
    this.NoteOpenForEdit = this.NoteOpenForEdit.bind(this);
  }
  closeColorMenu = e => {
    this.setState({ anchorEl1: e.currentTarget });
  };
  colorChange = async(e) => {
   await this.setState({
      color: e.currentTarget.style.backgroundColor,
      anchorEl1: null
    });
    let data = {
      color: this.state.color,
      id: this.props.data.id
    };
    colorUpdate(data).then(res => {
      console.log(res);
    });
    this.props.displayNotes();
  };
  NoteOpenForEdit = () => {
    this.setState({ noteOpen: !this.state.noteOpen });
  };
  handleDeleteIcon = e => {
    this.setState({ deleteIcon: e.currentTarget });
  };
  handleCloseDeleteIcon = () => {
    this.setState({ deleteIcon: null });
  };
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  handlereminderClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleClosereminder = () => {
    this.setState({ anchorEl: null });
  };
  handleSetTodayTime = async () => {
    this.handleClosereminder();
    this.updateReminder();
    var date = new Date().toDateString();
    let reminder1 = date + ", 8:AM";
    await this.setState({ reminder: reminder1 });
    this.updateReminder();
  };
  handleSetTommoTime = async () => {
    this.handleClosereminder();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var date = new Date().toDateString();
    date = date.replace(new Date().getDate(), new Date().getDate() + 1);
    date = date.replace(
      days[new Date().getDay() - 1],
      days[new Date().getDay()]
    );
    let reminder1 = date + ", 8:AM";
    await this.setState({ reminder: reminder1 });
    this.updateReminder();
  };
  handleSetNextWeekTime = async () => {
    this.handleClosereminder();
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var date = new Date().toDateString();
    date = date.replace(
      new Date().getDate().toString(),
      new Date().getDate() + 7
    );
    date = date.replace(
      days[new Date().getDay() - 1],
      days[new Date().getDay()]
    );
    var reminder1 = date + ", 8:00 AM";
    await this.setState({ reminder: reminder1 });
    this.updateReminder();
  };
  handleSetDate = () => {
    this.handleClosereminder();

    this.updateReminder();
  };
  updateReminder = () => {
    let reminderDetails = {
      id: this.state.id,
      reminder: this.state.reminder
    };
    ReminderUpdate(reminderDetails).then(res => {
      console.log(res);
      this.props.displayNotes();
    });
  };
  handleReminderDelete = async () => {
    await this.setState({ reminder: "" });
    this.updateReminder();
  };
  handleDelete=()=>{
    const data={doc_id:this.state.id};
    deleteNote(data).then(res => {
      console.log(res);
      if (res) {
        this.setState({
          snackbarMsg: "Note Deleted",
          snackbarOpen: false
        });
      }
       else {
        this.setState({
          snackbarMsg: res,
          snackbarOpen: false
        });
      }
      this.props.displayNotes();
    });
  }
  handleTrash = () => {
    this.setState({ deleteIcon: null, trash: !this.state.trash });
    const data = { doc_id: this.state.id };
    noteToTrash(data).then(res => {
      console.log(res);
      if (res) {
        this.setState({
          snackbarMsg: "Note moved to trash",
          snackbarOpen: false
        });
       
      } else {
        this.setState({
          snackbarMsg: res,
          snackbarOpen: false
        });
      }
      this.props.displayNotes();
    });
  };
  handleRestore=()=>{
    const data = {id: this.state.id };
    restoreUpdate(data).then(res=>
      console.log(res))
      this.props.displayNotes();
  }
  archiveNoteCreation = () => {
    let data;
    if (this.props.data.data().archive) {
      data = {
        id: this.props.data.id,
        archive: false,
        pin: false
      };
    } else {
      data = {
        id: this.props.data.id,
        archive: true,
        pin: false
      };
    }
    archiveData(data).then(res => console.log(res));
    this.props.displayNotes();
  };
  pinTheNote = () => {
    this.setState({ pin: !this.state.pin });
    const data = {
      id: this.state.id,
      pin: this.state.pin
    };
    notePinned(data);
  };
  handleMouseOver = () => {
    this.setState({ iconDisplay: true });
  };
  handleMouseClose = () => {
    this.setState({ iconDisplay: false });
  };
  render() {
    let archiveIcon = !this.props.data.data().archive ? (
      <IconButton onClick={this.archiveNoteCreation}>
        <Tooltip title="Archive">
          <ArchiveIcon />
        </Tooltip>
      </IconButton>
    ) : (
      <IconButton onClick={this.archiveNoteCreation}>
        <Tooltip title="UnArchive">
          <UnarchiveIcon />
        </Tooltip>
      </IconButton>
    );
    let archiveIconDisplay = !this.state.iconDisplay ? (
      <IconButton></IconButton>
    ) : (
      archiveIcon
    );
    // let svgPin = !this.state.pin ? <SvgPin /> : <SvgPinned />;
    // let svg = !this.state.iconDisplay ? (
    //   <IconButton></IconButton>
    // ) : (
    //   <IconButton onClick={this.pinTheNote}>{svgPin}</IconButton>
    // );
    let iconsContent = !this.state.iconDisplay ? (
      <div className="cardsHover" />
    ) : this.props.trash ? (
      <div className="cardsHover">
        <IconButton onClick={this.handleDelete}>
          <Tooltip title="Delete Forever">
            <DeleteForeverIcon />
          </Tooltip>
        </IconButton>
        <IconButton onClick={this.handleRestore}>
          <Tooltip title="Restore">
            <RestoreFromTrashIcon />
          </Tooltip>
        </IconButton>
      </div>
    ) : (
      <div className="cardsHover">
        <IconButton
          aria-label="more"
          aria-controls="reminder-menu"
          aria-haspopup="true"
          onClick={this.handlereminderClick}
        >
          <Tooltip title="reminder">
            <AddAlertIcon />
          </Tooltip>
        </IconButton>
        <Menu
          id="reminder-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClosereminder}
        >
          <MenuItem onClick={this.handleClosereminder}>reminder :</MenuItem>
          <MenuItem onClick={this.handleSetTodayTime}>
            <div> Later today</div>
          </MenuItem>
          <MenuItem onClick={this.handleSetTommoTime}>Tommorrow</MenuItem>
          <MenuItem onClick={this.handleSetNextWeekTime}>Next week</MenuItem>
          <MenuItem onClick={this.handleClosereminder}>
            Select Date and Time
          </MenuItem>
        </Menu>
        <IconButton>
          <PersonAddIcon />
        </IconButton>
        <IconButton
          aria-label="more"
          aria-controls="color-menu"
          aria-haspopup="true"
          onClick={this.closeColorMenu}
        >
          <Tooltip title="Add Color">
            <ColorLensIcon />
          </Tooltip>
        </IconButton>
        <Menu
          id="color-menu"
          anchorEl={this.state.anchorEl1}
          keepMounted
          open={Boolean(this.state.anchorEl1)}
          onClose={this.closeColorMenu}
        >
          <div>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#f28b82" }}
                onClick={this.colorChange}
              />
            </IconButton>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#cbf0f8" }}
                onClick={this.colorChange}
              />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#faebd7" }}
                onClick={this.colorChange}
              />
            </IconButton>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#6B5B95" }}
                onClick={this.colorChange}
              />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#92A8D1" }}
                onClick={this.colorChange}
              />
            </IconButton>
            <IconButton>
              <RadioButtonUncheckedRoundedIcon
                style={{ backgroundColor: "#DDDDDD" }}
                onClick={this.colorChange}
              />
            </IconButton>
          </div>
        </Menu>
        <IconButton>
          <ImageIcon />
        </IconButton>
        {archiveIconDisplay}
        <IconButton
          aria-label="more"
          aria-controls="delete-menu"
          aria-haspopup="true"
          onClick={this.handleDeleteIcon}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="delete-menu"
          anchorEl={this.state.deleteIcon}
          open={Boolean(this.state.deleteIcon)}
          onClose={this.handleCloseDeleteIcon}
        >
          <MenuItem onClick={this.handleTrash}>Move To Trash</MenuItem>
        </Menu>
      </div>
    );
    return (
      <div
        style={{ backgroundColor: this.props.data.data().color }}
        className="addedNoteCards"
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseClose}
      >
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.snackbarClose}
          message={<span id="messege-id">{this.state.snackbarMsg}</span>}
          action={
            <IconButton
              key="close"
              arial-label="close"
              color="inherit"
              onClick={this.snackbarClose}
            ></IconButton>
          }
        />
        <Card
          className="cardshadow"
          style={{ backgroundColor: this.state.color }}
        >
          <div>
            <div>
              <div className="pinAndTxtFld">
                <div className="paddingInCards" onClick={this.NoteOpenForEdit}>
                  <div>
                    <Typography className="titleinGetCards">
                      <b>{this.props.data.data().title}</b>
                    </Typography>
                  </div>
                  <div className="pinDiv"></div>
                </div>
              </div>
              <div className="paddingInCards" onClick={this.NoteOpenForEdit}>
                <Typography className="descIn">
                  {this.props.data.data().description}
                </Typography>
              </div>
              <div className="reminderIncards">
                {this.state.reminder !== "" ? (
                  <Chip
                    icon={<EventIcon />}
                    label={this.state.reminder}
                    onDelete={this.handleReminderDelete}
                    variant="outlined"
                  />
                ) : (
                  <div className="reminderIncards" />
                )}
                {/* <Typography className="reminderIncardstypo">
                  {this.state.reminder}
                </Typography> */}
              </div>
            </div>
            {iconsContent}
          </div>
        </Card>
        <DailogBox
          open={this.state.noteOpen}
          data={this.props.data}
          closeDialog={this.NoteOpenForEdit}
          displayNotes={this.props.displayNotes}
        />
      </div>
    );
  }
}
export default GetCards;
