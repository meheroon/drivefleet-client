import { 
    Car, 
    // Facebook, 
    // Instagram 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <Car />
            DriveFleet
          </div>
          <p className="mt-3 text-slate-400">
            A modern car rental platform for finding, listing, and booking reliable vehicles.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Useful Links</h3>
          <div className="flex flex-col gap-2 text-slate-400">
            <Link to="/">Home</Link>
            <Link to="/explore-cars">Explore Cars</Link>
            <Link to="/add-car">Add Car</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Contact Information</h3>
          <p className="text-slate-400">Email: support@drivefleet.com</p>
          <p className="text-slate-400">Phone: +880 1700 000000</p>
          <p className="text-slate-400">Location: Dhaka, Bangladesh</p>

          <div className="flex gap-3 mt-4 font-bold">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>X</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-slate-500">
        © 2026 DriveFleet. All rights reserved.
      </div>
    </footer>
  );
}