import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getAllRolesList, deleteRole } from "../../services/roles/RolesService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddEditRolesModal from "./AddEditRolesModal";
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

class RolesPage extends React.Component {
  state = {
    selectedRole: {},
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
      Return_All_Rows_ysn: true,
      Page_Index_int: 1,
      Page_Size_int: 100,
    };
    await this.props.getAllRolesList(data);
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
    await this.setState({ selectedRole: row });
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "edit";
      return { isOpenDialog, action };
    });
  };

  onClickDelete = async (row) => {
    await this.setState({ selectedRole: row });
    await this.onHandleModel("isOpenDeleteDialog");
  };

  deleteRole = async () => {
    const { selectedRole } = this.state;
    this.props.deleteRole(
      selectedRole,
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
        field: "name",
        headerName: "Name",
        width: 250,
        sortable: true,
        sortDirection: "asc",
      },
      {
        field: "isDeleted",
        headerName: "Is Deleted",
        width: 150,
        sortable: true,
      },
      {
        field: "acction",
        headerName: "Actions",
        sortable: false,
        align: "right",
        headerAlign: 'right',
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
          <div>
            <Typography variant="h4" gutterBottom>
              Roles
            </Typography>
          </div>
          <div className="d-flex justify-content-end mb-2">
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
            rows={this.props.allRolesList}
            columns={columns}
            pageSize={10}
            disableColumnMenu={true}
            autoHeight={true}
          />
        </div>
        {this.state.isLoading && <Loader type="full-screen" />}
        {this.state.isOpenDialog && (
          <AddEditRolesModal
            onClickAdd={this.onClickAdd}
            isOpenDialog={this.state.isOpenDialog}
            action={this.state.action}
            reloadList={this.reloadList}
            selectedRole={this.state.selectedRole}
          />
        )}
        {this.state.isOpenDeleteDialog && (
          <ConfirmationDialog
            onHandleModel={(e) => this.onHandleModel("isOpenDeleteDialog")}
            isOpenDialog={this.state.isOpenDeleteDialog}
            action={(e) => this.deleteRole(this.state.selectedRole)}
            title={"Delete Role"}
            content={"Are you sure want to delete ?"}
          />
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getAllRolesList,
  deleteRole,
};
const mapStateToProps = (state) => {
  return {
    allRolesList: state.roles.allRolesList,
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(RolesPage)
);
