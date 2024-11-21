import express from "express";
import dbConnection from "./config/db.js";
import mysql from "mysql";
import routes from "../source/routes/index.js"
import session from "express-session";
import  passport  from "passport";
import passportConfig from "./config/passport.js"
import swaggerDocs from "../swagger.js";

import "dotenv/config";
const app = express();
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );

  // Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);  // You can log the error here for debugging

    // Send a generic response to the client
    res.status(500).json({
        result: false,
        message: err.message || 'Internal Server Error',
    });
});
// Initialize Passport

// passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());


const connection = mysql.createConnection(dbConnection); 
global.connection = connection;
connection.connect((error) => {
    if (error) {
        console.log("Error connecting to the database: " + error.stack);
        return;
    }
console.log("Connected to the database with connection ID " + connection.threadId);

});

const port = process.env.PORT || 8000;
app.listen(port, () => {
swaggerDocs(app, port)
console.log(`Server running on port ${port}`);
});