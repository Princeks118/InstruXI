import { useContext, useEffect } from "react";
import { StudentContext } from "../../../context/student-context";
import { fetchStudentBoughtCoursesService } from "../../../services";
import { AuthContext } from "../../../context/auth-context";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Watch } from "lucide-react";
import {useNavigate} from "react-router-dom";
function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const {
    studentbroughtcourseslist,
    setstudentbroughtcourseslist,
  } = useContext(StudentContext);

  async function fetchstudentbroughtcourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    console.log(response);
    if (response.success) {
      setstudentbroughtcourseslist(response.data);
    }
  }
  const navigate=useNavigate();
  useEffect(() => {
    fetchstudentbroughtcourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Your Purchased Courses</h1>

      {studentbroughtcourseslist && studentbroughtcourseslist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentbroughtcourseslist.map((course) => (
            <Card key={course.courseId} className="shadow-lg">
              <CardContent className="p-4 space-y-2">
                <img
                  src={course.courseImage}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.instructorName}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>navigate(`/course-progress/${course?.courseId}`)} className="w-full flex items-center gap-2">
                  <Watch className="w-4 h-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <h2 className="text-gray-500">No courses found.</h2>
      )}
    </div>
  );
}

export default StudentCoursesPage;
