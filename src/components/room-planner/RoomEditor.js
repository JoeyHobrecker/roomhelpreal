import React, { useState } from 'react';

const RoomEditor = ({ 
  roomDimensions, 
  onUpdateDimensions,
  doors = [],
  windows = [],
  fixedElements = [],
  onAddDoor,
  onAddWindow,
  onAddFixedElement,
  onRemoveDoor,
  onRemoveWindow,
  onRemoveFixedElement
}) => {
  // Default dimensions if not provided
  const { width = 4, length = 5, height = 2.4 } = roomDimensions || {};
  
  // State for new element forms
  const [showDoorForm, setShowDoorForm] = useState(false);
  const [showWindowForm, setShowWindowForm] = useState(false);
  const [showFixedElementForm, setShowFixedElementForm] = useState(false);
  
  // State for new elements
  const [newDoor, setNewDoor] = useState({ x: 0, y: 0, width: 0.9, wall: 'bottom', isOpen: true });
  const [newWindow, setNewWindow] = useState({ x: 0, y: 0, width: 1.2, wall: 'top' });
  const [newFixedElement, setNewFixedElement] = useState({ x: 0, y: 0, width: 0.5, depth: 0.5, type: 'column' });
  
  // Handle room dimension changes
  const handleDimensionChange = (dimension, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onUpdateDimensions({ ...roomDimensions, [dimension]: numValue });
    }
  };
  
  // Handle door form submission
  const handleAddDoor = (e) => {
    e.preventDefault();
    onAddDoor(newDoor);
    setNewDoor({ x: 0, y: 0, width: 0.9, wall: 'bottom', isOpen: true });
    setShowDoorForm(false);
  };
  
  // Handle window form submission
  const handleAddWindow = (e) => {
    e.preventDefault();
    onAddWindow(newWindow);
    setNewWindow({ x: 0, y: 0, width: 1.2, wall: 'top' });
    setShowWindowForm(false);
  };
  
  // Handle fixed element form submission
  const handleAddFixedElement = (e) => {
    e.preventDefault();
    onAddFixedElement(newFixedElement);
    setNewFixedElement({ x: 0, y: 0, width: 0.5, depth: 0.5, type: 'column' });
    setShowFixedElementForm(false);
  };
  
  return (
    <div className="room-editor">
      <div className="bg-white p-6 rounded-lg shadow-ikea mb-6">
        <h3 className="text-xl font-bold mb-4">Room Dimensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-medium">Width (meters)</label>
            <input 
              type="number" 
              className="input w-full" 
              value={width} 
              min="1"
              max="20"
              step="0.1"
              onChange={(e) => handleDimensionChange('width', e.target.value)} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Length (meters)</label>
            <input 
              type="number" 
              className="input w-full" 
              value={length} 
              min="1"
              max="20"
              step="0.1"
              onChange={(e) => handleDimensionChange('length', e.target.value)} 
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Height (meters)</label>
            <input 
              type="number" 
              className="input w-full" 
              value={height} 
              min="1"
              max="5"
              step="0.1"
              onChange={(e) => handleDimensionChange('height', e.target.value)} 
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Doors Section */}
        <div className="bg-white p-6 rounded-lg shadow-ikea">
          <h3 className="text-xl font-bold mb-4">Doors</h3>
          
          {doors.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Current Doors</h4>
              <ul className="divide-y divide-gray-200">
                {doors.map((door, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span>
                      Door {index + 1} ({door.width}m on {door.wall} wall)
                    </span>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveDoor(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No doors added yet</p>
          )}
          
          {showDoorForm ? (
            <form onSubmit={handleAddDoor}>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Wall</label>
                  <select 
                    className="input w-full"
                    value={newDoor.wall}
                    onChange={(e) => setNewDoor({ ...newDoor, wall: e.target.value })}
                  >
                    <option value="top">Top</option>
                    <option value="right">Right</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Position (meters from corner)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newDoor.x} 
                    min="0"
                    max={newDoor.wall === 'top' || newDoor.wall === 'bottom' ? width - newDoor.width : length - newDoor.width}
                    step="0.1"
                    onChange={(e) => setNewDoor({ ...newDoor, x: parseFloat(e.target.value) })} 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Width (meters)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newDoor.width} 
                    min="0.6"
                    max="1.5"
                    step="0.1"
                    onChange={(e) => setNewDoor({ ...newDoor, width: parseFloat(e.target.value) })} 
                  />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="doorIsOpen" 
                    className="mr-2"
                    checked={newDoor.isOpen}
                    onChange={(e) => setNewDoor({ ...newDoor, isOpen: e.target.checked })} 
                  />
                  <label htmlFor="doorIsOpen" className="text-sm">Show door swing</label>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  type="submit"
                  className="btn-primary py-1 px-3 text-sm"
                >
                  Add Door
                </button>
                <button 
                  type="button"
                  className="border border-gray-300 rounded-ikea py-1 px-3 text-sm hover:bg-gray-100"
                  onClick={() => setShowDoorForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              className="btn-secondary w-full"
              onClick={() => setShowDoorForm(true)}
            >
              Add Door
            </button>
          )}
        </div>
        
        {/* Windows Section */}
        <div className="bg-white p-6 rounded-lg shadow-ikea">
          <h3 className="text-xl font-bold mb-4">Windows</h3>
          
          {windows.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Current Windows</h4>
              <ul className="divide-y divide-gray-200">
                {windows.map((window, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span>
                      Window {index + 1} ({window.width}m on {window.wall} wall)
                    </span>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveWindow(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No windows added yet</p>
          )}
          
          {showWindowForm ? (
            <form onSubmit={handleAddWindow}>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Wall</label>
                  <select 
                    className="input w-full"
                    value={newWindow.wall}
                    onChange={(e) => setNewWindow({ ...newWindow, wall: e.target.value })}
                  >
                    <option value="top">Top</option>
                    <option value="right">Right</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Position (meters from corner)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newWindow.x} 
                    min="0"
                    max={newWindow.wall === 'top' || newWindow.wall === 'bottom' ? width - newWindow.width : length - newWindow.width}
                    step="0.1"
                    onChange={(e) => setNewWindow({ ...newWindow, x: parseFloat(e.target.value) })} 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Width (meters)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newWindow.width} 
                    min="0.5"
                    max="3"
                    step="0.1"
                    onChange={(e) => setNewWindow({ ...newWindow, width: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  type="submit"
                  className="btn-primary py-1 px-3 text-sm"
                >
                  Add Window
                </button>
                <button 
                  type="button"
                  className="border border-gray-300 rounded-ikea py-1 px-3 text-sm hover:bg-gray-100"
                  onClick={() => setShowWindowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              className="btn-secondary w-full"
              onClick={() => setShowWindowForm(true)}
            >
              Add Window
            </button>
          )}
        </div>
        
        {/* Fixed Elements Section */}
        <div className="bg-white p-6 rounded-lg shadow-ikea">
          <h3 className="text-xl font-bold mb-4">Fixed Elements</h3>
          
          {fixedElements.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Current Fixed Elements</h4>
              <ul className="divide-y divide-gray-200">
                {fixedElements.map((element, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span>
                      {element.type.charAt(0).toUpperCase() + element.type.slice(1)} ({element.width}m × {element.depth}m)
                    </span>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveFixedElement(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No fixed elements added yet</p>
          )}
          
          {showFixedElementForm ? (
            <form onSubmit={handleAddFixedElement}>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Type</label>
                  <select 
                    className="input w-full"
                    value={newFixedElement.type}
                    onChange={(e) => setNewFixedElement({ ...newFixedElement, type: e.target.value })}
                  >
                    <option value="column">Column</option>
                    <option value="fireplace">Fireplace</option>
                    <option value="stairs">Stairs</option>
                    <option value="built-in">Built-in Furniture</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">X Position (meters from left)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newFixedElement.x} 
                    min="0"
                    max={width - newFixedElement.width}
                    step="0.1"
                    onChange={(e) => setNewFixedElement({ ...newFixedElement, x: parseFloat(e.target.value) })} 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Y Position (meters from top)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newFixedElement.y} 
                    min="0"
                    max={length - newFixedElement.depth}
                    step="0.1"
                    onChange={(e) => setNewFixedElement({ ...newFixedElement, y: parseFloat(e.target.value) })} 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Width (meters)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newFixedElement.width} 
                    min="0.1"
                    max={width - newFixedElement.x}
                    step="0.1"
                    onChange={(e) => setNewFixedElement({ ...newFixedElement, width: parseFloat(e.target.value) })} 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Depth (meters)</label>
                  <input 
                    type="number" 
                    className="input w-full" 
                    value={newFixedElement.depth} 
                    min="0.1"
                    max={length - newFixedElement.y}
                    step="0.1"
                    onChange={(e) => setNewFixedElement({ ...newFixedElement, depth: parseFloat(e.target.value) })} 
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  type="submit"
                  className="btn-primary py-1 px-3 text-sm"
                >
                  Add Element
                </button>
                <button 
                  type="button"
                  className="border border-gray-300 rounded-ikea py-1 px-3 text-sm hover:bg-gray-100"
                  onClick={() => setShowFixedElementForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              className="btn-secondary w-full"
              onClick={() => setShowFixedElementForm(true)}
            >
              Add Fixed Element
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomEditor;
