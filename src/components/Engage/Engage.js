import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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
  
class EngagePage extends React.Component {
  
  
    render() {

      return (
        <Container component="main">
          <div className="mb-5">
            <Typography variant="h6" gutterBottom>
              Engage
            </Typography>
           
          </div>
         
        </Container>
      );
    }
  }
  
  export default withStyles(styles, { withTheme: true })(
    EngagePage
  );