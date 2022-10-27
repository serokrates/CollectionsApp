const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
////////////////////////////

const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    // lokalnie
    // origin: `http://localhost:3000`,
    // heroku
    origin: `socialappmateusz.herokuapp.com`,
  },
});

//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit("connected");
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  socket.on("post_comment", (data) => {
    socket.broadcast.emit("receive_comment", data);
    console.log("🔥: data", data);
  });
  // socket.on("get_comments", () => {
  //   console.log("🔥: get comments");
  // });
});
/////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/collection", require("./routes/collectionRoutes"));
app.use("/api/item", require("./routes/itemRoutes"));
app.use("/api/comment", require("./routes/commentRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

http.listen(port, () => console.log(`Server started on port ${port}`));
