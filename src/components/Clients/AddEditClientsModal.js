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
import {
  updateClient,
  createClient,
} from "../../services/clients/ClientsService";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
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
      role_data: {
        clientName_chr: "",
        calling_UserID_chr: this.props.data.userId,
        tblDefaultAvatar: "",
        isActive_ysn: true,
        ClientID_lng: this.props.data.userId,
        lastUpdatedByUserID_chr: this.props.data.userId,
        lastUpdatedDateTime_dtm: new Date(),
      },
      isLoading: false,
    };
    this.regUserFormValidator = new FormValidator();
  }

  componentDidMount = async () => {
    if (this.props.action === "edit") {
      const { selectedRecord } = this.props;
      await this.setState((prevState) => {
        const role_data = { ...prevState.role_data };
        role_data["clientName_chr"] = selectedRecord.clientName_chr;
        role_data["id"] = selectedRecord.id;
        role_data["securitystamp"] = "";
        return { role_data };
      });
    }
  };

  handleClose = () => {
    this.props.onClickAdd();
  };

  handleChange = async (event) => {
    let { name, value } = event.target;
    await this.setState((prevState) => {
      const role_data = { ...prevState.role_data };
      role_data[name] = value;
      return { role_data };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    // validate data
    if (this.regUserFormValidator.allValid()) {
      if (this.props.action === "add") {
        this.props.createClient(
          this.state.role_data,
          (res) => {
            NotificationManager.success("Success");
            this.props.reloadList();
            this.handleClose();
          },
          (err) => {
            NotificationManager.error(err);
          }
        );
      } else {
        this.props.updateClient(
          this.state.role_data,
          (res) => {
            if (typeof res === "string") {
              NotificationManager.success(res);
            } else {
              NotificationManager.success("Success");
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
    return (
      <div>
        <Dialog
          open={this.props.isOpenDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">
            {this.props.action === "add" ? "Add Client" : "Edit Client"}
          </DialogTitle>
          <form noValidate onSubmit={this.onSubmitForm}>
            <DialogContent>
              <DialogContentText>
                Please fill all mandatory fields marked as(*)
              </DialogContentText>
              <Container component="main">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="clientName_chr"
                      label="Client Name"
                      fullWidth
                      name="clientName_chr"
                      value={this.state.role_data.clientName_chr}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "Role Name",
                      this.state.role_data.clientName_chr,
                      "required",
                      "text-danger"
                    )}
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                variant="contained"
                color="primary"
              >
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
  createClient,
  updateClient,
};
const mapStateToProps = (state) => {
  return {
    data: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AddEditUserModal)
);
