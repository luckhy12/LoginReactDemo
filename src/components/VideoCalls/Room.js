import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import Participant from './Participant';
import Button from "@material-ui/core/Button";
import './VideoCall.scss';

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

class Room extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          remoteParticipants: Array.from(this.props.room.participants.values())
        }
      
        this.leaveRoom = this.leaveRoom.bind(this);
      }

      componentDidMount() {
        // Add event listeners for future remote participants coming or going
        this.props.room.on('participantConnected', participant => this.addParticipant(participant));
        this.props.room.on('participantDisconnected', participant => this.removeParticipant(participant));
        
        window.addEventListener("beforeunload", this.leaveRoom);
      }

      componentWillUnmount() {
        this.leaveRoom();
      }

      addParticipant(participant) {
        console.log(`${participant.identity} has joined the room.`);
        
        this.setState({
          remoteParticipants: [...this.state.remoteParticipants, participant]
        });
      }
    
      removeParticipant(participant) {
        console.log(`${participant.identity} has left the room`);
    
        this.setState({
          remoteParticipants: this.state.remoteParticipants.filter(p => p.identity !== participant.identity)
        });
      }

      leaveRoom() {
        this.props.room.disconnect();
        this.props.returnToLobby();
      }

      render() {
        const { classes } = this.props;
        return (
          <div className="room">
            <div className = "participants">
              <Participant key={this.props.room.localParticipant.identity} localParticipant="true" participant={this.props.room.localParticipant}/>
              {
                this.state.remoteParticipants.map(participant => 
                  <Participant key={participant.identity} participant={participant}/>
                )
              }
            </div>
            <Button id="leaveRoom"
                  className={classes.buttonClass}
                  variant="contained"
                  color="primary"
                  onClick={this.leaveRoom}
                >
                  Leave Room
                </Button>
           
          </div>
        );
      }
}

export default withStyles(styles, { withTheme: true })(Room);
