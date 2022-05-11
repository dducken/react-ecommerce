import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styledComponents.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  

  // Filtrar por categoria
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );

          setProducts(res.data.products);
          setFilteredProducts(res.data.products);
  
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  // Filtrar por categoria y filtros
  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter((item)=>{
        return(
          Object.entries(filters).every(([key,value])=>{
            return(
              item[key].includes(value)
              
            )
          })
        )
      })
    )
    console.log(filteredProducts)
  }, [products, cat, filters])

  // Ordenar por
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
     {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
