import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import {
  getDepartment,
  createDepartment,
  reset,
} from "./department/departmentSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

let formStyles = {
  width: "400px",
};

let containerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginLeft: "20px",
};

const Department = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { departments, isError, message } = useSelector(
    (state) => state.departments
  );

  // console.log(departments)

  const { employees } = useSelector((state) => state.employee);

  function employeeCount(depName) {
    let count = employees.filter((emp) => emp.department === depName);
    return count?.length;
  }

  const rows = [];

  departments.map((dep) =>
    rows.push({
      name: dep.name,
      email: dep.email,
      empCount: employeeCount(dep.name),
    })
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getDepartment());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const departmentData = {
      name,
      email,
    };

    console.log(departmentData);

    dispatch(createDepartment(departmentData));
    setName("");
    setEmail("");

    console.log("submit");
  };

  return (
    <div style={containerStyles}>
      <form style={formStyles} autoComplete="off" onSubmit={handleSubmit}>
        <h2>ADD DEPARTMENT</h2>
        <TextField
          label="Name"
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          color="success"
          type="text"
          sx={{ mb: 3 }}
          fullWidth
          value={name}
        />
        <TextField
          label="Manager Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="success"
          type="email"
          value={email}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="success" type="submit">
          ADD
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Manager Email</TableCell>
              <TableCell align="left">Employee Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell align="left">{row?.email}</TableCell>
                <TableCell align="left">{row?.empCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Department;
