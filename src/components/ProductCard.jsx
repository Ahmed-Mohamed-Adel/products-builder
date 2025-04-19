import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

const ProductCard = ({ product }) => {
  const { title, imageURL, description, price, category } = product;

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-300 rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={"product name"}
        className="rounded-md h-52 w-full lg:object-cover"
      />

      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description)}
      </p>

      <div className="flex items-center space-x-2 my-4">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
      </div>

      <div className="flex justify-between items-center">
        <span>${price}</span>

        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>

      <div className="flex justify-between items-center space-x-2 mt-5">
        <Button className="bg-indigo-600">EDIT</Button>
        <Button className="bg-red-600">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
