const Button = ({ children, className, width = "w-full", ...rest }) => {
  return (
    <button
      className={`${className} ${width} py-2  rounded-lg text-white duration-200 cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
