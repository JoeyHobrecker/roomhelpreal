import React, { useState, useEffect } from 'react';

const ProductDatabase = {
  // Sample IKEA product database
  products: [
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
      assemblyDifficulty: 'medium',
      color: '#e4d4a7'
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
      assemblyDifficulty: 'hard',
      color: '#8b4513'
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
      assemblyDifficulty: 'easy',
      color: '#f5deb3'
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
      assemblyDifficulty: 'medium',
      color: '#ffffff'
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
      assemblyDifficulty: 'hard',
      color: '#d3d3d3'
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
      assemblyDifficulty: 'easy',
      color: '#ffffff'
    },
    
    // Sofas
    {
      id: 'sofa-1',
      name: 'KIVIK',
      type: 'sofa',
      description: 'Sofa',
      dimensions: '3-seat, 228x95 cm',
      price: 599,
      image: 'kivik_sofa.jpg',
      budget: 'premium',
      style: 'scandinavian',
      assemblyDifficulty: 'medium',
      color: '#d3d3d3'
    },
    {
      id: 'sofa-2',
      name: 'KLIPPAN',
      type: 'sofa',
      description: 'Loveseat',
      dimensions: '2-seat, 180x88 cm',
      price: 299,
      image: 'klippan_sofa.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'easy',
      color: '#d3d3d3'
    },
    {
      id: 'sofa-3',
      name: 'FRIHETEN',
      type: 'sofa',
      description: 'Sleeper sofa',
      dimensions: '3-seat, 225x105 cm',
      price: 599,
      image: 'friheten_sofa.jpg',
      budget: 'premium',
      style: 'modern',
      assemblyDifficulty: 'hard',
      color: '#808080'
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
      assemblyDifficulty: 'medium',
      color: '#ffffff'
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
      assemblyDifficulty: 'easy',
      color: '#ffffff'
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
      assemblyDifficulty: 'hard',
      color: '#8b4513'
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
      assemblyDifficulty: 'medium',
      color: '#f5deb3'
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
      assemblyDifficulty: 'hard',
      color: '#8b4513'
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
      assemblyDifficulty: 'easy',
      color: '#ffffff'
    },
    
    // Chairs
    {
      id: 'chair-1',
      name: 'POÄNG',
      type: 'chair',
      description: 'Armchair',
      dimensions: '68x82x100 cm',
      price: 129,
      image: 'poang_chair.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'easy',
      color: '#f5deb3'
    },
    {
      id: 'chair-2',
      name: 'STRANDMON',
      type: 'chair',
      description: 'Wing chair',
      dimensions: '82x96x101 cm',
      price: 279,
      image: 'strandmon_chair.jpg',
      budget: 'premium',
      style: 'traditional',
      assemblyDifficulty: 'medium',
      color: '#d3d3d3'
    },
    {
      id: 'chair-3',
      name: 'FANBYN',
      type: 'chair',
      description: 'Chair',
      dimensions: '58x59x82 cm',
      price: 49,
      image: 'fanbyn_chair.jpg',
      budget: 'budget-friendly',
      style: 'modern',
      assemblyDifficulty: 'easy',
      color: '#ffffff'
    },
    
    // Dressers
    {
      id: 'dresser-1',
      name: 'MALM',
      type: 'dresser',
      description: '6-drawer dresser',
      dimensions: '160x48x78 cm',
      price: 179,
      image: 'malm_dresser.jpg',
      budget: 'mid-range',
      style: 'scandinavian',
      assemblyDifficulty: 'hard',
      color: '#ffffff'
    },
    {
      id: 'dresser-2',
      name: 'HEMNES',
      type: 'dresser',
      description: '8-drawer dresser',
      dimensions: '160x50x96 cm',
      price: 249,
      image: 'hemnes_dresser.jpg',
      budget: 'premium',
      style: 'traditional',
      assemblyDifficulty: 'hard',
      color: '#8b4513'
    },
    {
      id: 'dresser-3',
      name: 'KULLEN',
      type: 'dresser',
      description: '5-drawer dresser',
      dimensions: '70x40x112 cm',
      price: 69,
      image: 'kullen_dresser.jpg',
      budget: 'budget-friendly',
      style: 'minimalist',
      assemblyDifficulty: 'medium',
      color: '#d3d3d3'
    },
    
    // Nightstands
    {
      id: 'nightstand-1',
      name: 'HEMNES',
      type: 'nightstand',
      description: 'Nightstand',
      dimensions: '46x35x70 cm',
      price: 69,
      image: 'hemnes_nightstand.jpg',
      budget: 'mid-range',
      style: 'traditional',
      assemblyDifficulty: 'medium',
      color: '#8b4513'
    },
    {
      id: 'nightstand-2',
      name: 'MALM',
      type: 'nightstand',
      description: '2-drawer chest',
      dimensions: '40x48x55 cm',
      price: 49,
      image: 'malm_nightstand.jpg',
      budget: 'budget-friendly',
      style: 'scandinavian',
      assemblyDifficulty: 'medium',
      color: '#ffffff'
    },
    {
      id: 'nightstand-3',
      name: 'NORDLI',
      type: 'nightstand',
      description: 'Nightstand',
      dimensions: '30x50x67 cm',
      price: 89,
      image: 'nordli_nightstand.jpg',
      budget: 'premium',
      style: 'modern',
      assemblyDifficulty: 'medium',
      color: '#ffffff'
    }
  ],
  
  // Get all products
  getAllProducts: function() {
    return this.products;
  },
  
  // Get products by type
  getProductsByType: function(type) {
    return this.products.filter(product => product.type === type);
  },
  
  // Get products by budget
  getProductsByBudget: function(budget) {
    if (budget === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.budget === budget);
  },
  
  // Get products by style
  getProductsByStyle: function(style) {
    if (style === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.style === style);
  },
  
  // Get products by assembly difficulty
  getProductsByAssemblyDifficulty: function(difficulty) {
    if (difficulty === 'all') {
      return this.products;
    }
    return this.products.filter(product => product.assemblyDifficulty === difficulty);
  },
  
  // Get products by multiple filters
  getFilteredProducts: function(filters) {
    let filteredProducts = this.products;
    
    if (filters.type && filters.type !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.type === filters.type);
    }
    
    if (filters.budget && filters.budget !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.budget === filters.budget);
    }
    
    if (filters.style && filters.style !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.style === filters.style);
    }
    
    if (filters.assemblyDifficulty && filters.assemblyDifficulty !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.assemblyDifficulty === filters.assemblyDifficulty);
    }
    
    return filteredProducts;
  },
  
  // Get recommended products based on room goal and furniture types
  getRecommendedProducts: function(goal, furnitureTypes, budget = 'all') {
    let recommendedStyle;
    
    // Determine recommended style based on goal
    switch (goal) {
      case 'productivity':
        recommendedStyle = 'modern';
        break;
      case 'relaxation':
        recommendedStyle = 'traditional';
        break;
      case 'social':
        recommendedStyle = 'scandinavian';
        break;
      default:
        recommendedStyle = 'all';
    }
    
    // Filter products by furniture types, recommended style, and budget
    let recommendations = [];
    
    furnitureTypes.forEach(type => {
      const typeProducts = this.getFilteredProducts({
        type,
        style: recommendedStyle,
        budget
      });
      
      // If no products match the recommended style, fall back to any style
      if (typeProducts.length === 0) {
        const fallbackProducts = this.getFilteredProducts({
          type,
          budget
        });
        
        recommendations = recommendations.concat(fallbackProducts);
      } else {
        recommendations = recommendations.concat(typeProducts);
      }
    });
    
    return recommendations;
  },
  
  // Get furniture dimensions in meters
  getFurnitureDimensions: function(productId) {
    const product = this.products.find(p => p.id === productId);
    
    if (!product) {
      return null;
    }
    
    // Parse dimensions string to get width and depth in meters
    const dimensionsRegex = /(\d+)x(\d+)/;
    const match = product.dimensions.match(dimensionsRegex);
    
    if (!match) {
      // Default dimensions if parsing fails
      return {
        width: 1,
        depth: 1
      };
    }
    
    return {
      width: parseInt(match[1]) / 100, // Convert cm to meters
      depth: parseInt(match[2]) / 100  // Convert cm to meters
    };
  },
  
  // Create furniture object from product
  createFurnitureFromProduct: function(product, position = { x: 0, y: 0 }) {
    const dimensions = this.getFurnitureDimensions(product.id);
    
    return {
      id: product.id,
      type: product.type,
      name: product.name,
      width: dimensions.width,
      depth: dimensions.depth,
      x: position.x,
      y: position.y,
      color: product.color || '#e4d4a7'
    };
  }
};

export default ProductDatabase;
