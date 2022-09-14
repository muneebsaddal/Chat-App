const { addMessage } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/addmessage/", addMessage);
// router.post("/getmsg/", getMessages);

module.exports = router;
