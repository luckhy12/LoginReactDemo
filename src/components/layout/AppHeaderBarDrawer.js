import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LinkIcon from "@material-ui/icons/Link";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link } from "react-router-dom";
import { logout } from "../../services/UserService";
import { connect } from "react-redux";
import Collapse from "@material-ui/core/Collapse";

import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarDivs: {
    padding: "10px",
  },
  linkText: {
    color: "white",
  },
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#fff",
    color: "#9BA3B9",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#7D86A9",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "linear-gradient(45deg, #0C1121 30%,  #C40B6C 90%)",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "linear-gradient(45deg, #0C1121 30%,  #C40B6C 90%)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    float: "right",
  },
  active: {
    background: "#117A8B !important",
  },
}));

const MiniDrawer = function (props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [adminOpen, setAdminOpen] = React.useState(false);
  const [templateOpen, setTemplateOpen] = React.useState(false);
  const [selectedNav, setSelectedNav] = React.useState("Dashboard");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpenSettingmenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    localStorage.clear();
    props.logout();
    handleClose();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setAdminOpen(false);
    setTemplateOpen(false);
  };

  function handleAdminClick() {
    setAdminOpen(!adminOpen);
  }

  function handleTemplateClick() {
    setTemplateOpen(!templateOpen);
  }

  const { profileData } = props;
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}></div>
          <Box borderRight={1} className={classes.appBarDivs}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <LinkIcon />
            </IconButton>{" "}
            Quick Links{" "}
          </Box>
          <Box borderRight={1} className={classes.appBarDivs}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>{" "}
            Notifications{" "}
          </Box>
          <Box display="flex" className={classes.appBarDivs}>
            <Avatar src="Oval.png" />
            <div style={{ padding: "10px" }}>
              Hello {profileData.firstName} {profileData.lastName}
            </div>
          </Box>
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <SettingsIcon className={classes.linkText} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={isOpenSettingmenu}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 20 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem key={"change_password"} onClick={handleClose}>
                <Link to="/change-password">{"Change Password"}</Link>
              </MenuItem>
              <MenuItem key={"logout"} onClick={onClickLogout}>
                {"Logout"}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src="Logo.png" alt="" />
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            style={{ color: "#fff", padding: "20px", marginTop: "15px" }}
          >
            DialSight
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon className={classes.linkText} />
            ) : (
              <ChevronLeftIcon className={classes.linkText} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/dashboard">
            <ListItem
              button
              key={"Dashboard"}
              onClick={(e) => setSelectedNav("Dashboard")}
              selected={selectedNav === "Dashboard"}
              title="Dashboard"
              classes={{ selected: classes.active }}
            >
              <ListItemIcon>
                <HomeIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                className={classes.linkText}
              />
            </ListItem>
          </Link>
          <Link to="/engage">
            <ListItem
              button
              key={"Engage"}
              onClick={(e) => setSelectedNav("Engage")}
              selected={selectedNav === "Engage"}
              title="Engage"
              classes={{ selected: classes.active }}
            >
              <ListItemIcon>
                <PhoneInTalkIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText primary={"Engage"} className={classes.linkText} />
            </ListItem>
          </Link>
          <Link>
            <ListItem
              button
              key={"Templates"}
              onClick={handleTemplateClick}
              title="Templates"
            >
              <ListItemIcon>
                <DashboardIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText
                primary={"Templates"}
                className={classes.linkText}
              />
              {templateOpen ? (
                <IconExpandLess className={classes.linkText} />
              ) : (
                <IconExpandMore className={classes.linkText} />
              )}
            </ListItem>
          </Link>
          <Collapse in={templateOpen} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <Link to="/email-template">
                <ListItem
                  button
                  key={"Email"}
                  onClick={(e) => setSelectedNav("Email")}
                  selected={selectedNav === "Email"}
                  title="Email"
                  classes={{ selected: classes.active }}
                >
                  <ListItemText
                    inset
                    primary={"Email"}
                    className={classes.linkText}
                  />
                </ListItem>
              </Link>
              <Link to="/sms-template">
                <ListItem
                  button
                  key={"SMS"}
                  onClick={(e) => setSelectedNav("SMS")}
                  selected={selectedNav === "SMS"}
                  title="SMS"
                  classes={{ selected: classes.active }}
                >
                  <ListItemText
                    inset
                    primary={"SMS"}
                    className={classes.linkText}
                  />
                </ListItem>
              </Link>
              <Link to="/script-template">
                <ListItem
                  button
                  key={"Script"}
                  onClick={(e) => setSelectedNav("Script")}
                  selected={selectedNav === "Script"}
                  title="Script"
                  classes={{ selected: classes.active }}
                >
                  <ListItemText
                    inset
                    primary={"Script"}
                    className={classes.linkText}
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Link to="/calendar">
            <ListItem
              button
              key={"Calendar"}
              onClick={(e) => setSelectedNav("Calendar")}
              selected={selectedNav === "Calendar"}
              title="Calendar"
              classes={{ selected: classes.active }}
            >
              <ListItemIcon>
                <DateRangeIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText primary={"Calendar"} className={classes.linkText} />
            </ListItem>
          </Link>
          <Link to="/reporting">
            <ListItem
              button
              key={"Reporting"}
              onClick={(e) => setSelectedNav("Reporting")}
              selected={selectedNav === "Reporting"}
              title="Reporting"
              classes={{ selected: classes.active }}
            >
              <ListItemIcon>
                <EqualizerIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText
                primary={"Reporting"}
                className={classes.linkText}
              />
            </ListItem>
          </Link>
          <Link to="/biling">
            <ListItem
              button
              key={"Biling"}
              onClick={(e) => setSelectedNav("Biling")}
              selected={selectedNav === "Biling"}
              title="Biling"
              classes={{ selected: classes.active }}
            >
              <ListItemIcon>
                <DescriptionOutlinedIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText primary={"Biling"} className={classes.linkText} />
            </ListItem>
          </Link>
          <Link>
            <ListItem
              button
              key={"Admin"}
              onClick={handleAdminClick}
              title="Admin"
            >
              <ListItemIcon>
                <PersonOutlineOutlinedIcon className={classes.linkText} />
              </ListItemIcon>
              <ListItemText primary={"Admin"} className={classes.linkText} />
              {adminOpen ? (
                <IconExpandLess className={classes.linkText} />
              ) : (
                <IconExpandMore className={classes.linkText} />
              )}
            </ListItem>
          </Link>
          <Collapse in={adminOpen} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <Link to="/user">
                <ListItem
                  button
                  key={"User"}
                  onClick={(e) => setSelectedNav("User")}
                  selected={selectedNav === "User"}
                  title="User"
                  classes={{ selected: classes.active }}
                >
                  <ListItemText
                    inset
                    primary={"User"}
                    className={classes.linkText}
                  />
                </ListItem>
              </Link>
              <Link to="/roles">
                <ListItem
                  button
                  key={"Roles"}
                  onClick={(e) => setSelectedNav("Roles")}
                  selected={selectedNav === "Roles"}
                  title="Roles"
                  classes={{ selected: classes.active }}
                >
                  <ListItemText
                    inset
                    primary={"Roles"}
                    className={classes.linkText}
                  />
                </ListItem>
              </Link>
              <Link to="/clients">
                <ListItem
                  button
                  key={"Clients"}
                  onClick={(e) => setSelectedNav("Clients")}
                  selected={selectedNav === "Clients"}
                  title="Clients"
                  classes={{ selected: classes.active }}
                >
                  <ListItemText
                    inset
                    primary={"Clients"}
                    className={classes.linkText}
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </div>
  );
};
const mapDispatchToProps = {
  logout,
};
const mapStateToProps = (state) => {
  return {
    profileData: state.login.loginData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniDrawer);
