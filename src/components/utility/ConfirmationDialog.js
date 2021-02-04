import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    this.state = {};
  }

  componentDidMount = async () => {};

  handleClose = () => {
    this.props.onHandleModel();
  };

  onAccept = () => {
    this.props.action()
    this.props.onHandleModel();
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
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.contextText}</DialogContentText>
            <Container component="main">{this.props.content}</Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.noLbl || 'No'}
            </Button>
            <Button type="submit" onClick={this.onAccept} color="primary">
              {this.props.yesLbl || 'Yes'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddEditUserModal);
