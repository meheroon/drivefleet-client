import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cars?limit=6`)
      .then(res => setCars(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-r from-blue-950 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Rent Your Perfect Car With DriveFleet
            </h1>
            <p className="mt-5 text-lg text-blue-100">
              Explore verified rental cars, compare prices, and book your next ride with a smooth and secure experience.
            </p>
            <Link to="/explore-cars" className="btn bg-white text-blue-800 hover:bg-blue-50 mt-7">
              Explore Cars
            </Link>
          </div> */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Rent Your Perfect Car With DriveFleet
            </h1>

            <p className="text-lg md:text-2xl text-slate-200">
              Explore verified rental cars, compare prices, and book your next ride with a smooth and secure experience.
            </p>

            <button className="btn-primary-custom">
              Explore Cars
            </button>
          </motion.div>

          {/* <img
            className="rounded-2xl shadow-2xl h-80 w-full object-cover"
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
            alt="Rental car"
          /> */}
          <motion.img
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
            alt="Car"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
        </div>
      </motion.section>

      <motion.section 
      className="max-w-7xl mx-auto px-4 py-14" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.7 }}>
        <h2 className="section-title text-center">Available Cars</h2>
        <p className="text-center text-slate-500 mt-3 mb-8">
          Choose from popular cars listed by trusted owners.
        </p>

        {loading ? <Loading /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <div key={car._id} className="card bg-white shadow rounded-2xl overflow-hidden">
                <img src={car.image} alt={car.carName} className="h-52 w-full object-cover" />
                <div className="card-body">
                  <h3 className="card-title">{car.carName}</h3>
                  <p>Type: {car.carType}</p>
                  <p>Rent: ${car.dailyRentPrice}/day</p>
                  <p>Location: {car.pickupLocation}</p>
                  <Link to={`/cars/${car._id}`} className="btn-primary-custom text-center mt-3">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section 
      className="bg-white py-14" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.7 }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl shadow bg-slate-50">
            <h3 className="text-xl font-bold">Verified Listings</h3>
            <p className="text-slate-500 mt-2">Every listed car includes owner details, price, availability, and pickup location.</p>
          </div>
          <div className="p-6 rounded-2xl shadow bg-slate-50">
            <h3 className="text-xl font-bold">Flexible Booking</h3>
            <p className="text-slate-500 mt-2">Book cars with driver preference and special notes for a customized rental plan.</p>
          </div>
          <div className="p-6 rounded-2xl shadow bg-slate-50">
            <h3 className="text-xl font-bold">Owner Dashboard</h3>
            <p className="text-slate-500 mt-2">Car owners can add, update, and delete their own rental listings securely.</p>
          </div>
        </div>
      </motion.section>

      <motion.section 
      className="max-w-7xl mx-auto px-4 py-14" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.7 }}>
        <div className="bg-blue-700 text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold">Ready to start your next journey?</h2>
          <p className="mt-3 text-blue-100">Find a car that fits your budget, comfort, and destination.</p>
          <Link to="/explore-cars" className="btn bg-white text-blue-700 mt-6">Browse All Cars</Link>
        </div>
      </motion.section>
    </div>
  );
}