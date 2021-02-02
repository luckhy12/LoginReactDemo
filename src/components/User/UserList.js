import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import { registerUser } from "../../services/UserService";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

class UserList extends React.Component {
  state = {
    reg_data: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      clientName: "",
      phoneNumber: "",
      phoneNumberType: "",
      registerationDate: new Date(),
      role: "",
    },
  };

  handleChange = async (e) => {
    let { name, value } = e.target;
    await this.setState((prevState) => {
      const reg_data = { ...prevState.reg_data };
      reg_data[name] = value;
      return { reg_data };
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.registerUser(
      this.state.reg_data,
      (res) => {
        this.props.history.push("/details");
      },
      (err) => {
        NotificationManager.error(err);
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main">
        <div style={{ height: 400, width: "100%" }}>
          <Typography variant="h4" gutterBottom>
           Users
          </Typography>
          <Toolbar>
            <Button variant="contained" color="primary">
              Add
            </Button>
          </Toolbar>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  registerUser,
};
const mapStateToProps = (state) => {
  return {
    data: state.user.usersListData,
  };
};
export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(UserList)
);
