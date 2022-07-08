import AnnouncementAdmin from '../../components/admin/AnnouncementAdmin'
import NavAdmin from '../../components/admin/NavAdmin'
import Datatable from '../../components/datatable/Datatable'
import Sidebar from '../../components/sidebar/Sidebar'
import './list.scss'

const List = () => {
  return (
    <div>
    <AnnouncementAdmin/>
    <div className='list'>
        <Sidebar/>
        <div className="listContainer">
            <Datatable/>
        </div>
    </div>
    <NavAdmin />

    </div>
  )
}

export default List