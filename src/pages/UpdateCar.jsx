import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

export default function UpdateCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then(res => setCar(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async e => {
    e.preventDefault();
    const form = e.target;

    const updatedCar = {
      dailyRentPrice: Number(form.dailyRentPrice.value),
      description: form.description.value,
      availability: form.availability.value,
      image: form.image.value,
      carType: form.carType.value,
      pickupLocation: form.pickupLocation.value,
    };

    const res = await axiosSecure.patch(`/cars/${id}`, updatedCar);

    if (res.data.modifiedCount > 0) {
      toast.success("Car updated successfully");
      navigate("/my-added-cars");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="section-title mb-6">Update Car</h2>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <input name="dailyRentPrice" type="number" defaultValue={car.dailyRentPrice} className="input input-bordered" required />

        <select name="carType" defaultValue={car.carType} className="select select-bordered" required>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
        </select>

        <input name="image" defaultValue={car.image} className="input input-bordered" required />
        <input name="pickupLocation" defaultValue={car.pickupLocation} className="input input-bordered" required />

        <select name="availability" defaultValue={car.availability} className="select select-bordered" required>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <textarea name="description" defaultValue={car.description} className="textarea textarea-bordered md:col-span-2" required />

        <button className="btn-primary-custom md:col-span-2">Update Car</button>
      </form>
    </div>
  );
}