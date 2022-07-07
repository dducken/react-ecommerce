import { KeyboardArrowDown, MoreVertSharp } from '@material-ui/icons'
import './featured.scss'
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Featured = () => {
  return (
    <div className='featured'>
        <div className="top">
            <h1 className="title">Total ganancias</h1>
            <MoreVertSharp fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={2}></CircularProgressbar>
            </div>
            <p className="title">Total ventas de hoy</p>
            <p className="amount">$3400</p>
            <p className="desc">Pagos recientes pueden no incluirse por el momento</p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Objetivo</div>
                    <div className="itemResult">
                        <KeyboardArrowDown fontSize='small'></KeyboardArrowDown>
                        <div className="resultAmount">$13.2k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured