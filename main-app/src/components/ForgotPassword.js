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
import { forgotPassword } from "../services/UserService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import FormValidator from "../validations/FormValidator";
import { withStyles } from "@material-ui/core/styles";

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

class ForgotPassword extends React.Component {
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
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.onSubmitForm}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            {this.forgotPasswordFormValidator.message(
              "Email",
              this.state.email,
              "required|email",
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
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Login
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
  forgotPassword,
};
const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};
export default withStyles(useStyles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
