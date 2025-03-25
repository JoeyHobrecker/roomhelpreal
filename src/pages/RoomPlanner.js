import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhotoPlaceholder from '../components/PhotoPlaceholder';

const RoomPlanner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: 'Room Basics' },
    { id: 2, name: 'Doors & Windows' },
    { id: 3, name: 'Room Goal' },
    { id: 4, name: 'Existing Furniture' },
    { id: 5, name: 'Desired Furniture' },
    { id: 6, name: 'Results' },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Room Planner</h1>
      
      {/* Step Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center ${currentStep >= step.id ? 'text-ikea-blue' : 'text-gray-400'}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep > step.id 
                    ? 'bg-ikea-blue text-white' 
                    : currentStep === step.id 
                    ? 'bg-ikea-yellow text-black' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className="text-sm hidden md:block">{step.name}</span>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
          <div 
            className="absolute top-0 h-1 bg-ikea-blue transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-ikea p-6 mb-8">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Room Basics</h2>
            <p className="mb-6">Let's start by defining the basic parameters of your room.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-medium">Room Type</label>
                <select className="input w-full">
                  <option>Bedroom</option>
                  <option>Living Room</option>
                  <option>Home Office</option>
                  <option>Dining Room</option>
                  <option>Kitchen</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Number of Users</label>
                <select className="input w-full">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-medium">Room Width (meters)</label>
                <input type="number" className="input w-full" placeholder="e.g., 4.5" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Room Length (meters)</label>
                <input type="number" className="input w-full" placeholder="e.g., 5.2" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Ceiling Height (meters)</label>
                <input type="number" className="input w-full" placeholder="e.g., 2.4" />
              </div>
            </div>
            
            <div className="bg-ikea-gray p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Room Visualization</h3>
              <div className="aspect-w-16 aspect-h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                <PhotoPlaceholder photoNumber={1} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Doors & Windows</h2>
            <p className="mb-6">Now, let's add doors, windows, and fixed elements to your room.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-3">Add Elements</h3>
                <div className="space-y-4">
                  <button onClick={() => {}} className="btn-secondary w-full">Add Door</button>
                  <button onClick={() => {}} className="btn-secondary w-full">Add Window</button>
                  <button onClick={() => {}} className="btn-secondary w-full">Add Fixed Element</button>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Elements List</h3>
                <div className="bg-ikea-gray p-4 rounded-lg">
                  <p className="text-gray-500 text-center">No elements added yet</p>
                </div>
              </div>
            </div>
            
            <div className="bg-ikea-gray p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Room Visualization</h3>
              <div className="aspect-w-16 aspect-h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                <PhotoPlaceholder photoNumber={2} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Room Goal</h2>
            <p className="mb-6">What is the primary purpose of this room? This will help us apply the right design principles.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-ikea-blue cursor-pointer transition-colors">
                <div className="w-16 h-16 bg-ikea-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white text-2xl">P</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Productivity</h3>
                <p className="text-center text-sm">
                  Optimize for work, focus, and efficiency. Based on modern design research.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-ikea-blue cursor-pointer transition-colors">
                <div className="w-16 h-16 bg-ikea-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white text-2xl">R</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Relaxation</h3>
                <p className="text-center text-sm">
                  Create a calm, peaceful space for rest. Based on Feng Shui principles.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:border-ikea-blue cursor-pointer transition-colors">
                <div className="w-16 h-16 bg-ikea-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white text-2xl">S</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Social</h3>
                <p className="text-center text-sm">
                  Design for gatherings and conversation. Based on Scandinavian design principles.
                </p>
              </div>
            </div>
            
            <div className="bg-ikea-gray p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Design Principles</h3>
              <p className="mb-4">When you select a goal, we'll apply these design principles:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Modern design principles for optimal workspace ergonomics</li>
                <li>Feng Shui principles for energy flow and balance</li>
                <li>Scandinavian design for functionality and aesthetics</li>
              </ul>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Existing Furniture</h2>
            <p className="mb-6">Do you have any existing furniture that you want to keep in the room?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-3">Add Existing Furniture</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Furniture Type</label>
                    <select className="input w-full">
                      <option>Bed</option>
                      <option>Sofa</option>
                      <option>Desk</option>
                      <option>Table</option>
                      <option>Chair</option>
                      <option>Bookshelf</option>
                      <option>Dresser</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Dimensions (cm)</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input type="number" className="input" placeholder="Width" />
                      <input type="number" className="input" placeholder="Depth" />
                      <input type="number" className="input" placeholder="Height" />
                    </div>
                  </div>
                  <button onClick={() => {}} className="btn-secondary w-full">Add Furniture</button>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Existing Furniture List</h3>
                <div className="bg-ikea-gray p-4 rounded-lg">
                  <p className="text-gray-500 text-center">No furniture added yet</p>
                </div>
              </div>
            </div>
            
            <div className="bg-ikea-gray p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2">Room Visualization</h3>
              <div className="aspect-w-16 aspect-h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                <PhotoPlaceholder photoNumber={3} />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Desired Furniture</h2>
            <p className="mb-6">What new furniture would you like to add to your room?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold mb-3">Select Desired Furniture</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Furniture Category</label>
                    <select className="input w-full">
                      <option>Beds</option>
                      <option>Sofas & Armchairs</option>
                      <option>Tables & Desks</option>
                      <option>Storage & Organization</option>
                      <option>Chairs</option>
                      <option>Lighting</option>
                    </select>
                  </div>
                  <div className="bg-ikea-gray p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded border border-gray-200 hover:border-ikea-blue cursor-pointer">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                        <p className="text-sm font-medium">Furniture Item 1</p>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200 hover:border-ikea-blue cursor-pointer">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                        <p className="text-sm font-medium">Furniture Item 2</p>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200 hover:border-ikea-blue cursor-pointer">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                        <p className="text-sm font-medium">Furniture Item 3</p>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200 hover:border-ikea-blue cursor-pointer">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                        <p className="text-sm font-medium">Furniture Item 4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Selected Furniture</h3>
                <div className="bg-ikea-gray p-4 rounded-lg">
                  <p className="text-gray-500 text-center">No furniture selected yet</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <p className="mb-6">Here's your optimized room layout based on the selected design principles.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <div className="bg-ikea-gray p-4 rounded-lg mb-4">
                  <h3 className="font-bold mb-2">Final Room Layout</h3>
                  <div className="aspect-w-16 aspect-h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Your optimized room layout</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => {}} className="btn-primary">Download Layout</button>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Design Explanation</h3>
                <div className="bg-ikea-gray p-4 rounded-lg mb-6">
                  <p className="mb-4">Your layout is optimized based on these design principles:</p>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Desk positioned perpendicular to window to reduce eye strain (Modern Design)</li>
                    <li>Bed placed against solid wall, not facing door (Feng Shui)</li>
                    <li>Clear pathways for energy flow throughout room (Feng Shui)</li>
                    <li>Balanced furniture arrangement with focus on functionality (Scandinavian)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3">Product Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-ikea-blue cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                  <h4 className="font-medium">MALM</h4>
                  <p className="text-sm text-gray-600 mb-1">Bed frame, high</p>
                  <p className="font-medium">$199</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-ikea-blue cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                  <h4 className="font-medium">MICKE</h4>
                  <p className="text-sm text-gray-600 mb-1">Desk</p>
                  <p className="font-medium">$79.99</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-ikea-blue cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                  <h4 className="font-medium">BILLY</h4>
                  <p className="text-sm text-gray-600 mb-1">Bookcase</p>
                  <p className="font-medium">$49.99</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-ikea-blue cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-100 mb-2"></div>
                  <h4 className="font-medium">KALLAX</h4>
                  <p className="text-sm text-gray-600 mb-1">Shelf unit</p>
                  <p className="font-medium">$39.99</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button 
          onClick={prevStep}
          className={`btn-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <div>
          {currentStep < totalSteps ? (
            <button 
              onClick={nextStep}
              className="btn-primary"
            >
              Next
            </button>
          ) : (
            <Link to="/">
              <button 
                className="btn-primary"
              >
                Finish
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPlanner;
