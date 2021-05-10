import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import SendIcon from "@material-ui/icons/Send";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import MouseIcon from "@material-ui/icons/Mouse";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles_report = makeStyles((theme) => ({
  outerTitleIcons: {
    width: 15,
    height: 15,
    marginBottom: 3,
    marginLeft: 5,
  },
  root: {
    flexGrow: 1,
    padding: 15,
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
}));

function createData(name, emailSent, sales, conversions, delivery) {
  return { name, emailSent, sales, conversions, delivery };
}

const rows = [
  createData("Winter Sale", 567.0, "$180000", "67.00%", "67.00%"),
  createData("Summer Holiday", 67.0, "$18000", "67.00%", "67.00%"),
  createData("Black Friday", 567.0, "$180000", "67.00%", "67.00%"),
  createData("New Year Sale", 567.0, "$180000", "67.00%", "67.00%"),
  createData("Cyber Monday", 567.0, "$180000", "67.00%", "6.00%"),
  createData("Cyber Monday", 567.0, "$180000", "67.00%", "6.00%"),
  createData("Cyber Monday", 567.0, "$180000", "67.00%", "6.00%"),
  createData("Cyber Monday", 567.0, "$180000", "67.00%", "6.00%"),
  createData("Cyber Monday", 567.0, "$180000", "67.00%", "6.00%"),
  createData("Cyber Monday", 567.0, "$180000", "67.00%", "6.00%"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "compaign Name" },
  {
    id: "emailSent",
    numeric: true,
    disablePadding: false,
    label: "Email Sent",
  },
  { id: "sales", numeric: true, disablePadding: false, label: "Sales" },
  {
    id: "carbconversions",
    numeric: true,
    disablePadding: false,
    label: "Conversion Rate",
  },
  {
    id: "delivery",
    numeric: true,
    disablePadding: false,
    label: "Delivery Rate",
  },
];

function ReportHead(props) {
  const classes = useStyles_report();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            className={classes.heading}
          >
            Email optimization
          </Typography>
        </Grid>

        <Grid item lg={4} sm={6} xl={4} xs={12}>
          <Paper className={classes.paper}>
            <Typography component="div">
              <Box fontSize={20} m={1} textAlign="left" color="black">
                Email Sent
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
              <Box
          
                fontSize={20}
                m={1}
                textAlign="left"
                color="black"
              >
                Open Email{" "}
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
                Click Rate <MouseIcon className={classes.icon}></MouseIcon>
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
                Viewers
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
                Sales
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
                Conversions Rate
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
      </Grid>
    </div>
  );
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
    
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={classes.ttitle}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    
    marginLeft: 50,
    marginRight: 50,
  },
  paper: {
    width: "100%",
    
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    
  },
  table: {
    

    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  ttitle: {
    fontWeight:"bold"
  },
  pagination:{
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    width:"100%",
    backgroundColor:"#90abd6",
    
    
  }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("emailSent");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <ReportHead></ReportHead>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.emailSent}</TableCell>
                      <TableCell align="right">{row.sales}</TableCell>
                      <TableCell align="right">{row.conversions}</TableCell>
                      <TableCell align="right">{row.delivery}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
