import { createContext, useState } from "react";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "../../config";

export const InstructorContext=createContext(null);

export default function InstructorProvider({children}){

    const [courseLandingFormData,setcourseLandingFormData]=useState(courseLandingInitialFormData);
    const [courseCurriculumFormData,setcourseCurriculumFormData]=useState(courseCurriculumInitialFormData);
    const [mediaUplaodprogress,setmediaUplaodProgress]=useState(false);
    const [mediaUploadProgressPercentage,setmediaUploadProgressPercentage]=useState(0);
    const [instructorcourseslist,setinstructorcourseslist]=useState([]);
    const [currenteditedcourseid,setcurrenteditedcourseid]=useState(null);
      return (
        <InstructorContext.Provider value={{
            courseLandingFormData,
            setcourseLandingFormData,
            courseCurriculumFormData,
            setcourseCurriculumFormData,
            mediaUplaodprogress,
            setmediaUplaodProgress,
            mediaUploadProgressPercentage,
            setmediaUploadProgressPercentage,
            instructorcourseslist,
            setinstructorcourseslist, 
            currenteditedcourseid,
            setcurrenteditedcourseid
        }}>
            {children}
        </InstructorContext.Provider>
      )
}