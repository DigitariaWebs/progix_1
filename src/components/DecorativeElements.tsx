import React from 'react';

interface DecorativeElementsProps {
  type: 'wave-top' | 'wave-bottom';
  className?: string;
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({
  type,
  className = '',
}) => {
  if (type === 'wave-top') {
    return (
      <svg
        className={`w-full h-16 fill-current text-white ${className}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
      </svg>
    );
  }

  if (type === 'wave-bottom') {
    return (
      <svg
        className={`relative block w-full h-20 ${className}`}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          className="fill-white"
        ></path>
      </svg>
    );
  }

  return null;
};

export default DecorativeElements;
