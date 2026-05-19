import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AddCar() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleAddCar = async e => {
    e.preventDefault();
    const form = e.target;

    const car = {
      carName: form.carName.value,
      dailyRentPrice: Number(form.dailyRentPrice.value),
      carType: form.carType.value,
      image: form.image.value,
      seatCapacity: Number(form.seatCapacity.value),
      pickupLocation: form.pickupLocation.value,
      description: form.description.value,
      availability: form.availability.value,
      ownerEmail: user.email,
      ownerName: user.displayName,
    };

    const res = await axiosSecure.post("/cars", car);

    if (res.data.insertedId) {
      toast.success("Car added successfully");
      form.reset();
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="section-title mb-6">Add New Car</h2>

      <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <input name="carName" placeholder="Car Name" className="input input-bordered" required />
        <input name="dailyRentPrice" type="number" placeholder="Daily Rent Price" className="input input-bordered" required />

        <select name="carType" className="select select-bordered" required>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
        </select>

        <input name="image" placeholder="Image URL" className="input input-bordered" required />
        <input name="seatCapacity" type="number" placeholder="Seat Capacity" className="input input-bordered" required />
        <input name="pickupLocation" placeholder="Pickup Location" className="input input-bordered" required />

        <select name="availability" className="select select-bordered" required>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <textarea name="description" placeholder="Description" className="textarea textarea-bordered md:col-span-2" required />

        <button className="btn-primary-custom md:col-span-2">Add Car</button>
      </form>
    </div>
  );
}