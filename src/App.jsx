import ProductCard from "./components/ProductCard";
import { productList } from "./data";

const App = () => {
  // ** Render
  const renderProductList = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  return (
    <main className="container mx-auto">
      <div className=" m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   p-5 gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>
    </main>
  );
};

export default App;
