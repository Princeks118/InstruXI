import express from "express";
import { getAllstudentviewcourses, getstudentviewcoursesdetails } from "../../controllers/student-controller/course-controller.js";

const router=express.Router();

router.get('/get',getAllstudentviewcourses);
router.get('/get/details/:id',getstudentviewcoursesdetails);
export default router