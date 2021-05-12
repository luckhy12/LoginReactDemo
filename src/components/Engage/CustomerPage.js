import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getCustomersList } from "../../services/customer/CustomerService";
import { connect } from "react-redux";
import SendTextEmailModal from "./SendTex_EmailModel";
import CustomerCallModel from "./CustomerCallModel";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Loader from "../utility/Loader";
import IconButton from "@material-ui/core/IconButton";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import TextsmsRoundedIcon from "@material-ui/icons/TextsmsRounded";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import { withRouter } from "react-router-dom";

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
  heading: {
    fontWeight: "bold",
    marginTop: 30,
    paddingBottom: 25,
  },
});

class CustomerPage extends React.Component {
  state = {
    reg_data: {
      templateId_Ids: 1,
      templateName_chr: "",
      subject_chr: "",
      body_chr: "",
      type_lng: 1,
    },
    selectedCustomer: {},
    isOpenDialog: false,
    isOpenCallDialog: false,
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
    await this.props.getCustomersList(data);
  };

  handleChange = async (e) => {
    let { name, value } = e.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };

  onHandleModel = async (name) => {
    let value = this.state[name];
    await this.setState({
      [name]: !value,
    });
  };

  onCustomerSelected = (param) => {
    this.props.history.push({
      pathname: "/customer/details",
      state: { customerData: param.data },
    });
  };

  onClickVideoCall = async (row) => {
    this.props.history.push({
      pathname: "/customer/Video-call",
    });
  };

  onClickPhoneCall = async (row) => {
    await this.setState({ selectedCustomer: row });
    await this.setState((prevState) => {
      const isOpenCallDialog = !prevState.isOpenCallDialog;
      const action = "add";
      return { isOpenCallDialog, action };
    });
  };

  onClickEmail = async (row) => {
    await this.setState({ selectedCustomer: row });
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "Email";
      return { isOpenDialog, action };
    });
  };

  onClickText = async (row) => {
    await this.setState({ selectedCustomer: row });
    await this.setState((prevState) => {
      const isOpenDialog = !prevState.isOpenDialog;
      const action = "Text";
      return { isOpenDialog, action };
    });
  };

  render() {
    const { classes } = this.props;
    const columns = [
      {
        field: "customerName_chr",
        headerName: "Customer Name",
        width: 200,
        sortDirection: "asc",
        sortable: true,
      },
      {
        field: "stage_chr",
        headerName: "Stage",
        width: 150,
        sortable: true,
      },
      {
        field: "age_lng",
        headerName: "Age",
        width: 150,
        sortable: true,
      },
      {
        field: "phone_chr",
        headerName: "Phone",
        width: 150,
        sortable: true,
      },
      {
        field: "email_chr",
        headerName: "Email",
        width: 200,
        sortable: true,
      },
      {
        field: "acction",
        headerName: "Actions",
        sortable: false,
        headerAlign: "left",
        align: "left",
        renderCell: (params) => {
          return (
            <div className={classes.flex}>
              <IconButton aria-label="delete"
               onClick={(e) => this.onClickVideoCall(params.row)}>
                <VideocamRoundedIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => this.onClickPhoneCall(params.row)}
              >
                <PhoneRoundedIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => this.onClickEmail(params.row)}
              >
                <EmailRoundedIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => this.onClickText(params.row)}
              >
                <TextsmsRoundedIcon color="primary" />
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
            Customer Overview
          </Typography>

          <div></div>
          <DataGrid
            className={classes.root}
            rows={this.props.customerListData}
            columns={columns.map((column) => ({
              ...column,
              disableClickEventBubbling: true,
            }))}
            pageSize={10}
            disableColumnMenu={true}
            autoHeight={true}
            autoPageSize={false}
            checkboxSelection={false}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onRowSelected={(e) => this.onCustomerSelected(e)}
          />
        </div>
        {this.state.isLoading && <Loader type="full-screen" />}
        {this.state.isOpenDialog && (
          <SendTextEmailModal
            onClickEmail={this.onClickEmail}
            isOpenDialog={this.state.isOpenDialog}
            action={this.state.action}
            selectedCustomer={this.state.selectedCustomer}
          />
        )}
        {this.state.isOpenCallDialog && (
          <CustomerCallModel
            onClickPhoneCall={this.onClickPhoneCall}
            isOpenCallDialog={this.state.isOpenCallDialog}
            action={this.state.action}
            selectedCustomer={this.state.selectedCustomer}
          />
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getCustomersList,
};
const mapStateToProps = (state) => {
  return {
    customerListData: state.customer.customerListData,
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerPage))
);
