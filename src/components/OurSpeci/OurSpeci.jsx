import React from "react";
import {
  FaBaby,
  FaHeartbeat,
  FaUserMd,
  FaStethoscope,
  FaHospitalUser,
  FaTooth,
  FaWheelchair,
  FaAssistiveListeningSystems,
} from "react-icons/fa";

const specialties = [
  { id: 1, title: "Fertility Services", icon: <FaUserMd size={48} /> },
  { id: 2, title: "Pediatric Care", icon: <FaStethoscope size={48} /> },
  { id: 3, title: "Maternity", icon: <FaBaby size={48} /> },
  { id: 4, title: "Breastfeeding Support", icon: <FaHeartbeat size={48} /> },
  { id: 5, title: "Neonatal ICU", icon: <FaHospitalUser size={48} /> },
  { id: 6, title: "Dentistry", icon: <FaTooth size={48} /> },
  { id: 7, title: "Child Physiotherapy", icon: <FaWheelchair size={48} /> },
  {
    id: 8,
    title: "Audiology & Speech Therapy",
    icon: <FaAssistiveListeningSystems size={48} />,
  },
];

const OurSpeci = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-pink-600 mb-12">
          Our Specialities
        </h2>

        {/* Grid: responsive 1 / 2 / 3 / 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-8">
          {specialties.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Circle container */}
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
                  <div className="text-pink-600 transition-transform duration-300 group-hover:scale-110">
                    {s.icon}
                  </div>
                </div>
              </div>

              <h3 className="mt-6 text-gray-700 text-base sm:text-lg font-medium leading-snug group-hover:text-pink-600 transition-colors">
                {s.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSpeci;


