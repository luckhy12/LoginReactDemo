import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { getAllMessageList } from "../../services/reports/reportService";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Loader from "../utility/Loader";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import MouseIcon from "@material-ui/icons/Mouse";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

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
    
  containderDiv: {
    marginLeft: 50,
    marginRight: 50,
  },

  outerTitleIcons: {
    width: 15,
    height: 15,
    marginBottom: 3,
    marginLeft: 5,
  },

  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 150,
    margin: 10,
    marginLeft: 0,
  },
  heading: {
    fontWeight: "bold",
    marginTop: 30,
  },
  icon: {
    float: "right",
    color: "#117A8B",
  },
});

class MessageLogsPage extends React.Component {
  state = {
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
    };
    await this.props.getAllMessageList(data);
  };

  render() {
    const { classes } = this.props;
    const columns = [
      {
        field: "from",
        headerName: "From",
        width: 200,
        sortDirection: "asc",
        sortable: true,
      },
      {
        field: "to",
        headerName: "To",
        width: 200,
        sortable: true,
      },
      {
        field: "body",
        headerName: "Body",
        width: 350,
        sortable: true,
      },
      {
        field: "date_sent",
        headerName: "Sent Date",
        width: 200,
        sortable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        sortable: true,
      },
    ];

    return (
      <div className={classes.containderDiv}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              SMS Optimization
            </Typography>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography component="div">
                <Box fontSize={20} m={1} textAlign="left" color="black">
                   Sent
                  <SendIcon className={classes.icon}></SendIcon>
                </Box>

                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  fontSize={35}
                  textAlign="left"
                  color="black"
                >
                  5.9%
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography component="div">
                <Box fontSize={20} m={1} textAlign="left" color="black">
                  Delivered{" "}
                  <OpenInNewIcon className={classes.icon}></OpenInNewIcon>
                </Box>
                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  fontSize={35}
                  textAlign="left"
                  color="black"
                >
                  5.9%{" "}
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography component="div">
                <Box
                  // fontWeight="fontWeightBold"
                  fontSize={20}
                  m={1}
                  textAlign="left"
                  color="black"
                >
                  Failed <MouseIcon className={classes.icon}></MouseIcon>
                </Box>
                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  fontSize={35}
                  textAlign="left"
                  color="black"
                >
                  5.9%{" "}
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography component="div">
                <Box fontSize={20} m={1} textAlign="left" color="black">
                  Read
                  <VisibilityIcon className={classes.icon}></VisibilityIcon>
                </Box>
                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  fontSize={35}
                  textAlign="left"
                  color="black"
                >
                  5.9%
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography component="div">
                <Box fontSize={20} m={1} textAlign="left" color="black">
                  Undelivered
                  <AttachMoneyIcon className={classes.icon}></AttachMoneyIcon>
                </Box>
                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  fontSize={35}
                  textAlign="left"
                  color="black"
                >
                  5.9%
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Paper className={classes.paper}>
              <Typography component="div">
                <Box m={1} fontSize={20} textAlign="left" color="black">
                  Received
                  <MonetizationOnIcon
                    className={classes.icon}
                  ></MonetizationOnIcon>
                </Box>
                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  fontSize={35}
                  textAlign="left"
                  color="black"
                >
                  5.9%
                </Box>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            
          </Grid>
          {this.state.isLoading && <Loader type="full-screen" />}
        </Grid>
        <DataGrid
              className={classes.root}
              rows={this.props.SMSLogsList}
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
            />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAllMessageList,
};
const mapStateToProps = (state) => {
  return {
    SMSLogsList: state.messageLogs.smsLogsDataList,
    profileData: state.login.loginData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(MessageLogsPage)
);
