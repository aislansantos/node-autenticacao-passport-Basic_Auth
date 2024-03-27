import { Router } from "express";
import * as ApiController from "../controller/api.Controller";


const router = Router();

router.get("/ping", ApiController.ping);

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.get("/list", ApiController.list);

export default router;