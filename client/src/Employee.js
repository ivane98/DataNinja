import React, { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEmployee, createEmployee, reset } from "./employee/employeeSlice";

let formStyles = {
  width: "400px",
};

let containerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginLeft: "20px",
  marginBottom: "20px",
};

const Employee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState(0);
  const [department, setDep] = useState("hr");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { departments } = useSelector((state) => state.departments);

  const { employees } = useSelector((state) => state.employee);

  const rows = [];

  function getManagerEmail(employeeDep) {
    let mail = departments.find((dep) => dep.name === employeeDep);
    return mail?.email;
  }

  employees.map((emp) =>
    rows.push({
      name: emp.name,
      email: emp.email,
      salary: emp.salary,
      department: emp.department,
      depManager: getManagerEmail(emp.department),
    })
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getEmployee());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const employeeData = {
      name,
      email,
      salary,
      department,
    };

    console.log(employeeData);

    dispatch(createEmployee(employeeData));
    setName("");
    setEmail("");
    setSalary(0);
    setDep("");

    console.log("submit");
  };

  const deps = [];

  departments.map((dep) =>
    deps.push({
      value: dep.name,
      label: dep.name.toUpperCase(),
    })
  );

  if (!user || !departments || !employees) {
    return <h1>Loading data</h1>;
  }

  return (
    <div style={containerStyles}>
      <form style={formStyles} autoComplete="off" onSubmit={handleSubmit}>
        <h2>ADD AN EMPLOYEE</h2>
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
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          color="success"
          type="email"
          value={email}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Salary"
          onChange={(e) => setSalary(e.target.value)}
          required
          variant="outlined"
          color="success"
          type="number"
          value={salary}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          id="outlined-select-currency"
          select
          onChange={(e) => setDep(e.target.value)}
          required
          color="success"
          value={department}
          label="Select"
          defaultValue="hr"
          helperText="Please select your Department"
        >
          {deps.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          style={{ display: "block" }}
          variant="outlined"
          color="success"
          type="submit"
        >
          ADD
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Manager Email</TableCell>
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
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.salary}</TableCell>
                <TableCell align="right">{row?.department}</TableCell>
                <TableCell align="right">{row?.depManager}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Employee;
