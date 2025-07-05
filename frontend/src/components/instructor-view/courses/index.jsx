import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useContext } from "react";
import { InstructorContext } from "../../../context/instrcutor-context";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "../../../config";

function InstructorCourses({listofcourses}) {
  const navigate = useNavigate();
  const {currenteditedcourseid,
        setcurrenteditedcourseid,
        setcourseLandingFormData,
        setcourseCurriculumFormData,
      }=useContext(InstructorContext);
  

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-3xl font-extrabold">
          All Courses
        </CardTitle>
        <Button
          onClick={() => {
            setcurrenteditedcourseid(null);
            navigate("/instructor/create-new-course")
            setcourseLandingFormData(courseLandingInitialFormData)
            setcourseCurriculumFormData(courseCurriculumInitialFormData)
          }}
          className="px-5"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of your published courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Course Name</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              listofcourses && listofcourses.length>0 ?
              listofcourses.map(course=>
            <TableRow>
              <TableCell className="font-medium">
                {course.title}
              </TableCell>
              <TableCell>{course.students.length}</TableCell>
              <TableCell>{course.pricing}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={()=>{
                  
                  navigate(`/instructor/edit-course/${course?._id}`)
                }} variant="ghost" size="sm">
                  <Edit  className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
              ):null
            }

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
