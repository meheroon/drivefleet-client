import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-7xl font-bold text-blue-700">404</h1>
        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
        <p className="text-slate-500 mt-3">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary-custom inline-block mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
}