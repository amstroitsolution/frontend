import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback testimonials
  const fallbackTestimonials = [
    {
      _id: "1",
      name: "Rajesh Kumar",
      role: "Fashion Designer",
      image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=dc2626&color=fff&size=200",
      quote: "Outstanding quality and service! Their attention to detail and commitment to excellence has made them our go-to partner for all textile needs."
    },
    {
      _id: "2",
      name: "Priya Sharma",
      role: "Boutique Owner",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=dc2626&color=fff&size=200",
      quote: "The craftsmanship is exceptional. Every piece reflects their dedication to quality and their deep understanding of textile manufacturing."
    },
    {
      _id: "3",
      name: "Amit Patel",
      role: "Retail Manager",
      image: "https://ui-avatars.com/api/?name=Amit+Patel&background=dc2626&color=fff&size=200",
      quote: "Reliable, professional, and always delivering on time. Their expertise has helped us grow our business significantly."
    }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API}/api/testimonials/active`);
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#de3cad' }}></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-medium text-sm uppercase tracking-wider" style={{ color: '#de3cad' }}>Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 h-full"
              >
                {/* Quote icon */}
                <div className="text-5xl font-serif mb-4" style={{ color: '#de3cad' }}>"</div>
                
                {/* Quote text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
