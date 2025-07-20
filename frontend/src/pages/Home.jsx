import React from "react";

const Home = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20 px-6 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Premium Laptops</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Discover performance, speed, and sleek design all in one place. Perfect for gamers, coders, and creators.
        </p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg hover:bg-yellow-500 transition">
          Shop Now
        </button>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Top Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Gaming Beast X15",
              img: "https://via.placeholder.com/300x200?text=Laptop+1",
              price: "$1,499",
            },
            {
              name: "UltraSlim ZBook",
              img: "https://via.placeholder.com/300x200?text=Laptop+2",
              price: "$999",
            },
            {
              name: "Creator Pro 17",
              img: "https://via.placeholder.com/300x200?text=Laptop+3",
              price: "$1,899",
            },
          ].map((laptop, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={laptop.img} alt={laptop.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{laptop.name}</h3>
                <p className="text-gray-600 mb-4">{laptop.price}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-800 text-white py-14 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Need help choosing the right laptop?</h2>
        <p className="text-lg mb-6">Talk to our experts and get personalized recommendations!</p>
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
