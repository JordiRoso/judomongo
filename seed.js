const mongoose = require("mongoose");
const competitionMenSeeder = require("./path/to/competitionMenSeed");
const competitionGirlSeeder = require("./path/to/competitionGirlSeed");
const userSeeder = require("./path/to/userSeed");

mongoose
  .connect("mongodb://localhost:27017/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    competitionMenSeeder();
    competitionGirlSeeder();
    userSeeder();

    console.log("Seeders executed successfully");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });
