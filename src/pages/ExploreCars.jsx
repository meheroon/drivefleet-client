import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios.get(`${import.meta.env.VITE_API_URL}/cars?search=${search}&type=${type}`)
      .then(res => setCars(res.data))
      .finally(() => setLoading(false));
  }, [search, type]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="section-title">Explore Cars</h2>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="input input-bordered w-full"
          placeholder="Search by car name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>

      {loading ? <Loading /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {cars.map(car => (
            <div key={car._id} className="card bg-white shadow rounded-2xl overflow-hidden">
              <img src={car.image} alt={car.carName} className="h-52 w-full object-cover" />
              <div className="card-body">
                <h3 className="card-title">{car.carName}</h3>
                <p>Type: {car.carType}</p>
                <p>Seat: {car.seatCapacity}</p>
                <p>Rent: ${car.dailyRentPrice}/day</p>
                <p>Status: {car.availability}</p>
                <Link to={`/cars/${car._id}`} className="btn-primary-custom text-center mt-3">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && cars.length === 0 && (
        <p className="text-center mt-10 text-slate-500">No cars found.</p>
      )}
    </div>
  );
}