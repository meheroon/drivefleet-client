import { useContext, useEffect, useState } from "react";
import { Link, useParams, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";
import { ArrowLeft } from "lucide-react";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="max-w-6xl mx-auto px-4 py-6">

  {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 mb-6 text-blue-600 font-semibold hover:text-blue-800 transition"
    >
      <ArrowLeft size={20} />
      Back
    </button>

  <div className="bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6">

    {/* Responsive Image */}
    <div className="w-full">
      <img
        src={car.image}
        alt={car.model}
        className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
      />
    </div>

    {/* Car Details */}
    <div className="space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">
        {car.model}
      </h1>

      <h1 className="text-3xl md:text-4xl font-bold">
        {car.carName}
      </h1>

      <p className="text-gray-600 text-base md:text-lg">
        {car.description}
      </p>

      <div className="space-y-2 text-lg">
        <p><span className="font-semibold">Type:</span> {car.carType}</p>
        <p><span className="font-semibold">Daily Rent:</span> ${car.dailyRentPrice}</p>
        <p><span className="font-semibold">Seat Capacity:</span> {car.seatCapacity}</p>
        <p><span className="font-semibold">Pickup Location:</span> {car.pickupLocation}</p>
        <p><span className="font-semibold">Availability:</span> {car.availability}</p>
        <p><span className="font-semibold">Booking Count:</span> {car.booking_count || 0}</p>
      </div>
    </div>
  </div>
    </div>
  );
}