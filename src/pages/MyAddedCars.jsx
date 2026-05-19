import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading";

export default function MyAddedCars() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCars = () => {
    axiosSecure.get(`/my-cars?email=${user.email}`)
      .then(res => setCars(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) loadCars();
  }, [user?.email]);

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: "Delete this car?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/cars/${id}`);

      if (res.data.deletedCount > 0) {
        toast.success("Car deleted");
        setCars(cars.filter(car => car._id !== id));
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="section-title">My Added Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cars.map(car => (
          <div key={car._id} className="card bg-white shadow rounded-2xl overflow-hidden">
            <img src={car.image} alt={car.carName} className="h-52 w-full object-cover" />
            <div className="card-body">
              <h3 className="card-title">{car.carName}</h3>
              <p>Type: {car.carType}</p>
              <p>Rent: ${car.dailyRentPrice}/day</p>
              <p>Status: {car.availability}</p>

              <div className="flex gap-3 mt-4">
                <Link to={`/update-car/${car._id}`} className="btn btn-warning flex-1">
                  Update
                </Link>
                <button onClick={() => handleDelete(car._id)} className="btn btn-error text-white flex-1">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <p className="text-center text-slate-500 mt-10">No cars added yet.</p>
      )}
    </div>
  );
}