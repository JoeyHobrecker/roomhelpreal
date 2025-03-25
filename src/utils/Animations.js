import React from 'react';

const Animations = {
  // CSS transition classes
  transitions: {
    fast: 'transition-all duration-150 ease-in-out',
    medium: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
    bounce: 'transition-all duration-300 ease-in-out hover:scale-105 active:scale-95',
    expand: 'transition-all duration-300 ease-in-out hover:scale-102',
    highlight: 'transition-all duration-300 ease-in-out hover:bg-opacity-90',
    fadeIn: 'animate-fadeIn',
    slideIn: 'animate-slideIn',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    ping: 'animate-ping'
  },
  
  // Animation keyframes (to be added to global CSS)
  keyframes: `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes slideIn {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInFromRight {
      0% { transform: translateX(20px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes scaleIn {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  
  // Animation utility classes (to be added to global CSS)
  utilityClasses: `
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    .animate-slideIn {
      animation: slideIn 0.5s ease-in-out;
    }
    
    .animate-slideInFromRight {
      animation: slideInFromRight 0.5s ease-in-out;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.5s ease-in-out;
    }
    
    .delay-100 {
      animation-delay: 100ms;
    }
    
    .delay-200 {
      animation-delay: 200ms;
    }
    
    .delay-300 {
      animation-delay: 300ms;
    }
    
    .delay-400 {
      animation-delay: 400ms;
    }
    
    .delay-500 {
      animation-delay: 500ms;
    }
  `,
  
  // Component for animated transitions between steps
  StepTransition: ({ children, step, direction = 'horizontal' }) => {
    const getAnimationClass = () => {
      if (direction === 'horizontal') {
        return 'animate-slideInFromRight';
      } else {
        return 'animate-slideIn';
      }
    };
    
    return (
      <div key={step} className={getAnimationClass()}>
        {children}
      </div>
    );
  },
  
  // Component for animated list items
  AnimatedList: ({ items, renderItem, className = '' }) => {
    return (
      <div className={className}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`animate-slideIn`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  },
  
  // Component for animated buttons
  AnimatedButton: ({ children, onClick, className = '', variant = 'primary' }) => {
    const getButtonClass = () => {
      switch (variant) {
        case 'primary':
          return 'bg-ikea-blue text-white hover:bg-ikea-dark-blue';
        case 'secondary':
          return 'bg-ikea-yellow text-black hover:bg-yellow-500';
        case 'outline':
          return 'border border-gray-300 text-gray-700 hover:bg-gray-100';
        default:
          return 'bg-ikea-blue text-white hover:bg-ikea-dark-blue';
      }
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${Animations.transitions.bounce} ${getButtonClass()} rounded-ikea py-2 px-4 ${className}`}
      >
        {children}
      </button>
    );
  },
  
  // Component for animated cards
  AnimatedCard: ({ children, className = '', onClick }) => {
    return (
      <div 
        className={`${Animations.transitions.medium} bg-white rounded-lg shadow-ikea p-4 hover:shadow-lg ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
  
  // Component for animated icons
  AnimatedIcon: ({ icon, className = '', animation = 'none' }) => {
    const getAnimationClass = () => {
      switch (animation) {
        case 'spin':
          return 'animate-spin';
        case 'pulse':
          return 'animate-pulse';
        case 'ping':
          return 'animate-ping';
        default:
          return '';
      }
    };
    
    return (
      <div className={`${getAnimationClass()} ${className}`}>
        {icon}
      </div>
    );
  },
  
  // Component for loading spinner
  LoadingSpinner: ({ size = 'medium', color = 'blue' }) => {
    const getSizeClass = () => {
      switch (size) {
        case 'small':
          return 'w-4 h-4';
        case 'medium':
          return 'w-8 h-8';
        case 'large':
          return 'w-12 h-12';
        default:
          return 'w-8 h-8';
      }
    };
    
    const getColorClass = () => {
      switch (color) {
        case 'blue':
          return 'text-ikea-blue';
        case 'yellow':
          return 'text-ikea-yellow';
        case 'gray':
          return 'text-gray-500';
        default:
          return 'text-ikea-blue';
      }
    };
    
    return (
      <div className="flex justify-center items-center">
        <svg 
          className={`animate-spin ${getSizeClass()} ${getColorClass()}`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }
};

export default Animations;
