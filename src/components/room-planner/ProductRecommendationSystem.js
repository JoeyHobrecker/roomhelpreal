import React, { useState, useEffect } from 'react';
import ProductDatabase from '../utils/ProductDatabase';

const ProductRecommendationSystem = ({ 
  roomGoal, 
  selectedFurniture,
  onSelectProduct
}) => {
  // State for filters
  const [budget, setBudget] = useState('all');
  const [style, setStyle] = useState('all');
  const [assemblyDifficulty, setAssemblyDifficulty] = useState('all');
  
  // State for recommended products
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  
  // Update recommendations when filters or selected furniture change
  useEffect(() => {
    // Get furniture types from selected furniture
    const furnitureTypes = selectedFurniture.map(item => item.type);
    
    // Get recommended products
    const recommendations = ProductDatabase.getRecommendedProducts(
      roomGoal,
      furnitureTypes,
      budget
    );
    
    // Apply additional filters
    let filteredRecommendations = recommendations;
    
    if (style !== 'all') {
      filteredRecommendations = filteredRecommendations.filter(
        product => product.style === style
      );
    }
    
    if (assemblyDifficulty !== 'all') {
      filteredRecommendations = filteredRecommendations.filter(
        product => product.assemblyDifficulty === assemblyDifficulty
      );
    }
    
    // Group products by type
    const groupedProducts = filteredRecommendations.reduce((acc, product) => {
      if (!acc[product.type]) {
        acc[product.type] = [];
      }
      acc[product.type].push(product);
      return acc;
    }, {});
    
    setRecommendedProducts(groupedProducts);
  }, [roomGoal, selectedFurniture, budget, style, assemblyDifficulty]);
  
  // Handle product selection
  const handleSelectProduct = (product) => {
    if (onSelectProduct) {
      const furnitureItem = ProductDatabase.createFurnitureFromProduct(product);
      onSelectProduct(furnitureItem);
    }
  };
  
  // Get style name for display
  const getStyleName = (styleCode) => {
    switch (styleCode) {
      case 'scandinavian':
        return 'Scandinavian';
      case 'modern':
        return 'Modern';
      case 'traditional':
        return 'Traditional';
      case 'minimalist':
        return 'Minimalist';
      default:
        return styleCode.charAt(0).toUpperCase() + styleCode.slice(1);
    }
  };
  
  // Get budget name for display
  const getBudgetName = (budgetCode) => {
    switch (budgetCode) {
      case 'budget-friendly':
        return 'Budget-Friendly';
      case 'mid-range':
        return 'Mid-Range';
      case 'premium':
        return 'Premium';
      default:
        return budgetCode.charAt(0).toUpperCase() + budgetCode.slice(1);
    }
  };
  
  // Get difficulty name for display
  const getDifficultyName = (difficultyCode) => {
    return difficultyCode.charAt(0).toUpperCase() + difficultyCode.slice(1);
  };
  
  // Get icon for furniture type
  const getFurnitureIcon = (type) => {
    switch (type) {
      case 'bed':
        return '🛏️';
      case 'desk':
        return '🖥️';
      case 'sofa':
        return '🛋️';
      case 'bookshelf':
        return '📚';
      case 'table':
        return '🍽️';
      case 'chair':
        return '🪑';
      case 'dresser':
        return '🗄️';
      case 'nightstand':
        return '📱';
      default:
        return '📦';
    }
  };
  
  return (
    <div className="product-recommendation-system">
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
      
      {Object.keys(recommendedProducts).length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p>No products match your current selection. Try adjusting your filters or adding more furniture to your room.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(recommendedProducts).map(([type, products]) => (
            <div key={type}>
              <h4 className="font-bold mb-3 capitalize">{type}s</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                  <div 
                    key={product.id} 
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-ikea-blue cursor-pointer transition-colors"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="aspect-w-1 aspect-h-1 bg-ikea-gray flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-2xl mb-2">
                          {getFurnitureIcon(product.type)}
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
                      <div className="mt-2 flex flex-wrap gap-1 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          product.budget === 'budget-friendly' ? 'bg-green-100 text-green-800' :
                          product.budget === 'mid-range' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {getBudgetName(product.budget)}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          {getStyleName(product.style)}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          product.assemblyDifficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          product.assemblyDifficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getDifficultyName(product.assemblyDifficulty)} Assembly
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
      
      <div className="mt-6 bg-ikea-yellow bg-opacity-20 p-4 rounded-lg">
        <h4 className="font-bold mb-2">Shopping Guide</h4>
        <p className="text-sm">
          These recommendations are based on your room goal ({roomGoal || 'not selected'}) and selected furniture.
          Click on any product to add it to your room layout. Products shown are sample representations for
          demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default ProductRecommendationSystem;
