import React from "react";
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:15
  },
  innerroot: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  innerpaper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor:"#F4F2FF"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function MiniDrawer() {
  const classes = useStyles();
  return (<div className={classes.root}>    
    <Grid container spacing={3}>        
    <Grid item xs={12}>
    <Typography variant="h5" component="h5" gutterBottom>
        Dashboard Overview
      </Typography>
      </Grid>          
      <Grid item xs={12}>
      <div className={classes.search}>
      <Box display="flex" justifyContent="flex-end">
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </Box>
          </div>
      </Grid>          

      <Grid item xs={4}>
        <Paper className={classes.paper}><Typography component="div">
        <Box fontWeight="fontWeightBold" m={1} textAlign="left" color="black">
        Today's Task
      </Box>
    </Typography>
        <div className={classes.innerroot}>
        <Paper className={classes.innerpaper}>
        <Grid container wrap="nowrap" spacing={4}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>Maureen Biologist</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.innerpaper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>Mark Ego</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.innerpaper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>John Doe</Typography>
          </Grid>
        </Grid>
      </Paper></div>
        {/* --------- */}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>  <Typography component="div">
        <Box fontWeight="fontWeightBold" m={1} textAlign="left" color="black">
        This week stats
      </Box>
    </Typography>
        {/* -----------------Inner Content Cell 2 --------------- */}
        <div className={classes.innerroot}>
        <Paper className={classes.innerpaper}>
        <Grid container wrap="nowrap" spacing={4}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>Maureen Biologist</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.innerpaper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>Mark Ego</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.innerpaper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>John Doe</Typography>
          </Grid>
        </Grid>
      </Paper></div>
      {/* ------------------------------------------ */}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
        <Typography component="div">
        <Box fontWeight="fontWeightBold" m={1} textAlign="left" color="black">
        Live Feed
      </Box> <div>
        <Box backgroundColor="#F6B44F">  
      hello
      <img src="LiveFeed.png"/>
</Box>
      </div>
      
    </Typography>
          {/* -----------------Inner Content Cell 3 --------------- */}
          <div className={classes.innerroot}>
     
        <Grid container wrap="nowrap" spacing={4}>
          <Grid item>
          <Card className={classes.innerpaper}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            JD
          </Avatar>
        }   style={{ textAlign: 'left' }}    
        title="John Doe"
        subheader="Just Now"
      />     
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
          </Grid>
         
        </Grid>
    
      
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Card className={classes.innerpaper}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            JD
          </Avatar>
        }   style={{ textAlign: 'left' }}    
        title="John Doe"
        subheader="Just Now"
      />     
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
          </Grid>
          
        </Grid>
      
      
      </div>
      {/* ------------------------------------------ */}
        </Paper>
           
      </Grid>
    </Grid>
  </div>);
}
