import express from "express";
import { addNewcourse, getallcourse, getcourseDetailsbyid, updatecoursebyID } from "../../controllers/instructor-controller.js/course-controller.js";

const router=express.Router();

router.post("/add",addNewcourse);
router.get("/get",getallcourse);
router.get("/get/details/:id",getcourseDetailsbyid);
router.put("/update/:id",updatecoursebyID);
export default router