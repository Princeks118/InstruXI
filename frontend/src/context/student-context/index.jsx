import { createContext, useState } from "react";

export const  StudentContext=createContext(null);

export default function StudentProvider({children}){
    const [studentcourseslist,setstudentcourseslist]=useState([]);
    const [studentviewcoursedetail,setstudentviewcoursedetail]=useState(null);
    const [currentcoursedetailid,setcurrentcoursedetailid]=useState(null);
    const [studentbroughtcourseslist,setstudentbroughtcourseslist]=useState([]);
    const [studentCurrentCourseProgress, setStudentCurrentCourseProgress]=useState({});
      return (
        <StudentContext.Provider value={{
            studentcourseslist,
            setstudentcourseslist,
            studentviewcoursedetail,
            setstudentviewcoursedetail,
            currentcoursedetailid,
              setcurrentcoursedetailid,
              studentbroughtcourseslist,
              setstudentbroughtcourseslist,
             studentCurrentCourseProgress,
              setStudentCurrentCourseProgress
        }}>
            {children}
        </StudentContext.Provider>
      )
}