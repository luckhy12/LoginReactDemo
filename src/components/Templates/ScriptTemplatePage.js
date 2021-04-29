import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import {
  getAllTemplatesList,
  deleteTemplate,
} from "../../services/Template/TemplateService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddEditTemplateModal from "./AddEditTemplateModal";
import ConfirmationDialog from "../utility/ConfirmationDialog";
import Loader from "../utility/Loader";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

const styles = (theme) => ({

  root: {
    border: 0,
    color:
      theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',

    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCellTitle': {
      fontWeight: "bold"
    },
    '& .MuiDataGrid-columnsContainer': {
      border: `2px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
      
    },
    '& .MuiDataGrid-dataContainer': {
      borderRight: `2px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
      borderLeft: `2px solid ${
        theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.type === 'light'
          ? '#c0c6cc'
          : 'rgba(255,255,255,0.65)',
          fontWeight: "bold"
    },
    '& .MuiDataGrid-row.Mui-odd' : {
      backgroundColor: "#d7ecff"
    }
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
  heading: {
    fontWeight: "bold",
    marginTop:30,
  }
});

class ScriptTemplatePage extends React.Component {
  state = {
    reg_data: {
      templateId_Ids: 1,
      templateName_chr: "",
      subject_chr: "",
      body_chr: "",
      type_lng: 1,
    },
    selectedTemplate: {},
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
      Type_lng: 3,
      Return_All_Rows_ysn: true,
      Page_Index_int: 1,
      Page_Size_int: 100,
    };
    await this.props.getAllTemplatesList(data);
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
    await this.setState({ selectedTemplate: row });
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "edit";
      return { isOpenDialog, action };
    });
  };

  onClickDelete = async (row) => {
    await this.setState({ selectedTemplate: row });
    await this.onHandleModel("isOpenDeleteDialog");
  };

  deleteTemplate = async () => {
    const { selectedTemplate } = this.state;
    this.props.deleteTemplate(
      selectedTemplate,
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
        field: "templateName_chr",
        headerName: "Script Template Name",
        width: 340,
        sortDirection: "asc",
        sortable: true,
      },
      {
        field: "body_chr",
        headerName: "Body",
        width: 350,
        sortable: true,
      },
      {
        field: "acction",
        headerName: "Actions",
        sortable: false,
        headerAlign: "right",
        align: "right",
        renderCell: (params) => {
          return (
            <div className={classes.flex}>
              <IconButton
                aria-label="delete"
                onClick={(e) => this.onClickEdit(params.row)}
              >
                <CreateOutlinedIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => this.onClickDelete(params.row)}
              >
                <DeleteOutlinedIcon color="primary" />
              </IconButton>
            </div>
          );
        },
        flex: 1,
      },
    ];

    return (
      <Container component="main">
        <div className="mb-5">
        <Typography variant="h5" gutterBottom className={classes.heading}>
            Script
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
            rows={this.props.templatesListData}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            pageSize={10}
            disableColumnMenu={true}
            autoHeight={true}
            autoPageSize={false}
            checkboxSelection={true}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>
        {this.state.isLoading && <Loader type="full-screen" />}
        {this.state.isOpenDialog && (
          <AddEditTemplateModal
            onClickAdd={this.onClickAdd}
            isOpenDialog={this.state.isOpenDialog}
            action={this.state.action}
            templateType={3}
            reloadList={this.reloadList}
            selectedTemplate={this.state.selectedTemplate}
          />
        )}
        {this.state.isOpenDeleteDialog && (
          <ConfirmationDialog
            onHandleModel={(e) => this.onHandleModel("isOpenDeleteDialog")}
            isOpenDialog={this.state.isOpenDeleteDialog}
            action={(e) => this.deleteTemplate(this.state.selectedTemplate)}
            title={"Delete Template"}
            content={"Are you sure want to delete ?"}
          />
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getAllTemplatesList,
  deleteTemplate,
};
const mapStateToProps = (state) => {
  return {
    templatesListData: state.template.templatesListData,
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(ScriptTemplatePage)
);
