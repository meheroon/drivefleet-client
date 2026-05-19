import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then(res => setCar(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async e => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const form = e.target;

    const booking = {
      carId: car._id,
      carName: car.carName,
      image: car.image,
      totalPrice: Number(car.dailyRentPrice),
      driverNeeded: form.driverNeeded.value,
      specialNote: form.specialNote.value,
      userEmail: user.email,
      userName: user.displayName,
    };

    const res = await axiosSecure.post("/bookings", booking);

    if (res.data.insertedId) {
      toast.success("Booking successful");
      document.getElementById("booking_modal").close();
      form.reset();
    }
  };

  if (loading) return <Loading />;
  if (!car) return <p className="text-center py-10">Car not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow">
        <img src={car.image} alt={car.carName} className="w-full h-96 object-cover rounded-xl" />

        <div>
          <h2 className="text-4xl font-bold">{car.carName}</h2>
          <p className="mt-4 text-slate-600">{car.description}</p>

          <div className="mt-6 space-y-2">
            <p><b>Type:</b> {car.carType}</p>
            <p><b>Daily Rent:</b> ${car.dailyRentPrice}</p>
            <p><b>Seat Capacity:</b> {car.seatCapacity}</p>
            <p><b>Pickup Location:</b> {car.pickupLocation}</p>
            <p><b>Availability:</b> {car.availability}</p>
            <p><b>Total Bookings:</b> {car.booking_count || 0}</p>
          </div>

          {user ? (
            <button
              onClick={() => document.getElementById("booking_modal").showModal()}
              className="btn-primary-custom mt-6"
            >
              Book Now
            </button>
          ) : (
            <Link to="/login" className="btn-primary-custom inline-block mt-6">
              Login to Book
            </Link>
          )}
        </div>
      </div>

      <dialog id="booking_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">Book {car.carName}</h3>

          <form onSubmit={handleBooking} className="space-y-4">
            <select name="driverNeeded" className="select select-bordered w-full" required>
              <option value="">Driver Needed?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <textarea
              name="specialNote"
              className="textarea textarea-bordered w-full"
              placeholder="Special Note"
            />

            <button className="btn-primary-custom w-full">Book Now</button>
          </form>

          <form method="dialog">
            <button className="btn btn-sm mt-3 w-full">Cancel</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}