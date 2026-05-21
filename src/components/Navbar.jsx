import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { Car, Moon, Sun, Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../providers/ThemeProvider";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/explore-cars">Explore Cars</NavLink></li>
      {user && <li><NavLink to="/add-car">Add Car</NavLink></li>}
      {user && <li><NavLink to="/my-bookings">My Bookings</NavLink></li>}
    </>
  );

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="navbar bg-base-100 text-base-content px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden text-base-content">
            <Menu size={22} />
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-50 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Car />
          DriveFleet
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
        onClick={toggleTheme}
        className="btn btn-circle btn-sm bg-base-200 text-base-content border border-base-300 shadow"
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </motion.button>

        {!user ? (
          <Link to="/login" className="btn-primary-custom">Login</Link>
        ) : (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?name=DriveFleet+User&background=2563eb&color=ffffff"
                  }
                  alt={user.displayName || "User"}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://ui-avatars.com/api/?name=User&background=2563eb&color=ffffff";
                  }}
                />
              </div>
            </button>

            <ul tabIndex={0} className="menu dropdown-content bg-base-100 text-base-content rounded-box z-50 mt-3 w-56 p-2 shadow">
              <li className="px-3 py-2 text-sm font-semibold">
                {user.displayName || "DriveFleet User"}
              </li>
              <li><Link to="/add-car">Add Car</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/my-added-cars">My Added Cars</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}