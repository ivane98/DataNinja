require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./models/employeeSchema");
const Department = require("./models/departmentSchema");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const admin = {
  username: "admin",
  password: "admin",
};

app.post("/login", async (req, res) => {
  try {
    if (
      req.body.password == admin.password &&
      req.body.username == admin.username
    ) {
      const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/employees", authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const employee = await Employee.findByIdAndUpdate(id, req.body);

    if (!employee) {
      return res
        .status(404)
        .json({ message: `cannot find any employee with ID ${id}` });
    }
    const updatedEmployee = await Employee.findById(id);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res
        .status(404)
        .json({ message: `cannot find any employee with ID ${id}` });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///departments

app.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/departments", async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const department = await Department.findByIdAndUpdate(id, req.body);

    if (!department) {
      return res
        .status(404)
        .json({ message: `cannot find any department with ID ${id}` });
    }
    const updatedDepartment = await Department.findById(id);
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res
        .status(404)
        .json({ message: `cannot find any department with ID ${id}` });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(4000, () => {
      console.log(`app is running on port 4000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
