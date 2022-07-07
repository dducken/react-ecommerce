import styledComponents from "styled-components"
import { categories } from "../data"
import { mobile } from "../responsive"
import CategoryItem from "./CategoryItem"

const Container = styledComponents.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${mobile({ padding: "0px",flexDirection:"column"})}
`
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
    padding: 15px 25px;
    font-size: 18px;
    font-weight: normal;
    display: inline-block;
    border-color: #040404;
    background-color: #fff;

`;
const TitleLine = styledComponents.hr`
  display: block;
  overflow: hidden;
  margin: -28px 25px 5px 25px;
  border-top: 1px solid #040404;

`;

const Categories = () => {
  return (
    <div>
      {/* <TitleContainer>
        <Title>Categorias</Title>
        <TitleLine />
      </TitleContainer> */}
    
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
    </div>
  )
}

export default Categories