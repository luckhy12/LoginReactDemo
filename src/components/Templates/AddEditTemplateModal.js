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
import { addEditTemplate } from "../../services/Template/TemplateService";
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

class AddEditTemplateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template_data: {
        calling_UserID_chr: this.props.data.userId,
        templateId_lng: 0,
        templateName_chr: "",
        subject_chr: "",
        body_chr: "",
        type_lng: this.props.templateType,
        lastUpdatedByUserID_chr: this.props.data.userId,
        lastUpdatedDateTime_dtm: new Date(),
      },
      isLoading: false,
    };
    this.regUserFormValidator = new FormValidator();
  }

  componentDidMount = async () => {
    if (this.props.action === "edit") {
      const { selectedTemplate } = this.props;
      await this.setState((prevState) => {
        const template_data = { ...prevState.template_data };
        template_data["templateName_chr"] = selectedTemplate.templateName_chr;
        template_data["subject_chr"] = selectedTemplate.subject_chr;
        template_data["body_chr"] = selectedTemplate.body_chr;
        template_data["type_lng"] = selectedTemplate.type_lng;
        template_data["templateId_lng"] = selectedTemplate.templateID_ids;
        return { template_data };
      });
    }
  };

  handleClose = () => {
    this.props.onClickAdd();
  };

  handleChange = async (event) => {
    let { name, value } = event.target;
    await this.setState((prevState) => {
      const template_data = { ...prevState.template_data };
      template_data[name] = value;
      return { template_data };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    // validate data
    if (this.regUserFormValidator.allValid()) {
      if (this.props.action === "add") {
        this.props.addEditTemplate(
          this.state.template_data,
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
        this.props.addEditTemplate(
          this.state.template_data,
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
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.isOpenDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">
            {this.props.action === "add" ? "Add Template" : "Edit Template"}
          </DialogTitle>
          <form noValidate onSubmit={this.onSubmitForm}>
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
                      id="templateName_chr"
                      label="Template Name"
                      fullWidth
                      name="templateName_chr"
                      value={this.state.template_data.templateName_chr}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "Template Name",
                      this.state.template_data.templateName_chr,
                      "required",
                      "text-danger"
                    )}
                  </Grid>
                  {this.props.templateType === 1 && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="subject_chr"
                        label="Subject"
                        fullWidth
                        name="subject_chr"
                        value={this.state.template_data.subject_chr}
                        onChange={this.handleChange}
                      />
                      {this.regUserFormValidator.message(
                        "Subject",
                        this.state.template_data.subject_chr,
                        "required",
                        "text-danger"
                      )}
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="body_chr"
                      label="Body"
                      name="body_chr"
                      fullWidth
                      value={this.state.template_data.body_chr}
                      onChange={this.handleChange}
                    />
                    {this.regUserFormValidator.message(
                      "Body",
                      this.state.template_data.body_chr,
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
  addEditTemplate,
};
const mapStateToProps = (state) => {
  return {
    data: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(AddEditTemplateModal)
);
