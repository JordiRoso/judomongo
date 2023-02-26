const mongoose = require("mongoose");
const User = require("../models/user");

mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const users = [
      {
        name: "maestro",
        email: "maestro@plisplas.com",
        password: "123456",
        role: "user",
      },
      {
        name: "admin",
        email: "admin@plisplas.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "superadmin",
        email: "superadmin@plisplas.com",
        password: "123456",
        role: "superadmin",
      },
    ];

    User.insertMany(users)
      .then(() => {
        console.log("Users added successfully");
        mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
