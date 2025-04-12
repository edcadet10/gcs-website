import Link from 'next/link';
import Image from 'next/image';

export default function Card({
  title,
  description,
  image,
  href,
  className = '',
  imageClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  footerContent,
  tags,
  onClick,
  variant = 'default',
  aspectRatio = 'aspect-video',
}) {
  // Base card styles
  const baseCardStyles = `
    bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300
    ${className}
  `;

  // Card variants
  const variantStyles = {
    default: baseCardStyles,
    bordered: `${baseCardStyles} border border-gray-200`,
    elevated: `${baseCardStyles} shadow-lg hover:shadow-xl`,
    minimal: `bg-white rounded-lg overflow-hidden ${className}`,
  };
  
  // Title styles
  const baseTitleStyles = 'font-heading font-semibold text-primary text-xl';
  
  // Description styles
  const baseDescriptionStyles = 'text-gray-600 mt-2';
  
  // Content
  const cardContent = (
    <>
      {image && (
        <div className={`overflow-hidden ${aspectRatio}`}>
          <Image
            src={image}
            alt={title || 'Card image'}
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${imageClassName}`}
            width={500}
            height={aspectRatio === 'aspect-video' ? 281 : 500}
          />
        </div>
      )}
      
      <div className="p-4">
        {title && (
          <h3 className={`${baseTitleStyles} ${titleClassName}`}>
            {title}
          </h3>
        )}
        
        {description && (
          <p className={`${baseDescriptionStyles} ${descriptionClassName}`}>
            {description}
          </p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-block bg-gray-100 text-gray-700 text-xs rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {footerContent && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            {footerContent}
          </div>
        )}
      </div>
    </>
  );
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link 
        href={href} 
        className={variantStyles[variant]} 
        onClick={onClick}
      >
        {cardContent}
      </Link>
    );
  }
  
  // Otherwise render as div
  return (
    <div 
      className={variantStyles[variant]} 
      onClick={onClick}
    >
      {cardContent}
    </div>
  );
}