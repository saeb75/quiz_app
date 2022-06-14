const Application = require("./src/app");
const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/quiz_app_mvp";

new Application(DB_URL, PORT);
