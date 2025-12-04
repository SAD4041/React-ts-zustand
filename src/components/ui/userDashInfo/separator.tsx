import React from 'react';

const Separator: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`border-t border-[#C0C0C0] ${className}`}></div>;
};

export default Separator;