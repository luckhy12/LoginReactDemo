import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { registerUser } from "../../services/UserService";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
});

class AddEditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reg_data: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        clientName: "",
        phoneNumber: "",
        phoneNumberType: "",
        registerationDate: new Date(),
        role: "",
      },
    };
  }
  handleClose = () => {
    this.props.onClickAdd();
  };
  handleChange = async (e) => {
    let { name, value } = e.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isOpenDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={'md'}
          maxHeight='400px'
        >
          <DialogTitle id="form-dialog-title">
            {this.props.action === "add" ? "Add User" : "Edit User"}
          </DialogTitle>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="role"
                      // value={age}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={10}>User</MenuItem>
                      <MenuItem value={20}>Admin</MenuItem>
                      <MenuItem value={30}>SUper User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  registerUser,
};
const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AddEditUserModal)
);
