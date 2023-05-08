import express from "express";
import cors from "cors";
// require("dotenv")["config"]();
import chalk from "chalk";
const app = express();
app.use(express.urlencoded({ extended: true}));
import fs from 'fs';
app.use(express.json());
const PORT = process.env.PORT || 3500;
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



import { handler } from "./build/handler.js";
// import { handler } from "file://D:/projects/JTVServer github/WEB/build/handler.js";


if (!fs.existsSync("channel.db")) {
  fs["writeFileSync"]("./channel.db", '{"channel": {}}');
}

if (!fs.existsSync("channel-catchup.db")) {
  fs["writeFileSync"]("./channel-catchup.db", '{"channel": {}}');
}

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.use(cors());

import loginRoute from './routes/login.mjs';
import ipRoute from "./routes/ip.mjs";
import channelsRoute from "./routes/channel.mjs";
import playlistRoute from "./routes/playlist.mjs";
import catchulRoute from "./routes/catchup/index.mjs";

app.use("/", loginRoute);
app.use("/", ipRoute);
app.use("/", channelsRoute);
app.use("/", playlistRoute);
app.use("/catchup", catchulRoute);


// app.use(express.static(path.join(__dirname, "public")));

app.use(handler);

app.listen(PORT, () => {
    console.log("===================================================================");
    console.log(`Please open http://localhost:${PORT}/login to login and get playlist if running server for the first time`);
    // console.log(chalk.red("need to login every 24 hours even if you are already logged in"));
    console.log("If facing any errors, please login from portal again");
    console.log("you can use server m3u8 links in other websites and apps");
});
