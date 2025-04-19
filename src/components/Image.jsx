const Image = ({ imageURL, alt, className }) => {
  return <img src={imageURL} alt={alt} className={className} />;
};

export default Image;
