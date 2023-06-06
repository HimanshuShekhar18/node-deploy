import Product from "./Product";
import { useEffect, useState } from "react";
import ProductsData from "./data";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState(ProductsData);
  const [total, setTotal] = useState(0);

  const handleClick = async (id) => {
    // database se delete karne ko
    const res = await axios.delete(`/products/${id}`);
    console.log(res.data);
    // frontend se delete karne ko
    setProducts(products.filter((p) => p._id !== res.data._id));
  };

  const getProducts = async () => {
    const res = await axios.get("/products");
    //   --> server ka URL and /products --> API from mongodb
    console.log(res);
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
    </>
  );
};

export default ProductList;
