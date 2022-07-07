import { useCallback, useEffect, useState } from "react";
import "../components/form/formInput.css";
import styledComponents from "styled-components";
import Product from "./Product";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { mobile } from "../responsive";

const Container = styledComponents.div`
    padding: 45px 180px 80px 180px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  ${mobile({ padding: '45px 0 0 1px' })}

    
`;
const TitleContainer = styledComponents.div`
  text-align: center;
  margin: 20px 0;
  float: left;
  width: 100%;
`;
const Title = styledComponents.h1`
    font-size: 30px;
    font-weight: 500;
    border: 1px solid;
    padding: 10px 25px;
    font-size: 18px;
    font-weight: normal;
    display: inline-block;
    border-color: #040404;
    color: black;
    background-color: #fff;

`;
const TitleLine = styledComponents.hr`
  display: block;
  overflow: hidden;
  margin: -31px 190px 5px 190px;
  border-top: 1px solid #040404;
  opacity:1;
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
  const filterProducts = () => {
    cat &&
    setFilteredProducts(
      products.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          return item[key].includes(value);
        });
      })
    );
  }
  useEffect(() => {
    filterProducts();
  }, []);

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

  // Paginacion
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((item) => {
      return <Product item={item} key={item.id} />;
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <TitleContainer>
        <Title>Productos</Title>
        <TitleLine />
      </TitleContainer>
      <Container>
        {cat
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : displayProducts}
        {displayProducts && (
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagContainer"}
            previousLinkClassName={"prevButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"pagDisabled"}
            activeClassName={"pagActive"}
          />
        )}
      </Container>
    </div>
  );
};

export default Products;
