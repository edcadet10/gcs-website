import Image from 'next/image';

export default function Loader({
  size = 'md',
  color = 'primary',
  className = '',
  text,
  fullScreen = false,
}) {
  // Size variations
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  // Color variations
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    accent: 'text-accent',
    gray: 'text-gray-400',
  };
  
  // Get the corresponding size and color classes
  const sizeClass = sizeMap[size] || sizeMap.md;
  const colorClass = colorMap[color] || colorMap.primary;
  
  // Loader with custom GCS image
  const loaderImage = (
    <div className={`animate-spin image-container ${sizeClass} ${className}`}>
      <Image 
        src="/assets/images/ui/gcs-loader-image.png"
        alt="Loading..." 
        fill
        style={{ objectFit: "contain" }}
        className={colorClass}
        priority
      />
    </div>
  );
  
  // Always use the GCS loader image
  const useFallbackLoader = false;
  
  // Loader SVG (fallback)
  const loaderSvg = (
    <svg 
      className={`animate-spin ${sizeClass} ${colorClass} ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Use the appropriate loader based on configuration
  const loader = useFallbackLoader ? loaderSvg : loaderImage;
  
  // If fullScreen is true, center the loader in the viewport
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="text-center">
          {loader}
          {text && <p className={`mt-3 ${colorClass}`}>{text}</p>}
        </div>
      </div>
    );
  }
  
  // If text is provided, render with text
  if (text) {
    return (
      <div className="flex flex-col items-center justify-center">
        {loader}
        <p className={`mt-2 ${colorClass}`}>{text}</p>
      </div>
    );
  }
  
  // Otherwise, just render the loader
  return loader;
}