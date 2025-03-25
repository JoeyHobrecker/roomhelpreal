import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-ikea-blue text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold uppercase mr-10">RoomHelp</div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="hover:text-ikea-yellow transition-colors">Home</Link>
              <Link to="/room-planner" className="hover:text-ikea-yellow transition-colors">Room Planner</Link>
              <Link to="/design-principles" className="hover:text-ikea-yellow transition-colors">Design Principles</Link>
              <Link to="/help" className="hover:text-ikea-yellow transition-colors">Help & FAQ</Link>
            </nav>
          </div>
          <div>
            <Link to="/room-planner">
              <button className="bg-ikea-yellow text-black px-4 py-2 rounded-ikea hover:bg-yellow-500 transition-colors">
                Start Planning
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
