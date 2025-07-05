import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CourseCurriculum from "../../components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "../../components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "../../components/instructor-view/courses/add-new-course/course-setting";
import { useContext, useEffect } from "react";
import { InstructorContext } from "../../context/instrcutor-context";
import { AuthContext } from "../../context/auth-context";
import { addNewCourseService, fetchInstructorCourseDetailsService, fetchInstructorCourseListService, updateCourseByIdService } from "../../services";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

function AddNewCourse() {
  const {courseLandingFormData, courseCurriculumFormData,
    setcourseLandingFormData,
    setcourseCurriculumFormData,
    currenteditedcourseid,
    setcurrenteditedcourseid,
  }=useContext(InstructorContext);
 const params=useParams();
 console.log(params);
  const {auth}=useContext(AuthContext);
  const navigate=useNavigate();
  function isEmpty(value){
     if(Array.isArray(value)){
      return value.length===0
     }
     return value==="" || value===null || value===undefined
  }
  function validateformdata(){
     for(const key in courseLandingFormData){
       if(isEmpty(courseLandingFormData[key])) return false
     }
     let haspreview=false;
     for(const item of courseCurriculumFormData){
       if(isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)) return false;
       if(item.freePreview) haspreview=true
        
      }
      return haspreview
  }
async function fetchcurrentcoursdeatil() {
  const response = await fetchInstructorCourseDetailsService(currenteditedcourseid);
  console.log(response);
  if (response.success) {
    const updatedFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
      acc[key] = response.data[key] || courseLandingInitialFormData[key];
      return acc; 
     
    }, {});
   setcourseLandingFormData(updatedFormData);
   setcourseCurriculumFormData(response.data.curriculum);
  }
}

  useEffect(()=>{
       if(currenteditedcourseid!==null){
          fetchcurrentcoursdeatil();
       }
  },[currenteditedcourseid])
  useEffect(()=>{
     if(params?.courseid){
      setcurrenteditedcourseid(params.courseid)
     }
  },[params?.courseid])

  async function handleaddcourse(){

      const coursefinalformdata={
          instructorId:auth.user._id,
          instructorName:auth.user.userName,
          date:new Date(),
          ...courseLandingFormData,
          students:[],
          isPublised:true,
          curriculum:courseCurriculumFormData
      }
      
      console.log(coursefinalformdata);
      const respose= currenteditedcourseid!==null ? await updateCourseByIdService(currenteditedcourseid,coursefinalformdata):
      await addNewCourseService(coursefinalformdata);
      if(respose.success){
          setcourseLandingFormData(courseLandingInitialFormData);
          setcourseCurriculumFormData(courseCurriculumInitialFormData);
          navigate(-1);
      }
  }
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Create a New Course
        </h1>
        <Button onClick={handleaddcourse} disabled={!validateformdata()} className="px-6 py-2 text-sm font-semibold">Submit</Button>
      </div>

      {/* Card Wrapper */}
      <Card className="shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Course Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <Tabs defaultValue="curriculum" className="w-full space-y-6">
            {/* Tabs List */}
            <TabsList className="grid grid-cols-3 gap-2 w-full">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="course-landing-page">
                Course Landing Page
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="curriculum">
              <CourseCurriculum />
            </TabsContent>

            <TabsContent value="course-landing-page">
              <CourseLanding />
            </TabsContent>

            <TabsContent value="settings">
              <CourseSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCourse;
