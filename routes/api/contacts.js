const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();
router.get("/", ctrl.listContacts);

// router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

module.exports = router;
