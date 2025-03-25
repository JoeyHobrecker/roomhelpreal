import React from 'react';
import { Link } from 'react-router-dom';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-ikea-gray rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl font-bold mb-4">Design Your Ideal Room</h1>
            <p className="text-lg mb-6">
              Our room planning tool helps you create the perfect layout based on established design principles from Feng Shui, modern interior design, and Scandinavian aesthetics.
            </p>
            <Link to="/room-planner">
              <button className="btn-primary text-lg">Start Planning Now</button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-ikea">
              <PhotoPlaceholder photoNumber={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="w-16 h-16 bg-ikea-yellow rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Research-Based Design</h3>
            <p className="text-center">
              Our tool applies concrete rules from different design currents to optimize your room layout.
            </p>
          </div>
          <div className="card">
            <div className="w-16 h-16 bg-ikea-yellow rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Interactive Visualization</h3>
            <p className="text-center">
              See your room come to life with our interactive visualization tool and make adjustments in real-time.
            </p>
          </div>
          <div className="card">
            <div className="w-16 h-16 bg-ikea-yellow rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Product Recommendations</h3>
            <p className="text-center">
              Get personalized furniture recommendations that match your design goals and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Example Layouts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Example Room Layouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <PhotoPlaceholder photoNumber={2} />
            <h3 className="text-xl font-bold mb-2">Home Office</h3>
            <p>A layout optimized for productivity and focus, based on modern design principles.</p>
          </div>
          <div className="card">
            <PhotoPlaceholder photoNumber={3} />
            <h3 className="text-xl font-bold mb-2">Bedroom</h3>
            <p>A layout designed for rest and relaxation, following Feng Shui principles.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-ikea-blue text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Design Your Perfect Room?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Start using our room planning tool today and create a space that's not only beautiful but also optimized based on established design principles.
        </p>
        <Link to="/room-planner">
          <button className="bg-ikea-yellow text-black py-3 px-8 rounded-ikea text-lg font-medium hover:bg-yellow-500 transition-colors">
            Start Planning Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
