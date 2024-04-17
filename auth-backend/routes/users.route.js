import express from "express"
import verifyToken from "../middleware/verifyToken.js";
import getUsers from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', verifyToken, getUsers);

export default router;