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
import DialpadIcon from '@material-ui/icons/Dialpad';
import CallEndIcon from '@material-ui/icons/CallEnd';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import PhonePausedIcon from '@material-ui/icons/PhonePaused';

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
          <Grid container className={classes.root} justify="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid xs={6} container justify="center" spacing={2}>
                <Grid item xs={4}>
                  <PhoneInput
                    country={"us"}
                    value={this.state.phone}
                    onChange={(phone) => this.setState({ phone })}
                  />
                </Grid>
                <Grid container justify="center">
                  <Grid xs={4} key={"key-1"} item>
                    <Fab color="primary" aria-label="edit">
                      {1}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-2"} item>
                    <Fab color="primary" aria-label="edit">
                      {2}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-3"} item>
                    <Fab color="primary" aria-label="edit">
                      {3}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-4"} item>
                    <Fab color="primary" aria-label="edit">
                      {4}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-5"} item>
                    <Fab color="primary" aria-label="edit">
                      {5}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-6"} item>
                    <Fab color="primary" aria-label="edit">
                      {6}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-7"} item>
                    <Fab color="primary" aria-label="edit">
                      {7}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-8"} item>
                    <Fab color="primary" aria-label="edit">
                      {8}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-9"} item>
                    <Fab color="primary" aria-label="edit">
                      {9}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"key-0"} item>
                    <Fab color="primary" aria-label="edit">
                      {0}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"back"} item>
                    <Fab color="primary" aria-label="edit">
                      {"<-"}
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"cls"} item>
                    <Fab color="primary" aria-label="edit">
                      {"cls"}
                    </Fab>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid xs={4} key={"cls"} item>
                    <Fab color="secondary" aria-label="edit">
                      <MicOffIcon />
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"cls"} item>
                    <Fab color="secondary" aria-label="edit">
                      <DialpadIcon />
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"cls"} item>
                    <Fab color="secondary" aria-label="edit">
                      <CallEndIcon />
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"cls"} item>
                    <Fab color="secondary" aria-label="edit">
                      <RecordVoiceOverIcon />
                    </Fab>
                  </Grid>
                  <Grid xs={4} key={"cls"} item>
                    <Fab color="secondary" aria-label="edit">
                      <PhonePausedIcon />
                    </Fab>
                  </Grid>
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
