import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { GraduationCap, Tv2 } from "lucide-react"; // assumed icons
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";


function StudentViewCommonHeader() {
  
  const {resetCrendentials}=useContext(AuthContext);
  const navigate=useNavigate();
  function handlelogout() {
    console.log("Logging out...");
    resetCrendentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Left Logo */}
      <Link to="/home" className="flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <span className="text-xl font-extrabold text-gray-800">InstruLearn</span>
      </Link>

      {/* Center Nav */}
      <div className="flex items-center gap-6">
        <Button onClick={()=> navigate('/courses')} variant="ghost" className="text-sm hover:text-blue-600">
          Explore Courses
        </Button>
        <Link to="/student-courses" className="flex items-center gap-2 text-sm hover:text-blue-600">
          <span >My Courses</span>
          <Tv2 className="w-5 h-5" />
        </Link>
      </div>

      {/* Right Actions */}
      <div>
        <Button onClick={handlelogout} variant="outline" className="text-sm">
          Sign Out
        </Button>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
