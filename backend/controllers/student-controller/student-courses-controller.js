import { StudentCourses } from "../../models/StudentCourses.js";

export const getCoursesbystudentid = async (req, res) => {
  try {
    const { studentid } = req.params;

    if (!studentid) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const studentCourses = await StudentCourses.findOne({ userId: studentid });

    if (!studentCourses) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this student",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: studentCourses.courses,
    });

  } catch (error) {
    console.error("Error in fetching student courses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in student course controller",
    });
  }
};
