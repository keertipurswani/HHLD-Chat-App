//routes/msgs.route.js

import express from "express"
import getMsgsForConversation from "../controllers/msgs.controller.js";

const router = express.Router();

router.get('/', getMsgsForConversation);

export default router;
