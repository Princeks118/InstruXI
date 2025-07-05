import { Course } from "../../models/Course.js";
import { StudentCourses } from "../../models/StudentCourses.js";


export const getAllstudentviewcourses = async (req, res) => {
  try {
    const {cateogory=[],level=[],primaryLanguage=[],sortBy="price-lowtohigh"}=req.query;
    let filters={}
    if(cateogory.length){
      filters.cateogory={$in:cateogory.split(',')}
    }
    if(level.length){
      filters.length={$in:cateogory.split(',')}
    }
    if(primaryLanguage.length){
      filters.primaryLanguage={$in:cateogory.split(',')}
    }
    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }
    const courseslist = await Course.find(filters).sort(sortParam);
    if (courseslist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No course found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courseslist,
    });
  } catch (error) {
    console.error("Error in getting all student courses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching courses",
    });
  }
};

// GET course details by ID for student
export const getstudentviewcoursesdetails = async (req, res) => {
  try {
    const { id } = req.params;
    const coursedetail = await Course.findById(id);

    if (!coursedetail) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
        data: null,
      });
    }
    // if the current student purschaed this course ornnot
   
    
    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: coursedetail,
    });
  } catch (error) {
    console.error("Error in getting course detail:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching course detail",
    });
  }
};


