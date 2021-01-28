import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Images from 'images_remote/App';
import Videos from 'videos_remote/App';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  let history = useHistory();

  const onClickLogout = () => {
      localStorage.clear();
      history.push("/")

  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button onClick={onClickLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className="Images__wrapper">
            <h1>Search for images</h1>
            <Images token={'887897987987978'} />
        </div>
        <div className="Videos__wrapper">
            <h1>Search for videos</h1>
            <Videos />
        </div>
    </div>
  );
}
