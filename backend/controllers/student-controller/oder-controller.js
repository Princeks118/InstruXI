import { Course } from "../../models/Course.js";
import { Order } from "../../models/Order.js";
import { StudentCourses } from "../../models/StudentCourses.js";

// ==========================
// 1. CREATE ORDER
// ==========================
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
      paymentId: "mock_payment_id", // simulate for now
      payerId: "mock_payer_id",
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    await newlyCreatedCourseOrder.save();

    // Simulated approval URL
    return res.status(201).json({
      success: true,
      data: {
        approveUrl: `${process.env.FRONTEND_URL}/payment-return?orderId=${newlyCreatedCourseOrder._id}`,
        orderId: newlyCreatedCourseOrder._id,
      },
    });
  } catch (err) {
    console.error("Error while creating order:", err);
    return res.status(500).json({
      success: false,
      message: "Error while creating order!",
    });
  }
};

// ==========================
// 2. CAPTURE & FINALIZE ORDER
// ==========================
export const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update order status
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId || "mock_payment_id";
    order.payerId = payerId || "mock_payer_id";

    await order.save();

    const courseDetails = {
      courseId: order.courseId,
      title: order.courseTitle,
      instructorId: order.instructorId,
      instructorName: order.instructorName,
      dateOfPurchase: order.orderDate,
      courseImage: order.courseImage,
    };

    // Add course to StudentCourses model
    const existingCourses = await StudentCourses.findOne({ userId: order.userId });
    if (existingCourses) {
      const alreadyBought = existingCourses.courses.some(
        (c) => c.courseId.toString() === order.courseId.toString()
      );
      if (!alreadyBought) {
        existingCourses.courses.push(courseDetails);
        await existingCourses.save();
      }
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [courseDetails],
      });
      await newStudentCourses.save();
    }

    // Add student to the Course model's student list
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

    return res.status(200).json({
      success: true,
      message: "Order confirmed and course saved successfully",
      data: order,
    });
  } catch (err) {
    console.error("Error during payment finalization:", err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
