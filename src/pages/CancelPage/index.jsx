import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-4">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Canceled</h1>
      <p className="text-lg mb-6">
        Your payment was not completed. Please try again.
      </p>
      <Link
        to="/settings"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Return to Cart
      </Link>
    </div>
  );
};

export default CancelPage;
