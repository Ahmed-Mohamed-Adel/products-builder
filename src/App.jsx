import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CicleColor from "./components/ui/CicleColor";
import { v4 as uuidv4 } from "uuid";
import Select from "./components/ui/Select";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /* ------- State -------  */
  const [products, setProducts] = useState(productList);
  const [product, setProduct] = useState(defaultProductObj);
  const [productToEdit, setProductToEdit] = useState(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /* ------- Handler -------  */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);

  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const onChangeHandler = () => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = () => {
    const { value, name } = event.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProductToEdit(defaultProductObj);
    closeEditModal();
  };
  const removeProductHandler = () => {
    console.log("Product Id", productToEdit.id);
    const filtered = products.filter(
      (product) => product.id != productToEdit.id
    );

    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const submitHandler = () => {
    event.preventDefault();

    const { title, description, imageURL, price } = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    // ** Check if any property has a value of "" && Check if All Properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    console.log({ ...product, id: uuidv4() });
    setProducts((prev) => [
      {
        ...product,
        id: uuidv4(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
    toast("Product has been Added", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  const submitEditHandler = () => {
    event.preventDefault();

    const { title, description, imageURL, price, colors } = productToEdit;

    const updatedColors = tempColors.concat(productToEdit.colors);

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: updatedColors,
    });

    // ** Check if any property has a value of "" && Check if All Properties have a value of ""
    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: updatedColors,
    };
    console.log(tempColors.concat(productToEdit.colors));
    setProducts(updatedProducts);

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
    toast("Product has been Updated", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  /* ------- Render -------  */
  const renderProductList = products.map((product, idx) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setProductToEdit={setProductToEdit}
        openEditModal={openEditModal}
        setProductToEditIdx={setProductToEditIdx}
        idx={idx}
        openConfirmModal={openConfirmModal}
      />
    );
  });

  const renderProductEditWithErrorMsg = (id, label, name) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[1px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type={"title"}
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  const renderFormInputList = formInputsList.map((input) => {
    return (
      <div className="flex flex-col" key={input.id}>
        <label
          htmlFor={input.id}
          className="mb-[1px] text-sm font-medium text-gray-700"
        >
          {input.label}
        </label>
        <Input
          type={input.type}
          id={input.id}
          name={input.name}
          value={product[input.name]}
          onChange={onChangeHandler}
        />
        <ErrorMessage msg={errors[input.name]} />
      </div>
    );
  });

  const renderProductColors = colors.map((color) => {
    return (
      <CicleColor
        key={color}
        color={color}
        onClick={() => {
          let updatedColors;

          if (tempColors.includes(color)) {
            updatedColors = tempColors.filter((item) => item !== color);
          }
          if (productToEdit.colors.includes(color)) {
            updatedColors = tempColors.filter((item) => item !== color);
          } else {
            updatedColors = [...tempColors, color];
          }

          setTempColors(updatedColors);

          if (updatedColors.length > 0) {
            setErrors({ ...errors, colors: "" });
          }
        }}
      />
    );
  });

  return (
    <main className="container mx-auto">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        width="fit"
        onClick={open}
      >
        Build a Product
      </Button>
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5 gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>

      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} close={close} title={"ADD A NEW PRODUCT"}>
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center space-x-1">
            {renderProductColors}
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-[#f5f5fa] hover:bg-gray-300"
              onClick={onCancel}
              style={{ color: "black" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT PRODUCT MODAL */}
      <Modal
        isOpen={isOpenEditModal}
        close={closeEditModal}
        title={"EDIT THIS PRODUCT"}
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Tilte", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({
                ...productToEdit,
                category: value,
              });
            }}
          />

          <div className="flex items-center space-x-1">
            {renderProductColors}
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* DELETE PRODUCT CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        close={closeEditModal}
        title="Are you sure you want to remove this product from ypur Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history and other related information will also be deleted. Please make sure this is the intended action"
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            className=" bg-[#f5f5fa] hover:bg-gray-300"
            onClick={closeConfirmModal}
            style={{ color: "black" }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
};

export default App;
