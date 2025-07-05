import { Course } from "../../models/Course.js";

// CREATE a new course
export const addNewcourse = async (req, res) => {
  try {
    const coursedata = req.body;
    const newcreated = new Course(coursedata);
    await newcreated.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newcreated,
    });
  } catch (error) {
    console.error("Error in adding new course:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating course",
    });
  }
};

// READ all courses
export const getallcourse = async (req, res) => {
  try {
    const courselist = await Course.find({});
    return res.status(200).json({
      success: true,
      data: courselist,
    });
  } catch (error) {
    console.error("Error fetching all courses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching courses",
    });
  }
};

// READ course by ID
export const getcourseDetailsbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const coursedetail = await Course.findById(id);

    if (!coursedetail) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: coursedetail,
    });
  } catch (error) {
    console.error("Error fetching course by ID:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching course details",
    });
  }
};

// UPDATE course by ID
export const updatecoursebyID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating course",
    });
  }
};
