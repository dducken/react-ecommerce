import AnnouncementAdmin from '../components/admin/AnnouncementAdmin'
import NavAdmin from '../components/admin/NavAdmin'
import OrdersTable from '../components/datatable/OrdersTable'
import Sidebar from '../components/sidebar/Sidebar'
import '../pages/list/list.scss'

const OrderList = () => {
  return (
    <div>
    <AnnouncementAdmin/>
    <div className='list'>
        <Sidebar/>
        <div className="listContainer">
            <OrdersTable/>
        </div>
    </div>
    <NavAdmin />

    </div>
  )
}

export default OrderList