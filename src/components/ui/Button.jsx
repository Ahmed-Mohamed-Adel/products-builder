const Button = ({ children, className, width = "w-full", ...rest }) => {
  return (
    <button
      className={`${className} ${width} py-2 w-full rounded-md text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
