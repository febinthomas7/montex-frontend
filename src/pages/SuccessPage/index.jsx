import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800 p-4">
      <h1 className="text-4xl font-bold mb-4">✅ Payment Successful!</h1>
      <p className="text-lg mb-6">
        Thank you for your purchase. Your order is confirmed.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
