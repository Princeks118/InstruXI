import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureAndFinalizePaymentService } from "../../../services";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const orderId = params.get("orderId");

  useEffect(() => {
    async function finalizePurchase() {
      if (!orderId) return;

      try {
        await captureAndFinalizePaymentService(
          "mock_payment_id",  // Skip PayPal
          "mock_payer_id",
          orderId
        );

        navigate("/home");
      } catch (error) {
        console.error("Payment finalization failed", error);
        // optionally show a toast or fallback message
        navigate("/home"); // fallback anyway
      }
    }

    finalizePurchase();
  }, [orderId, navigate]);

  return (
    <Card className="max-w-md mx-auto mt-20 text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
