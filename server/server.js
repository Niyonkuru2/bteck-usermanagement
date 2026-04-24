import app from "./app.js";
import { initKeys } from "./src/services/crypto.service.js";
import { initDB } from "./src/config/db.js";
import { setDB } from "./src/controllers/user.controller.js";
import { initPassport } from "./src/config/passport.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  initKeys();

  const db = await initDB();
  setDB(db);

  initPassport(db);

  app.get('/',(req,res)=>{
      res.send("Express server is running")
  })

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();