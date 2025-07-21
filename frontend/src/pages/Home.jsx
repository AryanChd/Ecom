import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/getAllProduct`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []); 

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20 px-6 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Premium Laptops
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Discover performance, speed, and sleek design all in one place.
          Perfect for gamers, coders, and creators.
        </p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg hover:bg-yellow-500 transition">
          Shop Now
        </button>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Top Picks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-md rounded-lg text-center"
            >
              <img
                src={product.img}
                alt={product.name}
                className="mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-green-600 font-bold mt-2">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-800 text-white py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Need help choosing the right laptop?
        </h2>
        <p className="text-lg mb-6">
          Talk to our experts and get personalized recommendations!
        </p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-500 transition">
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        © {new Date().getFullYear()} Aryan's Laptop Store. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
