import React, { useState, useEffect } from 'react';

const ResponsiveDesign = {
  // Media query breakpoints
  breakpoints: {
    sm: 640,  // Small devices (phones)
    md: 768,  // Medium devices (tablets)
    lg: 1024, // Large devices (desktops)
    xl: 1280  // Extra large devices (large desktops)
  },
  
  // Hook to get current window size
  useWindowSize: () => {
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
    
    return windowSize;
  },
  
  // Hook to check if screen matches a breakpoint
  useBreakpoint: (breakpoint) => {
    const { width } = ResponsiveDesign.useWindowSize();
    
    if (breakpoint === 'sm') {
      return width < ResponsiveDesign.breakpoints.sm;
    } else if (breakpoint === 'md') {
      return width >= ResponsiveDesign.breakpoints.sm && width < ResponsiveDesign.breakpoints.md;
    } else if (breakpoint === 'lg') {
      return width >= ResponsiveDesign.breakpoints.md && width < ResponsiveDesign.breakpoints.lg;
    } else if (breakpoint === 'xl') {
      return width >= ResponsiveDesign.breakpoints.lg && width < ResponsiveDesign.breakpoints.xl;
    } else if (breakpoint === '2xl') {
      return width >= ResponsiveDesign.breakpoints.xl;
    }
    
    return false;
  },
  
  // Hook to check if screen is mobile
  useMobile: () => {
    const { width } = ResponsiveDesign.useWindowSize();
    return width < ResponsiveDesign.breakpoints.md;
  },
  
  // Hook to check if screen is tablet
  useTablet: () => {
    const { width } = ResponsiveDesign.useWindowSize();
    return width >= ResponsiveDesign.breakpoints.md && width < ResponsiveDesign.breakpoints.lg;
  },
  
  // Hook to check if screen is desktop
  useDesktop: () => {
    const { width } = ResponsiveDesign.useWindowSize();
    return width >= ResponsiveDesign.breakpoints.lg;
  },
  
  // Adjust room visualization scale based on screen size
  getRoomVisualizationScale: (roomWidth, roomLength) => {
    const { width } = ResponsiveDesign.useWindowSize();
    
    // Base scale (pixels per meter)
    let scale = 100;
    
    // Adjust scale based on screen width and room dimensions
    if (width < ResponsiveDesign.breakpoints.sm) {
      // Small screens (phones)
      scale = Math.min(70, (width - 40) / roomWidth);
    } else if (width < ResponsiveDesign.breakpoints.md) {
      // Medium screens (tablets)
      scale = Math.min(80, (width - 60) / roomWidth);
    } else if (width < ResponsiveDesign.breakpoints.lg) {
      // Large screens (small desktops)
      scale = Math.min(90, (width - 80) / roomWidth);
    } else {
      // Extra large screens (large desktops)
      scale = Math.min(100, (width - 100) / roomWidth);
    }
    
    return scale;
  },
  
  // Get responsive grid columns based on screen size
  getResponsiveGridCols: () => {
    const { width } = ResponsiveDesign.useWindowSize();
    
    if (width < ResponsiveDesign.breakpoints.sm) {
      return 1; // Single column for phones
    } else if (width < ResponsiveDesign.breakpoints.md) {
      return 2; // Two columns for tablets
    } else if (width < ResponsiveDesign.breakpoints.lg) {
      return 3; // Three columns for small desktops
    } else {
      return 4; // Four columns for large desktops
    }
  },
  
  // Get responsive padding based on screen size
  getResponsivePadding: () => {
    const { width } = ResponsiveDesign.useWindowSize();
    
    if (width < ResponsiveDesign.breakpoints.sm) {
      return 'px-4 py-4'; // Smaller padding for phones
    } else if (width < ResponsiveDesign.breakpoints.md) {
      return 'px-6 py-6'; // Medium padding for tablets
    } else {
      return 'px-8 py-8'; // Larger padding for desktops
    }
  },
  
  // Get responsive font size based on screen size
  getResponsiveFontSize: (size) => {
    const { width } = ResponsiveDesign.useWindowSize();
    
    if (width < ResponsiveDesign.breakpoints.sm) {
      // Smaller font sizes for phones
      switch (size) {
        case 'xs': return 'text-xs';
        case 'sm': return 'text-xs';
        case 'base': return 'text-sm';
        case 'lg': return 'text-base';
        case 'xl': return 'text-lg';
        case '2xl': return 'text-xl';
        case '3xl': return 'text-2xl';
        case '4xl': return 'text-3xl';
        default: return 'text-sm';
      }
    } else if (width < ResponsiveDesign.breakpoints.md) {
      // Medium font sizes for tablets
      switch (size) {
        case 'xs': return 'text-xs';
        case 'sm': return 'text-sm';
        case 'base': return 'text-base';
        case 'lg': return 'text-lg';
        case 'xl': return 'text-xl';
        case '2xl': return 'text-2xl';
        case '3xl': return 'text-2xl';
        case '4xl': return 'text-3xl';
        default: return 'text-base';
      }
    } else {
      // Standard font sizes for desktops
      switch (size) {
        case 'xs': return 'text-xs';
        case 'sm': return 'text-sm';
        case 'base': return 'text-base';
        case 'lg': return 'text-lg';
        case 'xl': return 'text-xl';
        case '2xl': return 'text-2xl';
        case '3xl': return 'text-3xl';
        case '4xl': return 'text-4xl';
        default: return 'text-base';
      }
    }
  }
};

export default ResponsiveDesign;
