import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import RouteGuard from "./components/route-gaurd";
import AuthPage from "./pages/auth";
import InstructorDashboard from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotfoundPage from "./pages/not-found";
import AddNewCourse from "./pages/instructor/add-new-course";
import StudentViewCorusePage from "./pages/student/courses";
import StudentViewCourseDetailPage from "./pages/student/course-detail";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentVirwCourseProgresspage from "./pages/student/course-progress";


function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Auth Route */}
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }
      />

      {/* Instructor Route */}
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboard />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }

      />
        <Route
        path="/instructor/edit-course/:courseid"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }
        />
      {/* Student Layout with nested routes */}
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth.authenticate}
            user={auth.user}
          />
        }
      >
        <Route index element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCorusePage />} />
        <Route path="course/details/:id" element={<StudentViewCourseDetailPage />} />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
         <Route path="course-progress/:id" element={<StudentVirwCourseProgresspage />} />
      </Route>
      <Route path="*" element={<NotfoundPage/>}/>
    </Routes>
  );
}

export default App;
