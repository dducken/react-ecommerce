import AnnouncementAdmin from '../../components/admin/AnnouncementAdmin'
import NavAdmin from '../../components/admin/NavAdmin'
import ProductTable from '../../components/datatable/ProductsTable'
import Sidebar from '../../components/sidebar/Sidebar'
import './list.scss'

const ProductsList = () => {
  return (
    <div>
    <AnnouncementAdmin/>
    <div className='list'>
        <Sidebar/>
        <div className="listContainer">
            <ProductTable/>
        </div>
    </div>
    </div>
  )
}

export default ProductsList