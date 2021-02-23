import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import { getAllRolesList, deleteRole } from "../../services/roles/RolesService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Loader from "../utility/Loader";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import PhoneInput from "react-phone-input-2";
import MicOffIcon from "@material-ui/icons/MicOff";
import DialpadIcon from "@material-ui/icons/Dialpad";
import CallEndIcon from "@material-ui/icons/CallEnd";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PhonePausedIcon from "@material-ui/icons/PhonePaused";
import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  add_btn: {
    float: "right",
  },
  flex: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "#3f51b5",
  },
});

class VoiceCalls extends React.Component {
  state = {
    selectedRole: {},
    isOpenDialog: false,
    isOpenDeleteDialog: false,
    action: "add",
    isLoading: true,
  };

  componentDidMount = async () => {
    this.reloadList();
    this.setState({ isLoading: false });
  };

  reloadList = async () => {
    const { userId } = this.props.profileData;
  };

  handleChange = async (e) => {
    let { name, value } = e.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };

  onClickAdd = async () => {
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "add";
      return { isOpenDialog, action };
    });
  };

  onHandleModel = async (name) => {
    let value = this.state[name];
    await this.setState({
      [name]: !value,
    });
  };

  onClickEdit = async (row) => {
    await this.setState({ selectedRole: row });
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "edit";
      return { isOpenDialog, action };
    });
  };

  onClickDelete = async (row) => {
    await this.setState({ selectedRole: row });
    await this.onHandleModel("isOpenDeleteDialog");
  };

  deleteRole = async () => {
    const { selectedRole } = this.state;
    this.props.deleteRole(
      selectedRole,
      (res) => {
        NotificationManager.success(res);
        this.reloadList();
      },
      (err) => {
        NotificationManager.error(err);
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main">
        <div className="mb-5">
          <Grid container className={classes.flex} justify="center" spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid container justify="center">
                <Grid xs={4} key={"key-1"} justify="center" item>
                  <div className="col-md-6 ml-3">
                    <PhoneInput
                      country={"us"}
                      value={this.state.phone}
                      onChange={(phone) => this.setState({ phone })}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid container justify="center">
                <Grid xs={4} key={"key-1"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {1}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-2"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {2}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-3"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {3}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-4"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {4}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-5"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {5}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-6"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {6}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-7"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {7}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-8"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {8}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-9"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {9}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"key-0"} item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    {0}
                  </IconButton>
                </Grid>
                <Grid xs={4} key={"back"} item>
                  <Fab color="primary" aria-label="edit">
                    <IconButton aria-label="delete" className={classes.margin}>
                      <BackspaceIcon />
                    </IconButton>
                  </Fab>
                </Grid>
                <Grid xs={4} key={"cls"} item>
                  <Fab color="primary" aria-label="edit">
                    <HighlightOffIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container justify="center">
                <Grid xs={2} key={"mic"} item>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}
                  >
                    <MicOffIcon />
                  </IconButton>
                </Grid>
                <Grid xs={2} key={"dial"} item>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}
                  >
                    <DialpadIcon />
                  </IconButton>
                </Grid>
                <Grid xs={2} key={"call"} item>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}
                  >
                    <CallEndIcon />
                  </IconButton>
                </Grid>
                <Grid xs={2} key={"record"} item>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}
                  >
                    <RecordVoiceOverIcon />
                  </IconButton>
                </Grid>
                <Grid xs={2} key={"pause"} item>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}
                  >
                    <PhonePausedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {this.state.isLoading && <Loader type="full-screen" />}
      </Container>
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => {
  return {
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(VoiceCalls)
);
