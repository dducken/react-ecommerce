import AnnouncementAdmin from '../components/admin/AnnouncementAdmin'
import NavAdmin from '../components/admin/NavAdmin'
import RemitosTable from '../components/datatable/RemitosTable'
import Sidebar from '../components/sidebar/Sidebar'
import '../pages/list/list.scss'

const RemitoList = () => {
  return (
    <div>
    <AnnouncementAdmin/>
    <div className='list'>
        <Sidebar/>
        <div className="listContainer">
            <RemitosTable/>
        </div>
    </div>

    </div>
  )
}

export default RemitoList