import { Outlet } from "react-router-dom"
import PageNav from "../../components/PageNav/PageNav"

function MasterLayout() {
    return (
        <div>
            <PageNav/>
            <Outlet/>
        </div>
    )
}

export default MasterLayout
