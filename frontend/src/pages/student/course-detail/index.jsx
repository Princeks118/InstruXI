import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../../context/student-context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createPaymentService,
  fetchStudentBoughtCoursesService,
  fetchStudentViewCourseDetailsService,
} from "../../../services";
import { Skeleton } from "../../../components/ui/skeleton";
import { motion } from "framer-motion";
import { Videoplayer } from "../../../components/video-player/videoplayer";
import { Button } from "../../../components/ui/button";
import { AuthContext } from "../../../context/auth-context";

function StudentViewCourseDetailPage() {
  const {
    studentviewcoursedetail,
    setstudentviewcoursedetail,
    currentcoursedetailid,
    setcurrentcoursedetailid,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const [approvalurl, setapprovalurl] = useState("");
  const [hasBought, sethasBought] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) setcurrentcoursedetailid(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("/course/details")) {
      setstudentviewcoursedetail(null);
      setcurrentcoursedetailid(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    async function checkIfAlreadyBought() {
      if (!auth?.user?._id || !currentcoursedetailid) return;

      const boughtRes = await fetchStudentBoughtCoursesService(auth.user._id);
      if (boughtRes.success && boughtRes.data?.length > 0) {
        const alreadyBought = boughtRes.data.some(
          (course) => course.courseId === currentcoursedetailid
        );
        sethasBought(alreadyBought);
      }
    }

    checkIfAlreadyBought();
  }, [auth?.user?._id, currentcoursedetailid]);

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentviewcoursedetail?.instructorId,
      instructorName: studentviewcoursedetail?.instructorName,
      courseImage: studentviewcoursedetail?.image,
      courseTitle: studentviewcoursedetail?.title,
      courseId: studentviewcoursedetail?._id,
      coursePricing: studentviewcoursedetail?.pricing,
    };

    const response = await createPaymentService(paymentPayload);
    if (response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response.data.orderId)
      );
      setapprovalurl(response.data.approveUrl);
    }
  }

  async function fetchStudentViewCourseDetail() {
    const response = await fetchStudentViewCourseDetailsService(
      currentcoursedetailid
    );
    if (response.success) {
      setstudentviewcoursedetail(response.data);
      setloading(false);
    }
  }
  const navigate=useNavigate();

  useEffect(() => {
    if (currentcoursedetailid !== null) fetchStudentViewCourseDetail();
  }, [currentcoursedetailid]);

  if (approvalurl !== "") {
    window.location.href = approvalurl;
  }

  if (loading) return <Skeleton className="w-full h-96" />;

  const {
    title,
    subtitle,
    instructorName,
    description,
    objectives,
    welcomeMessage,
    pricing,
    image,
    level,
    primaryLanguage,
    category,
    curriculum,
  } = studentviewcoursedetail;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 lg:p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
            <p className="text-xl text-gray-600">{subtitle}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span><strong className="text-black">Instructor:</strong> {instructorName}</span>
              <span><strong className="text-black">Level:</strong> {level}</span>
              <span><strong className="text-black">Language:</strong> {primaryLanguage}</span>
              <span><strong className="text-black">Category:</strong> {category}</span>
            </div>
            <p className="text-lg text-green-700 font-semibold">Price: ₹{pricing}</p>
            <p className="italic text-sm text-gray-500">Welcome message: {welcomeMessage}</p>
          </div>

          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full rounded-lg shadow-xl aspect-video object-cover border border-gray-200"
            />
            <div className="mt-6 bg-white rounded-lg p-6 shadow-md border space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-800">₹{pricing}</span>
              </div>

              {hasBought ? (
                <Button
                  onClick={() => {
                     navigate(`/course-progress/${studentviewcoursedetail?._id}`)
                  }}
                  className="w-full text-lg font-semibold py-6 bg-green-600 hover:bg-green-700"
                >
                  Start Learning
                </Button>
              ) : (
                <Button
                  onClick={handleCreatePayment}
                  className="w-full text-lg font-semibold py-6"
                >
                  Buy Now
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Course Description</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">What you'll learn</h2>
          <p className="text-gray-700 leading-relaxed">{objectives}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Free Preview Lectures</h2>
          {curriculum && curriculum.filter(item => item.freePreview).length > 0 ? (
            <div className="space-y-6">
              {curriculum
                .filter((item) => item.freePreview)
                .map((item, index) => (
                  <div
                    key={item._id}
                    className="border p-4 rounded-lg shadow bg-white"
                  >
                    <h3 className="text-lg font-medium mb-2">
                      Lecture {index + 1}: {item.title}
                    </h3>
                    <div className="aspect-video rounded overflow-hidden border">
                      <Videoplayer url={item.videoUrl} />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No free preview lectures available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default StudentViewCourseDetailPage;
