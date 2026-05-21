import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmartScroll from "../components/SmartScroll";
import { motion } from "framer-motion";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <motion.main 
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <SmartScroll />
    </>
  );
}