import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">IKEA Room Planner</h3>
            <p className="text-sm">
              Design your ideal room layout with our IKEA-inspired room planning tool.
              Based on established design principles from different currents.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-ikea-blue transition-colors">Home</a></li>
              <li><a href="/room-planner" className="hover:text-ikea-blue transition-colors">Room Planner</a></li>
              <li><a href="/design-principles" className="hover:text-ikea-blue transition-colors">Design Principles</a></li>
              <li><a href="/help" className="hover:text-ikea-blue transition-colors">Help & FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Design Currents</h3>
            <ul className="space-y-2">
              <li><a href="/design-principles#feng-shui" className="hover:text-ikea-blue transition-colors">Feng Shui</a></li>
              <li><a href="/design-principles#modern" className="hover:text-ikea-blue transition-colors">Modern Design</a></li>
              <li><a href="/design-principles#scandinavian" className="hover:text-ikea-blue transition-colors">Scandinavian Design</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-sm">
              This is a prototype website created as a demonstration of an IKEA-inspired room planning tool.
              It is not affiliated with IKEA.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} IKEA Room Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
