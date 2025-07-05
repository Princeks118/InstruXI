import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureAndFinalizePaymentService } from "../../../services";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  
  // For real PayPal flow
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  // For mock flow
  const orderIdFromURL = params.get("orderId");

  useEffect(() => {
    async function capturePayment() {
      const storedOrderId = sessionStorage.getItem("currentOrderId");
      const orderId = storedOrderId
        ? JSON.parse(storedOrderId)
        : orderIdFromURL;

      if (!orderId) return;

      const response = await captureAndFinalizePaymentService(
        paymentId || "mock_payment_id",
        payerId || "mock_payer_id",
        orderId
      );

      if (response?.success) {
        sessionStorage.removeItem("currentOrderId");
        navigate("/student-courses");
      }
    }

    capturePayment();
  }, [paymentId, payerId, orderIdFromURL]);

  return (
    <Card className="max-w-md mx-auto mt-20 text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
