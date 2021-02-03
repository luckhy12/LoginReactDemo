import React from "react";
import { DataGrid, RightEmptyCell } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getUserList } from "../../services/UserService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddEditUserModal from "./AddEditUserModal";

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

class UserList extends React.Component {
  state = {
    reg_data: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      clientName: "",
      phoneNumber: "",
      phoneNumberType: "",
      registerationDate: new Date(),
      role: "",
    },
    userList: [],
    isOpenDialog: false,
    action: "add",
  };

  componentDidMount() {
    let data = {
      Calling_UserID_chr: "67dd24d2-bfb9-4f49-bcd2-5a455ac12574",
      UserID_chr: "67dd24d2-bfb9-4f49-bcd2-5a455ac12574",
      Return_All_Rows_ysn: true,
      Page_Index_int: 1,
      Page_Size_int: 100,
    };
    this.props.getUserList(data);
  }

  handleChange = async (e) => {
    let { name, value } = e.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };

  onClickAdd = async () => {
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "add";
      return { isOpenDialog, action };
    });
  };

  onClickEdit = async () => {
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "edit";
      return { isOpenDialog, action };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.registerUser(
      this.state.reg_data,
      (res) => {
        this.props.history.push("/details");
      },
      (err) => {
        NotificationManager.error(err);
      }
    );
  };

  render() {
    const { classes } = this.props;
    const columns = [
      { field: "clientName", headerName: "Client name", width: 150 },
      {
        field: "fullName",
        headerName: "Name",
        width: 150,
        renderCell: (params) => {
          return params.row.firstName + " " + params.row.lastName;
        },
      },
      { field: "discriminator", headerName: "Discriminator", width: 130 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "emailConfirmed", headerName: "Email Varified", width: 150 },
      { field: "roleName", headerName: "Role", width: 150 },
      {
        field: "acction",
        headerName: "Actions",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        renderCell: (params) => {
          return (
            <Toolbar>
              <Button
                className="mr-2"
                variant="contained"
                onClick={this.onClickEdit}
                color="primary"
              >
                Edit
              </Button>
              <Button variant="contained" color="primary">
                Delete
              </Button>
            </Toolbar>
          );
        },
        flex: 1,
      },
    ];
    return (
      <Container component="main">
        <div style={{ height: 400, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Toolbar>
            <div className={classes.flex}></div>
            <Button
              className={classes.add_btn}
              variant="contained"
              color="primary"
              onClick={this.onClickAdd}
            >
              Add
            </Button>
          </Toolbar>
          <DataGrid
            rows={this.props.usersListData}
            columns={columns}
            pageSize={5}
          />
        </div>
        <AddEditUserModal
          onClickAdd={this.onClickAdd}
          isOpenDialog={this.state.isOpenDialog}
          action={this.state.action}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getUserList,
};
const mapStateToProps = (state) => {
  return {
    usersListData: state.user.usersListData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
