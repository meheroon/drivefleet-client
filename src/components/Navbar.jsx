import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { Car } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);

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
    <div className="navbar bg-white shadow-sm sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow">
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

      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn-primary-custom">Login</Link>
        ) : (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co.com/8N7HkWY/user.png"}
                  alt={user.displayName || "User"}
                />
              </div>
            </button>
            <ul tabIndex={0} className="menu dropdown-content bg-white rounded-box z-50 mt-3 w-56 p-2 shadow">
              <li className="px-3 py-2 text-sm font-semibold">{user.displayName || "DriveFleet User"}</li>
              <li><Link to="/add-car">Add Car</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/my-added-cars">My Added Cars</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}