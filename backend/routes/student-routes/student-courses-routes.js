
import express from "express";
import { getCoursesbystudentid } from "../../controllers/student-controller/student-courses-controller.js";

const router=express.Router();

router.get("/get/:studentid",getCoursesbystudentid);

export default router