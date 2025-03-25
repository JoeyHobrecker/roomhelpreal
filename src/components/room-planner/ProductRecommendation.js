import React from 'react';

const ProductRecommendation = ({ 
  selectedFurniture, 
  budget = 'mid-range', 
  style = 'scandinavian',
  assemblyDifficulty = 'all'
}) => {
  // Sample IKEA product data
  const ikeaProducts = [
    // Beds
    {
      id: 'bed-1',
      name: 'MALM',
      type: 'bed',
      description: 'Bed frame, high',
      dimensions: '160x200 cm',
      price: 199,
      image: 'malm_bed.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'medium'
    },
    {
      id: 'bed-2',
      name: 'HEMNES',
      type: 'bed',
      description: 'Bed frame',
      dimensions: '160x200 cm',
      price: 299,
      image: 'hemnes_bed.jpg',
      budget: 'premium',
      style: 'traditional',
      assemblyDifficulty: 'hard'
    },
    {
      id: 'bed-3',
      name: 'NEIDEN',
      type: 'bed',
      description: 'Bed frame',
      dimensions: '140x200 cm',
      price: 79,
      image: 'neiden_bed.jpg',
      budget: 'budget-friendly',
      style: 'minimalist',
      assemblyDifficulty: 'easy'
    },
    
    // Desks
    {
      id: 'desk-1',
      name: 'MICKE',
      type: 'desk',
      description: 'Desk',
      dimensions: '105x50 cm',
      price: 89,
      image: 'micke_desk.jpg',
      budget: 'mid-range',
      style: 'modern',
      assemblyDifficulty: 'medium'
    },
    {
      id: 'desk-2',
      name: 'BEKANT',
      type: 'desk',
      description: 'Desk, sit/stand',
      dimensions: '160x80 cm',
      price: 499,
      image: 'bekant_desk.jpg',
      budget: 'premium',
      style: 'modern',
      assemblyDifficulty: 'hard'
    },
    {
      id: 'desk-3',
      name: 'LINNMON / ADILS',
      type: 'desk',
      description: 'Table',
      dimensions: '120x60 cm',
      price: 49,
      image: 'linnmon_desk.jpg',
      budget: 'budget-friendly',
      style: 'minimalist',
      assemblyDifficulty: 'easy'
    },
    
    // Sofas
    {
      id: 'sofa-1',
      name: 'KIVIK',
      type: 'sofa',
      description: 'Sofa',
      dimensions: '3-seat',
      price: 599,
      image: 'kivik_sofa.jpg',
      budget: 'premium',
      style: 'scandinavian',
      assemblyDifficulty: 'medium'
    },
    {
      id: 'sofa-2',
      name: 'KLIPPAN',
      type: 'sofa',
      description: 'Loveseat',
      dimensions: '2-seat',
      price: 299,
      image: 'klippan_sofa.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'easy'
    },
    {
      id: 'sofa-3',
      name: 'FRIHETEN',
      type: 'sofa',
      description: 'Sleeper sofa',
      dimensions: '3-seat',
      price: 599,
      image: 'friheten_sofa.jpg',
      budget: 'premium',
      style: 'modern',
      assemblyDifficulty: 'hard'
    },
    
    // Bookshelves
    {
      id: 'shelf-1',
      name: 'BILLY',
      type: 'bookshelf',
      description: 'Bookcase',
      dimensions: '80x28x202 cm',
      price: 69,
      image: 'billy_bookcase.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'medium'
    },
    {
      id: 'shelf-2',
      name: 'KALLAX',
      type: 'bookshelf',
      description: 'Shelf unit',
      dimensions: '77x77 cm',
      price: 49,
      image: 'kallax_shelf.jpg',
      budget: 'budget-friendly',
      style: 'modern',
      assemblyDifficulty: 'easy'
    },
    {
      id: 'shelf-3',
      name: 'HEMNES',
      type: 'bookshelf',
      description: 'Bookcase',
      dimensions: '90x197 cm',
      price: 149,
      image: 'hemnes_bookcase.jpg',
      budget: 'premium',
      style: 'traditional',
      assemblyDifficulty: 'hard'
    },
    
    // Tables
    {
      id: 'table-1',
      name: 'LISABO',
      type: 'table',
      description: 'Table',
      dimensions: '140x78 cm',
      price: 149,
      image: 'lisabo_table.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'medium'
    },
    {
      id: 'table-2',
      name: 'EKEDALEN',
      type: 'table',
      description: 'Extendable table',
      dimensions: '120/180x80 cm',
      price: 299,
      image: 'ekedalen_table.jpg',
      budget: 'premium',
      style: 'traditional',
      assemblyDifficulty: 'hard'
    },
    {
      id: 'table-3',
      name: 'MELLTORP',
      type: 'table',
      description: 'Table',
      dimensions: '125x75 cm',
      price: 59,
      image: 'melltorp_table.jpg',
      budget: 'budget-friendly',
      style: 'minimalist',
      assemblyDifficulty: 'easy'
    }
  ];
  
  // Filter products based on selected furniture types
  const furnitureTypes = selectedFurniture.map(item => item.type);
  let filteredProducts = ikeaProducts.filter(product => 
    furnitureTypes.includes(product.type)
  );
  
  // Apply budget filter
  if (budget !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.budget === budget);
  }
  
  // Apply style filter
  if (style !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.style === style);
  }
  
  // Apply assembly difficulty filter
  if (assemblyDifficulty !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.assemblyDifficulty === assemblyDifficulty);
  }
  
  // Group products by type
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.type]) {
      acc[product.type] = [];
    }
    acc[product.type].push(product);
    return acc;
  }, {});
  
  return (
    <div className="product-recommendation">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">IKEA Product Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">Budget</label>
            <select 
              className="input w-full"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="all">All Budgets</option>
              <option value="budget-friendly">Budget-Friendly</option>
              <option value="mid-range">Mid-Range</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Style</label>
            <select 
              className="input w-full"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="all">All Styles</option>
              <option value="scandinavian">Scandinavian</option>
              <option value="minimalist">Minimalist</option>
              <option value="modern">Modern</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Assembly Difficulty</label>
            <select 
              className="input w-full"
              value={assemblyDifficulty}
              onChange={(e) => setAssemblyDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>
      
      {Object.keys(groupedProducts).length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p>No products match your current selection. Try adjusting your filters or adding more furniture to your room.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedProducts).map(([type, products]) => (
            <div key={type}>
              <h4 className="font-bold mb-3 capitalize">{type}s</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-w-1 aspect-h-1 bg-ikea-gray flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-2xl mb-2">
                          {product.type === 'bed' && '🛏️'}
                          {product.type === 'desk' && '🖥️'}
                          {product.type === 'sofa' && '🛋️'}
                          {product.type === 'bookshelf' && '📚'}
                          {product.type === 'table' && '🍽️'}
                        </div>
                        <p className="text-sm text-gray-500">{product.name}</p>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold">{product.name}</h5>
                        <span className="font-bold text-ikea-blue">${product.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                      <p className="text-xs text-gray-500">{product.dimensions}</p>
                      <div className="mt-2 flex items-center text-xs">
                        <span className={`px-2 py-1 rounded-full mr-2 ${
                          product.budget === 'budget-friendly' ? 'bg-green-100 text-green-800' :
                          product.budget === 'mid-range' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {product.budget === 'budget-friendly' ? 'Budget' :
                           product.budget === 'mid-range' ? 'Mid-Range' : 'Premium'}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          product.assemblyDifficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          product.assemblyDifficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.assemblyDifficulty.charAt(0).toUpperCase() + product.assemblyDifficulty.slice(1)} Assembly
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductRecommendation;
