import express from "express";
import { body } from "express-validator";
import * as controller from "../controllers/algorandController.js";

const router = express.Router();

router.post(
  "/send",
  [
    body("to").isString().notEmpty(),
    body("amount").isFloat({ gt: 0 }),
    body("mnemonic").isString().notEmpty()
  ],
  controller.send
);

router.get("/status/:txId", controller.status);
router.get("/transactions", controller.transactions);

export default router;
