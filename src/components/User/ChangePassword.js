import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { forgotPassword } from "../../services/UserService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import FormValidator from "../../validations/FormValidator";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = (theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.forgotPasswordFormValidator = new FormValidator();
  }

  onChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email: email });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    if (this.forgotPasswordFormValidator.allValid()) {
      let data = {
        email: this.state.email,
      };
      this.props.forgotPassword(
        data,
        (res) => {
          this.props.history.push("/");
          NotificationManager.success(res);
        },
        (err) => {
          NotificationManager.error(err);
        }
      );
    } else {
      this.forgotPasswordFormValidator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.onSubmitForm}
          >
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              autoFocus
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            {this.forgotPasswordFormValidator.message(
              "Current Paasword",
              this.state.email,
              "required|password",
              "text-danger"
            )}
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              autoFocus
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            {this.forgotPasswordFormValidator.message(
              "New Password",
              this.state.email,
              "required|password",
              "text-danger"
            )}
             <TextField
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              id="confirmPassword"
              label="Current Password"
              name="confirmPassword"
              autoFocus
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            {this.forgotPasswordFormValidator.message(
              "Confirm Password",
              this.state.email,
              "required|password",
              "text-danger"
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  forgotPassword,
};
const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};
export default withStyles(useStyles, { withTheme: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword))
);
