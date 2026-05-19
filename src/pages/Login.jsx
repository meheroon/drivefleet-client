import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  const handleLogin = async e => {
    e.preventDefault();

    try {
      await loginUser(e.target.email.value, e.target.password.value);
      toast.success("Login successful");
      navigate(from);
    } catch {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful");
      navigate("/");
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
          <button className="btn-primary-custom w-full">Login</button>
        </form>

        <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
          Continue with Google
        </button>

        <p className="text-center mt-5">
          New here? <Link to="/register" className="text-blue-700 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}