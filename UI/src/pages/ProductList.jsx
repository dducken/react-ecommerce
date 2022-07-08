import { useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import NavMenu from "../components/NavMenu"
import PrevFooter from "../components/PrevFooter"
import Products from "../components/Products"

const Container = styled.div`
   
`
const Title = styled.h1`
   margin: 20px;
   text-transform: uppercase;
`
const FilterContainer = styled.div`
   display: flex;
   justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`
const Option = styled.option`
    
`

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2]
    const [filters,setFilters] = useState({})
    const [sort,setSort] = useState("newest")


    const handleFilters = (e) =>{
        const value = e.target.value;

        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };
    console.log("Filtro:" + filters)
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <NavMenu/>
        <Title id="all">{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Color:</FilterText>
                <Select name="color" onChange={handleFilters}>
                    <Option disabled>Seleccione</Option>
                    <Option value="white">blanco</Option>
                    <Option value="black">negro</Option>
                    <Option value="papayawhip">olmo</Option>
                    <Option value="papayawhip">roble</Option>
                    <Option value="papayawhip">pino</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Ordenar por:</FilterText>
                <Select onChange={(e)=> setSort(e.target.value)}>
                    <Option disabled value="newest">Más Vendidos</Option>
                    <Option value="asc">Menor a Mayor</Option>
                    <Option value="desc">Mayor a Menor</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <PrevFooter/>
        <Footer/>
    </Container>
  )
}

export default ProductList