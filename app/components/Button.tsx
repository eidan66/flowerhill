import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    rounded-md
  `;

  const variantClasses = {
    primary: `
      bg-green-800
      hover:bg-green-900
      text-white
      focus-visible:ring-green-800
    `,
    secondary: `
      bg-amber-50
      hover:bg-amber-100
      text-gray-800
      focus-visible:ring-amber-50
    `,
    accent: `
      bg-purple-700
      hover:bg-purple-800
      text-white
      focus-visible:ring-purple-700
    `,
    outline: `
      border border-gray-500
      bg-transparent
      hover:bg-gray-100
      text-gray-800
      focus-visible:ring-gray-500
    `,
    ghost: `
      bg-transparent
      hover:bg-gray-100
      text-gray-800
      focus-visible:ring-gray-500
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `.trim();

  return (
    <button
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;