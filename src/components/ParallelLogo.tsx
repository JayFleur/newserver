import React from 'react';

interface ParallelLogoProps {
  className?: string;
}

const ParallelLogo: React.FC<ParallelLogoProps> = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0L40 40V0H0Z"
        fill="white"
      />
    </svg>
  );
};

export default ParallelLogo;