import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
} from "../../../components/ui/dropdown-menu";

import { Button } from "../../../components/ui/button";
import { useContext, useEffect, useState } from "react";
import { filterOptions, sortOptions } from "../../../config";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { StudentContext } from "../../../context/student-context";
import { fetchStudentViewCourseListService } from "../../../services";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom"

function StudentViewCoursePage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const {
    studentcourseslist,
    setstudentcourseslist
  } = useContext(StudentContext);
  const [searchParams,setSearchParams]=useSearchParams();


  function handleFilterChange(category, optionId) {
    setFilters((prev) => {
      const selected = prev[category] || [];
      const updated = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId];
      return { ...prev, [category]: updated };
    });
  }
function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(paramValue)}`);
    } else if (typeof value === 'string' || typeof value === 'number') {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return queryParams.join('&');
}

  useEffect(()=>{
     const buildquerystringforfilter=createSearchParamsHelper(filters);
     setSearchParams(new URLSearchParams(buildquerystringforfilter));
  },[filters])

  async function fetchallstudentviewcourses() {
    const response = await fetchStudentViewCourseListService();
    if (response.success) {
      setstudentcourseslist(response.data);
    }
  }

  useEffect(() => {
    fetchallstudentviewcourses();
  }, []);

  // 🔽 Filter Logic
  const filteredCourses = studentcourseslist?.filter((course) => {
    for (let category in filters) {
      if (
        filters[category].length > 0 &&
        !filters[category].includes(course[category])
      ) {
        return false;
      }
    }
    return true;
  });

  // 🔽 Sort Logic
  const sortedCourses = [...(filteredCourses || [])].sort((a, b) => {
    if (sort === "price-lowtohigh") return a.pricing - b.pricing;
    if (sort === "price-hightolow") return b.pricing - a.pricing;
    return 0;
  });
 const navigate=useNavigate();
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 p-4 space-y-6 border-r">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem}>
            <h3 className="text-lg font-semibold mb-2">{keyItem.toUpperCase()}</h3>
            <div className="grid gap-2">
              {filterOptions[keyItem].map((option) => (
                <Label className="flex items-center gap-2" key={option.id}>
                  <Checkbox
                    checked={filters[keyItem]?.includes(option.id) || false}
                    onCheckedChange={() => handleFilterChange(keyItem, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4">
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => setSort(value)}
              >
                {sortOptions.map((sortItem) => (
                  <DropdownMenuItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCourses && sortedCourses.length > 0 ? (
            sortedCourses.map((courseitem) => (
              <Card onClick={()=>navigate(`/course/details/${courseitem._id}`)} key={courseitem._id} className="hover:shadow-lg">
                <CardContent className="p-4 space-y-3">
                  <div className="w-full h-40 overflow-hidden rounded-md">
                    <img
                      src={courseitem.image}
                      alt={courseitem.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{courseitem.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      By {courseitem.instructorName}
                    </p>
                    <p className="text-sm">Level: {courseitem.level}</p>
                    <p className="font-semibold">₹{courseitem.pricing}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentViewCoursePage;
