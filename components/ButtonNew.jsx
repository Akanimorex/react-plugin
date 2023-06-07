

export const ButtonNew = ({
  label,
  onClick,
  variant,
  size,
  loading,
  fullWidth,
  small,
  disabled
}) => {
  const variantClasses = `${
    variant === "secondary"
      ? "bg-gray-600 hover:bg-gray-700"
      : "bg-gray-900 hover:bg-black"
  }`;
  const smallClasses = `${small ? "text-sm py-2 px-3" : "text-base p-4"}`;
  const fullWidthClasses = `${fullWidth ? "w-full" : "w-auto"}`;

  return <button disabled={disabled} className={`p-4 bg-black text-white rounded ${variantClasses} ${fullWidthClasses} ${smallClasses} ${disabled ? 'bg-gray-400':''} `}>{label}</button>;
};
