import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { makeVoiceCall } from "../../services/message/messagingService";
import { NotificationManager } from "react-notifications";
import Loader from "../utility/Loader";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
    width: "100%",
  },
});

class CustomerCallModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_data: {
        strTo: "9785585649",
      },
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const { selectedCustomer } = this.props;
    let data = {
        strTo: selectedCustomer.phone_chr
      };

      await this.props.makeVoiceCall(
        data,
        (res) => {
            this.setState({ isLoading: false });
          if (typeof res === "string") {
            NotificationManager.success(res);
          } else {
            NotificationManager.success("Success");
          }
        },
        (err) => {

          NotificationManager.error(err.data.message);
        }
      );
  };

  handleClose = () => {
    this.props.onClickPhoneCall();
  };

  render() {
    const { selectedCustomer } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isOpenCallDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">
          {"Calling..."}
          </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedCustomer.phone_chr}
              </DialogContentText>
             </DialogContent>

          {this.state.isLoading && <Loader type="full-screen" />}
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
    makeVoiceCall,

};
const mapStateToProps = (state) => {
  return {
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(CustomerCallModel)
);
