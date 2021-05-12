import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getUserList, deleteUser } from "../../services/UserService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddEditUserModal from "./AddEditUserModal";
import ConfirmationDialog from "../utility/ConfirmationDialog";
import Loader from "../utility/Loader";

const styles = (theme) => ({

  root: {
    border: 0,
    color:
      theme.palette.type === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",

    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-colCellTitle": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-columnsContainer": {
      border: `2px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-dataContainer": {
      borderRight: `2px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
      borderLeft: `2px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-cell": {
      color:
        theme.palette.type === "light" ? "#9BA3B9" : "rgba(255,255,255,0.65)",
      fontWeight: "bold",
    },
    "& .MuiDataGrid-row.Mui-odd": {
      backgroundColor: "#F4F2FF",
    },
  },

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
    isLoading: true,
  };

  componentDidMount = async () => {
    this.reloadList();
    this.setState({ isLoading: false });
  };

  reloadList = async () => {
    const { userId } = this.props.profileData;
    let data = {
      Calling_UserID_chr: userId,
      UserID_chr: userId,
      Return_All_Rows_ysn: true,
      Page_Index_int: 1,
      Page_Size_int: 100,
    };
    await this.props.getUserList(data);
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
      {
        field: "clientName",
        headerName: "Client Name",
        width: 150,
        sortDirection: "asc",
        sortable: true,
      },
      {
        field: "fullName",
        headerName: "Name",
        width: 150,
        sortable: true,
        valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
      },
      {
        field: "discriminator",
        headerName: "Discriminator",
        width: 130,
        sortable: true,
      },
      { field: "email", headerName: "Email", flex: 1, sortable: true },
      {
        field: "emailConfirmed",
        headerName: "Email Varified",
        width: 150,
        sortable: true,
      },
      { field: "roleName", headerName: "Role", width: 150, sortable: true },
      {
        field: "acction",
        headerName: "Actions",
        sortable: false,
        headerAlign: 'right',
        align: "right",
        renderCell: (params) => {
          return (
            <div className={classes.flex}>
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
            </div>
          );
        },
        flex: 1,
      },
    ];
    return (
      <Container component="main">
        <div className="mb-5">
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <div className="d-flex justify-content-end mb-2">
            <div className={classes.flex}></div>
            <Button
              className={classes.add_btn}
              variant="contained"
              color="primary"
              onClick={this.onClickAdd}
            >
              Add
            </Button>
          </div>
          <DataGrid
          className={classes.root}
            rows={this.props.usersListData}
            columns={columns}
            pageSize={10}
            disableColumnMenu={true}
            autoHeight={true}
          />
        </div>
        {this.state.isLoading && <Loader type="full-screen" />}
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
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
