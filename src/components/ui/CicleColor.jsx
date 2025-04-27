const CicleColor = ({ color, ...rest }) => {
  return (
    <span
      className={`block w-5 h-5  rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};

export default CicleColor;
