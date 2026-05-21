import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = password => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
    return "";
  };

  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    setPasswordError("");

    try {
      await createUser(form.email.value, password);
      await updateUserProfile(form.name.value, form.photo.value);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
       toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" placeholder="Name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="photo" placeholder="Photo URL" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}

          <button className="btn-primary-custom w-full">Register</button>
        </form>

        <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
          Continue with Google
        </button>

        <p className="text-center mt-5">
          Already have an account? <Link to="/login" className="text-blue-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}