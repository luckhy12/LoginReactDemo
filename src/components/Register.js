import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { registerUser } from "../services/UserService";
import { connect } from "react-redux";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends React.Component {
  state = {
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

  handleChange = async (e) => {
    let { name, value } = e.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.registerUser(this.state.reg_data, res => {
        this.props.history.push('/details')
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={this.state.reg_data.email}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={this.state.reg_data.firstName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={this.state.reg_data.lastName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  value={this.state.reg_data.password}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="clientName"
                  label="Cleint Name"
                  type="text"
                  id="client-name"
                  autoComplete="clientName"
                  value={this.state.reg_data.clientName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  id="phone-number"
                  autoComplete="phoneNumber"
                  value={this.state.reg_data.phoneNumber}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="phoneNumberType"
                  label="Phone Number Type"
                  type="text"
                  id="phone-number-type"
                  autoComplete="phoneNumberType"
                  value={this.state.reg_data.phoneNumberType}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="registerationDate"
                  name="registerationDate"
                  label="Registration Date"
                  type="date"
                  value={this.state.reg_data.registerationDate}
                  onChange={this.handleChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="role"
                  label="Role"
                  type="text"
                  id="role"
                  autoComplete="role"
                  value={this.state.reg_data.role}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
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
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
