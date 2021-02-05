import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { checkLogin } from "../services/UserService";
import { connect } from "react-redux";
// import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";
import FormValidator from "../validations/FormValidator";
import { NotificationManager } from "react-notifications";
import ButtonLoader from "./utility/ButtonLoader";

const useStyles = makeStyles((theme) => ({
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
}));

const loginFormValidator = new FormValidator();

function LoginPage(props) {
  let history = useHistory();
  const classes = useStyles();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [value, setValue] = useState(0);
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const onChangeEmail = (event) => {
    const email = event.target.value;
    setLoginData({ ...loginData, email: email });
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setLoginData({ ...loginData, password: password });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (loginFormValidator.allValid()) {
      setIsBtnClicked(true);
      props.checkLogin(
        loginData,
        (res) => {
          localStorage.setItem("token", res.token);
          history.push("/dashboard");
        },
        (err) => {
          setIsBtnClicked(false);
          NotificationManager.error(err);
        }
      );
    } else {
      loginFormValidator.showMessages();
      setValue(value + 1);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
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
            value={loginData.email}
            onChange={onChangeEmail}
          />
          {loginFormValidator.message(
            "Email",
            loginData.email,
            "required|email",
            "text-danger"
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={onChangePassword}
          />
          {loginFormValidator.message(
            "Password",
            loginData.password,
            "required|password",
            "text-danger"
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ButtonLoader
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            label={"Sign In"}
            isLoading={isBtnClicked}
          />
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = {
  checkLogin,
};
const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
