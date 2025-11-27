import React from "react";
import {
  FaPaintBrush,
  FaHandsHelping,
  FaRocket,
  FaRegFileAlt,
  FaClipboardCheck,
  FaSmile,
} from "react-icons/fa";

const WhoWeAre = () => {
  const cards = [
    {
      icon: <FaPaintBrush className="text-red-500 text-5xl mb-4" />,
      title: "Quality",
      text: "We believe in upholding the highest standards of quality in everything we do we use to the techniques we employ.",
    },
    {
      icon: <FaHandsHelping className="text-red-500 text-5xl mb-4" />,
      title: "Craftsmanship",
      text: "Our artisans are masters of their craft, with years of experience and a keen eye for detail. We create infused with precision and skill.",
    },
    {
      icon: <FaRocket className="text-red-500 text-5xl mb-4" />,
      title: "Innovation",
      text: "In a constantly evolving industry, we embrace innovation as a driving force for growth and progress.",
    },
    {
      icon: <FaRegFileAlt className="text-red-500 text-5xl mb-4" />,
      title: "Integrity",
      text: "We conduct our business with honesty, transparency, and fairness, earning the trust of our clients and partners.",
    },
    {
      icon: <FaClipboardCheck className="text-red-500 text-5xl mb-4 items-center" />,
      title: "Quality Assurance",
      text: "We source only the finest materials and employ stringent quality control to ensure that every product meets expectations.",
    },
    {
      icon: <FaSmile className="text-red-500 text-5xl mb-4" />,
      title: "Customer Satisfaction",
      text: "We prioritize open communication, attention to detail, and exceptional service to ensure complete customer satisfaction.",
    },
  ];

  return (
    <section className="relative bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      {/* Background Image Overlay (optional) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/your-background-image.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative text-center mb-12">
        <h3 className="text-red-600 font-semibold tracking-wide uppercase mb-2">
          Who We Are
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
          We take pride in our legacy of <br />
          excellence in textile stitching, <br />
          serving clients in India
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 p-6 text-left"
          >
            {card.icon}
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {card.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="relative text-center mt-12">
        <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default WhoWeAre;
