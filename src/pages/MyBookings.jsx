import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/bookings?email=${user.email}`)
        .then(res => setBookings(res.data))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="section-title">My Bookings</h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow mt-8">
        <table className="table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Total Price</th>
              <th>Driver Needed</th>
              <th>Booking Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td className="font-semibold">{booking.carName}</td>
                <td>${booking.totalPrice}</td>
                <td>{booking.driverNeeded}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.specialNote || "No note"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No bookings found.</p>
      )}
    </div>
  );
}