import React, { Component } from "react";
import "./VideoCall.scss";

import Room from "./Room";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const { connect } = require("twilio-video");

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

class VideoCallPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identity: "",
      room: null,
    };

    this.inputRef = React.createRef();
    this.joinRoom = this.joinRoom.bind(this);
    this.returnToLobby = this.returnToLobby.bind(this);
    this.updateIdentity = this.updateIdentity.bind(this);
    this.removePlaceholderText = this.removePlaceholderText.bind(this);
  }

  async joinRoom() {
    try {
      const response = await fetch(
        `https://localhost:44385/api/VideoCall/GetAccessToken?identity=${this.state.identity}`
      );
      console.log("response " + response);
      const data = await response.json();
      console.log("data " + data);
      const room = await connect(data.accessToken, {
        name: "cool-room",
        audio: true,
        video: true,
      });

      this.setState({ room: room });
    } catch (err) {
      console.log(err);
    }
  }

  returnToLobby() {
    this.setState({ room: null });
  }

  removePlaceholderText() {
    this.inputRef.current.placeholder = "";
  }

  updateIdentity(event) {
    this.setState({
      identity: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const disabled = this.state.identity === "" ? true : false;
    return (
      <Container component="main">
        <div className="mb-5">
          <Typography variant="h4" gutterBottom>
            Video Calls
          </Typography>
          <div className="app">
            {this.state.room === null ? (
              <div className="lobby">
                <TextField className="input"
                  margin="dense"
                  autoFocus
                  id="identity"
                  name="identity"
                  ref={this.inputRef}
                  onClick={this.removePlaceholderText}
                  value={this.state.identity}
                  onChange={this.updateIdentity}
                  placeholder="What's your name?"
                />
                <Button
                  className={classes.buttonClass}
                  variant="contained"
                  color="primary"
                  disabled={disabled}
                  onClick={this.joinRoom}
                >
                  Join Room
                </Button>
              </div>
            ) : (
              <Room returnToLobby={this.returnToLobby} room={this.state.room} />
            )}
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(VideoCallPage);
