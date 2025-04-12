import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    // Only execute this on the client side
    if (typeof window === 'undefined') {
      return;
    }
    
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount
  
  return windowSize;
};

// Add some helper methods for responsive design
export const useResponsive = () => {
  const { width } = useWindowSize();
  
  return {
    isMobile: width ? width < 768 : false,
    isTablet: width ? width >= 768 && width < 1024 : false,
    isDesktop: width ? width >= 1024 : true,
    isLargeDesktop: width ? width >= 1280 : true,
  };
};