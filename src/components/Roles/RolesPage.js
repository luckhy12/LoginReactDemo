import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getAllRolesList, deleteRole } from "../../services/roles/RolesService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddEditRolesModal from "./AddEditRolesModal";
import ConfirmationDialog from "../utility/ConfirmationDialog";
import Loader from "../utility/Loader";

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
