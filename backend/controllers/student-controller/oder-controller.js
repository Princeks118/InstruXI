import { Course } from "../../models/Course.js";
import { Order } from "../../models/Order.js";
import { StudentCourses } from "../../models/StudentCourses.js";

// Create order and simulate "PayPal approval URL"
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const orderDate = new Date();

    const newlyCreatedCourseOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "unpaid",
      orderDate,
      paymentId: "mock_payment_id",
      payerId: "mock_payer_id",
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    await newlyCreatedCourseOrder.save();

    // Simulated approval URL (just redirect to frontend success page)
    return res.status(201).json({
      success: true,
      data: {
        approveUrl: `${process.env.FRONTEND_URL}/student-courses`,
        orderId: newlyCreatedCourseOrder._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error while creating order!",
    });
  }
};

// Simulate capturing payment and finalizing order
export const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = "mock_payment_id";
    order.payerId = "mock_payer_id";

    await order.save();

    const courseDetails = {
      courseId: order.courseId,
      title: order.courseTitle,
      instructorId: order.instructorId,
      instructorName: order.instructorName,
      dateOfPurchase: order.orderDate,
      courseImage: order.courseImage,
    };

    const existingCourses = await StudentCourses.findOne({ userId: order.userId });

    if (existingCourses) {
      existingCourses.courses.push(courseDetails);
      await existingCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [courseDetails],
      });
      await newStudentCourses.save();
    }
    console.log("heelo");
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Mock order confirmed and stored successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
