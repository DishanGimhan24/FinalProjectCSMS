const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
let Customer = require("../models/Customer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile"); // Save profile images to uploads/profile folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Route for adding a new customer
router.route("/add").post(upload.single("profileImage"), (req, res) => {
  const {
    name,
    age,
    type,
    address,
    password,
    drivingExperience,
    licenseYear,
  } = req.body;

  const profileImage = req.file ? req.file.filename : ""; // Get uploaded profile image filename

  const newCustomer = new Customer({
    name,
    age: Number(age),
    type,
    address,
    password,
    drivingExperience,
    licenseYear,
    profileImage, // Save profile image filename
  });

  newCustomer
    .save()
    .then(() => {
      res.json("Customer Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error adding customer");
    });
});

// Other routes and code...


router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {
    name,
    age,
    type,
    address,
    Password, // Assuming this is not updated here
    drivingExperience,
    licenseYear,
  } = req.body;

  const updateCustomer = {
    name,
    age,
    type,
    address,
    Password, // Assuming this is not updated here
    drivingExperience,
    licenseYear,
  };

  try {
    const updatedUser = await Customer.findByIdAndUpdate(userId, updateCustomer, { new: true });
    res.status(200).send({ status: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating user details:", err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});


router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Customer.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ STATUS: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  await Customer.findById(userId)
    .then((user) => {
      res.status(200).send({ status: "User fetched", user });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get data", error: err.message });
    });
});

router.route("/login").post(async (req, res) => {
  const { address, password } = req.body;

  try {
    const customer = await Customer.findOne({ address });

    if (!customer) {
      return res.status(400).json({ status: "error", message: "Invalid email or password" });
    }

    if (customer.Password !== password) {
      return res.status(400).json({ status: "error", message: "Invalid email or password" });
    }

    // Include the userId in the response
    res.json({ status: "success", message: "Login successful", userId: customer._id });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send({ status: "Error with login", error: err.message });
  }
});




module.exports = router;