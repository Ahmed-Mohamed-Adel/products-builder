import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CicleColor from "./ui/CicleColor";

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}) => {
  const { title, imageURL, description, price, colors, category } = product;

  /* ------- Render -------  */
  const renderProductColors = colors.map((color) => {
    return <CicleColor key={color} color={color} />;
  });

  /* ------- Handler------  */
  const onEdit = () => {
    setProductToEdit(product);
    console.log(product);
    openEditModal();
    setProductToEditIdx(idx);
  };

  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border border-gray-300 rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={"product name"}
        className="rounded-md h-52 w-[312px] md:w-full lg:object-cover"
      />

      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description)}
      </p>

      <div className="flex items-center space-x-2 my-2">
        {renderProductColors}
      </div>

      <div className="flex items-center flex-wrap space-x-1">
        {!colors.length ? (
          <p className="min-h-[20px]">Not available colors</p>
        ) : (
          renderProductColors
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>

        <div className="flex justify-between items-center space-x-3">
          <span className="text-lg text-indigo-600 font-semibold">
            {category.name}
          </span>

          <Image
            imageURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2 mt-5">
        <Button className="bg-indigo-600" onClick={onEdit}>
          EDIT
        </Button>
        <Button onClick={onRemove} className="bg-red-600">
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
