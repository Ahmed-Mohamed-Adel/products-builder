import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

const App = () => {
  // ** State
  const [isOpen, setIsOpen] = useState(false);

  // ** Handler
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  // ** Render
  const renderProductList = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  const renderFormInputList = formInputsList.map((input) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={input.id}
          className="mb-[1px] text-sm font-medium text-gray-700"
        >
          {input.label}
        </label>
        <Input type={input.type} id={input.id} name={input.name} />
      </div>
    );
  });

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-700 hover:bg-indigo-800 " onClick={open}>
        Add
      </Button>
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   p-5 gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} close={close} title={"ADD A NEW PRODUCT"}>
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-3 ">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
