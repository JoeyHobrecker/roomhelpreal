import React, { useState } from 'react';

const FurnitureSelector = ({ 
  availableFurniture, 
  selectedFurniture, 
  onSelectFurniture, 
  onRemoveFurniture 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter furniture based on search term
  const filteredFurniture = availableFurniture.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group furniture by type
  const groupedFurniture = filteredFurniture.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
  
  // Check if an item is selected
  const isSelected = (item) => {
    return selectedFurniture.some(selected => selected.id === item.id);
  };
  
  // Handle item selection
  const handleSelect = (item) => {
    if (isSelected(item)) {
      onRemoveFurniture(item);
    } else {
      onSelectFurniture(item);
    }
  };
  
  return (
    <div className="furniture-selector">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search furniture..."
          className="input w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {Object.keys(groupedFurniture).length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No furniture items found
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedFurniture).map(([type, items]) => (
            <div key={type}>
              <h3 className="font-bold mb-2 capitalize">{type}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map(item => (
                  <div 
                    key={item.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      isSelected(item) 
                        ? 'border-ikea-blue bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: item.color || '#e4d4a7' }}
                      ></div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.width}m × {item.depth}m
                        </div>
                      </div>
                      <div className="ml-auto">
                        {isSelected(item) && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ikea-blue" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedFurniture.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Selected Items ({selectedFurniture.length})</h3>
          <div className="bg-ikea-gray p-3 rounded-lg">
            <ul className="divide-y divide-gray-200">
              {selectedFurniture.map(item => (
                <li key={item.id} className="py-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: item.color || '#e4d4a7' }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveFurniture(item)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FurnitureSelector;
