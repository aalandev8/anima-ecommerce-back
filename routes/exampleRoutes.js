const express = require("express");
const router = express.Router();
const exampleController = require("../controllers/exampleController");

router.get("/", exampleController.index);
router.post("/", exampleController.store);
router.get("/:id", exampleController.show);
router.put("/:id", exampleController.update);
router.delete("/:id", exampleController.destroy);

module.exports = router;
