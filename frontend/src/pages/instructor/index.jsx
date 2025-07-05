import { useContext, useEffect, useState } from "react";
import InstructorCourses from "../../components/instructor-view/courses";
import InstructorDashboardPage from "../../components/instructor-view/dashboard";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Book, LogOut, BarChart } from "lucide-react";
import { AuthContext } from "../../context/auth-context";
import { InstructorContext } from "../../context/instrcutor-context";
import { fetchInstructorCourseListService } from "../../services";

function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const {resetCrendentials}=useContext(AuthContext);
  const {instructorcourseslist,setinstructorcourseslist}=useContext(InstructorContext);
  const {
    currenteditedcourseid,
    setcurrenteditedcourseid
  }=useContext(InstructorContext);
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboardPage />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses  listofcourses={instructorcourseslist} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    // Clear token, redirect, etc.
    console.log("Logging out...");
    resetCrendentials();
    sessionStorage.clear();

  }
  async function fetchallcourses(){
      const response=await fetchInstructorCourseListService();
      console.log(response);
      if(response.success){
         setinstructorcourseslist(response.data);
      }
  }
  useEffect(()=>{
   fetchallcourses();
  },[])

  return (
    <div className="flex min-h-screen bg-green-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <div className="text-2xl font-bold mb-4">Instructor View</div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Button
              key={item.value}
              variant={activeTab === item.value ? "default" : "outline"}
              onClick={
                item.value === "logout"
                  ? handleLogout
                  : () => setActiveTab(item.value)
              }
              className="flex items-center gap-2 justify-start"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {menuItems.map((item) => (
            <TabsContent key={item.value} value={item.value}>
              {item.component ?? null}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

export default InstructorDashboard;
