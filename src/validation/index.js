// ** productObj === errorsObj (TITLE, DESCRIPTION, IMAGE, PRICE)

export const productValidation = (product) => {
  // ** Returns an Object
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  // const vaildUrl = /^(ftp|http|https)\/\/[^ "]+$/.test(product.imageURL);

  const vaildUrl = product.imageURL.startsWith("http");

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters!";
  }

  if (!product.imageURL.trim() || !vaildUrl) {
    errors.imageURL = "Valid image URL is requied";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is requied!";
  }

  return errors;
};
