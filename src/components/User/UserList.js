import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getUserList, deleteUser } from "../../services/UserService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddEditUserModal from "./AddEditUserModal";
import ConfirmationDialog from "../utility/ConfirmationDialog";

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
    selectedUser: {},
    userList: [],
    isOpenDialog: false,
    isOpenDeleteDialog: false,
    action: "add",
  };

  componentDidMount() {
    this.reloadList();
  }

  reloadList = () => {
    let data = {
      Calling_UserID_chr: "67dd24d2-bfb9-4f49-bcd2-5a455ac12574",
      UserID_chr: "67dd24d2-bfb9-4f49-bcd2-5a455ac12574",
      Return_All_Rows_ysn: true,
      Page_Index_int: 1,
      Page_Size_int: 100,
    };
    this.props.getUserList(data);
  };

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

  onHandleModel = async (name) => {
    let value = this.state[name];
    await this.setState({
      [name]: !value,
    });
  };

  onClickEdit = async (row) => {
    await this.setState({ selectedUser: row });
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "edit";
      return { isOpenDialog, action };
    });
  };

  onClickDelete = async (row) => {
    await this.setState({ selectedUser: row });
    await this.onHandleModel("isOpenDeleteDialog");
  };

  deleteUser = async () => {
    const { selectedUser } = this.state;
    this.props.deleteUser(
      selectedUser,
      (res) => {
        NotificationManager.success(res);
        this.reloadList();
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
                onClick={(e) => this.onClickEdit(params.row)}
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={(e) => this.onClickDelete(params.row)}
                variant="contained"
                color="primary"
              >
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
        <div style={{ height: "90vh", width: "100%" }}>
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
            pageSize={10}
            disableColumnMenu={true}
          />
        </div>
        {this.state.isOpenDialog && (
          <AddEditUserModal
            onClickAdd={this.onClickAdd}
            isOpenDialog={this.state.isOpenDialog}
            action={this.state.action}
            reloadList={this.reloadList}
            selectedUser={this.state.selectedUser}
          />
        )}
        {this.state.isOpenDeleteDialog && (
          <ConfirmationDialog
            onHandleModel={(e) => this.onHandleModel("isOpenDeleteDialog")}
            isOpenDialog={this.state.isOpenDeleteDialog}
            action={(e) => this.deleteUser(this.state.selectedUser)}
            title={"Delete User"}
            content={"Are you sure want to delete ?"}
          />
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getUserList,
  deleteUser,
};
const mapStateToProps = (state) => {
  return {
    usersListData: state.user.usersListData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
