import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {getAllTemplatesList } from "../../services/Template/TemplateService";
import {sendTextMessage, sendEmail } from "../../services/message/messagingService";
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
    minWidth: 350,
    width: "100%",
  },
});

class SendTextEmailModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_data: {
        strFrom: "7976053359",
        strTo: "9785585649",
        strToName: "",
        strBody: "",
        templateId: 0
      },
      messageTemplates: [],
      isLoading: true,
    };
    this.messageFormValidator = new FormValidator();
  }

  componentDidMount = async () => {
    const { userId } = this.props.profileData;
    let data = {
      Calling_UserID_chr: userId,
      UserID_chr: userId,
      Type_lng: 2,
      Return_All_Rows_ysn: true,
      Page_Index_int: 1,
      Page_Size_int: 100,
    };
    this.props.getAllTemplatesList(data, (res) => {
      this.setState({ messageTemplates: res, isLoading: false });
    });
    if (this.props.action === "Text") {
      const { selectedCustomer } = this.props;
      await this.setState((prevState) => {
        const cust_data = { ...prevState.cust_data };
        cust_data["strTo"] = selectedCustomer.phone_chr;
        cust_data["strToName"] = selectedCustomer.customerName_chr;
        return { cust_data };
      });
    }
    else {
      const { selectedCustomer } = this.props;
      await this.setState((prevState) => {
        const cust_data = { ...prevState.cust_data };
        cust_data["strFrom"] = "kumarvikram476@gmail.com";
        cust_data["strTo"] = selectedCustomer.email_chr;
        cust_data["strToName"] = selectedCustomer.customerName_chr;
        return { cust_data };
    });
  }
  };

  handleClose = () => {
    this.props.onClickEmail();
  };

  handleChange = async (event) => {
    let { name, value } = event.target;
    await this.setState((prevState) => {
      const cust_data = { ...prevState.cust_data };
      cust_data[name] = value;
      return { cust_data };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    //validate data
    if (this.messageFormValidator.allValid()) {
      let selectedTemplate = this.state.messageTemplates.filter(item => {
        return item.templateID_ids === this.state.cust_data.templateId
      });

      if (this.props.action === "Text") {

        let data = [{
          strFrom: this.state.strFrom,
          strTo: this.state.cust_data.strTo,
          strBody: selectedTemplate[0].body_chr,
          strToName: this.state.cust_data.strToName,
          
        }];

        this.props.sendTextMessage(
          data,
          (res) => {
            if (typeof res === "string") {
              NotificationManager.success(res);
            } else {
              NotificationManager.success("Sussess");
            }
            this.handleClose();
          },
          (err) => {
            NotificationManager.error(err.data.message);
          }
        );
      } else {
        
        let data = {
          strFrom: this.state.strFrom,
          strSubject: selectedTemplate[0].subject_chr,
          strBody: selectedTemplate[0].body_chr,
          strAttachmentPath: "",
          sendTos: [{strTo: this.state.cust_data.strTo, strToName: this.state.cust_data.strToName}],
        };
        this.props.sendEmail(
          data,
          (res) => {
            if (typeof res === "string") {
              NotificationManager.success(res);
            } else {
              NotificationManager.success("Sussess");
            }
            this.handleClose();
          },
          (err) => {
            NotificationManager.error(err);
          }
        );
      }
    } else {
      this.messageFormValidator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { classes } = this.props;
    const { messageTemplates } = this.state;
    return (
      <div>
        <Dialog
          open={this.props.isOpenDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">
          {this.props.action === "Text" ? "Send Text Message" : "Send Email"}
          </DialogTitle>
          <form noValidate onSubmit={this.onSubmitForm}>
            <DialogContent>
              <DialogContentText>
                Please fill all mandatory fields marked as(*)
              </DialogContentText>
              <Container component="main">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Select Template
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="template"
                        name="templateId"
                        value={this.state.cust_data.templateId}
                        onChange={this.handleChange}
                      >
                        {messageTemplates.map((item) => (
                          <MenuItem key={item.templateID_ids} value={item.templateID_ids}>
                            {item.templateName_chr}
                          </MenuItem>
                        ))}
                      </Select>
                      {this.messageFormValidator.message(
                        "Template",
                        this.state.cust_data.templateId,
                        "required",
                        "text-danger"
                      )}
                    </FormControl>
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
                Send
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
    getAllTemplatesList,
    sendTextMessage,
    sendEmail
};
const mapStateToProps = (state) => {
  return {
    templatesListData: state.template.templatesListData,
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(SendTextEmailModel)
);
