import { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { courseCategories } from "../../../config";
import { StudentContext } from "../../../context/student-context";
import { fetchStudentViewCourseListService } from "../../../services";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentcourseslist, setstudentcourseslist } = useContext(StudentContext);
   const navigate=useNavigate();
  async function fetchallstudentviewcourses() {
    const response = await fetchStudentViewCourseListService();
    if (response.success) {
      setstudentcourseslist(response.data);
    }
  }
  
  function handlerdirecting(courseitem){
      // console.log("clicked");
      // console.log(courseitem);
      const courseid=courseitem._id;
      navigate(`/course/details/${courseid}`);

  }

  useEffect(() => {
    fetchallstudentviewcourses();
  }, []);

  return (
    <div className="px-6 py-10 space-y-10">
      <motion.section
        className="flex flex-col items-start gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:w-2/3">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-800">
            Learning that gets you in
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Skills for your present and future in electronics
          </p>
        </div>
      </motion.section>

      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold text-gray-700">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((category) => (
            <Button key={category.id} className="text-left w-full bg-blue-100 hover:bg-blue-200 text-blue-900">
              {category.label}
            </Button>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-gray-700">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentcourseslist && studentcourseslist.length > 0 ? (
            studentcourseslist.map((courseitem, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                onClick={()=>handlerdirecting(courseitem)}
              >
                <img
                  src={courseitem.image}
                  alt={courseitem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{courseitem.title}</h3>
                  <p className="text-sm text-gray-600">By {courseitem.instructorName}</p>
                  <p className="text-md font-bold text-blue-600">Rs. {courseitem.pricing}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No featured courses available.</p>
          )}
        </div>
      </motion.section>
    </div>
  );
}

export default StudentHomePage;
