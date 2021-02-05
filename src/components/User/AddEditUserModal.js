import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { registerUser, getRoles, updateUser } from "../../services/UserService";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { NotificationManager } from "react-notifications";
import FormValidator from "../../validations/FormValidator";
import Loader from "../utility/Loader";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
});

class AddEditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reg_data: {
        clientId: 1,
        userName: "",
        email: "",
        firstName: "",
        lastName: "",
        roleId: "",
        roleName: "",
        // password: "",
      },
      userRoles: [],
      isLoading: true,
    };
    this.regUserFormValidator = new FormValidator();
  }

  componentDidMount = async () => {
    this.props.getRoles(null, (res) => {
      this.setState({ userRoles: res, isLoading: false });
    });
    if (this.props.action === "edit") {
      const { selectedUser } = this.props;
      await this.setState((prevState) => {
        const reg_data = { ...prevState.reg_data };
        reg_data["userName"] = selectedUser.userName;
        reg_data["email"] = selectedUser.email;
        reg_data["firstName"] = selectedUser.firstName;
        reg_data["lastName"] = selectedUser.lastName;
        reg_data["roleId"] = selectedUser.roleId;
        reg_data["id"] = selectedUser.id;
        reg_data["securitystamp"] = "";
        return { reg_data };
      });
    }
  };

  handleClose = () => {
    this.props.onClickAdd();
  };

  handleChange = async (event) => {
    let { name, value } = event.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    // validate data
    if (this.regUserFormValidator.allValid()) {
      if (this.props.action === "add") {
        this.props.registerUser(
          this.state.reg_data,
          (res) => {
            NotificationManager.success("Sussess");
            this.props.reloadList();
            this.handleClose();
          },
          (err) => {
            NotificationManager.error(err);
          }
        );
      } else {
        this.props.updateUser(
          this.state.reg_data,
          (res) => {
            if (typeof res === "string") {
              NotificationManager.success(res);
            } else {
              NotificationManager.success("Sussess");
            }
            this.props.reloadList();
            this.handleClose();
          },
          (err) => {
            NotificationManager.error(err);
          }
        );
      }
    } else {
      this.regUserFormValidator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { classes } = this.props;
    const { userRoles } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.isOpenDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">
            {this.props.action === "add" ? "Add User" : "Edit User"}
          </DialogTitle>
          <form noValidate onSubmit={this.onSubmitForm}>
            <DialogContent>
              <DialogContentText>
                Please fill all mandatory fields marked as(*)
              </DialogContentText>
              <Container component="main">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="userName"
                      label="User Name"
                      fullWidth
                      name="userName"
                      value={this.state.reg_data.userName}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "User Name",
                      this.state.reg_data.userName,
                      "required",
                      "text-danger"
                    )}
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      type="password"
                      margin="dense"
                      id="password"
                      label="Password"
                      name="password"
                      fullWidth
                      value={this.state.reg_data.password}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "Passwoed",
                      this.state.reg_data.password,
                      "required|password",
                      "text-danger"
                    )}
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                      name="email"
                      value={this.state.reg_data.email}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "Email",
                      this.state.reg_data.email,
                      "required|email",
                      "text-danger"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      fullWidth
                      value={this.state.reg_data.firstName}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "First Name",
                      this.state.reg_data.firstName,
                      "required",
                      "text-danger"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      fullWidth
                      value={this.state.reg_data.lastName}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "Last Name",
                      this.state.reg_data.lastName,
                      "required",
                      "text-danger"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="role"
                        name="roleId"
                        value={this.state.reg_data.roleId}
                        onChange={this.handleChange}
                      >
                        {userRoles.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {this.regUserFormValidator.message(
                        "Role",
                        this.state.reg_data.roleId,
                        "required",
                        "text-danger"
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} variant="contained" color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>

          {this.state.isLoading && <Loader type="full-screen" />}
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  registerUser,
  getRoles,
  updateUser,
};
const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AddEditUserModal)
);
