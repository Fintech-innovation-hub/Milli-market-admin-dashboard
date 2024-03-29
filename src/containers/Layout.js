import PageContent from "./PageContent"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from './RightSidebar'
import 'react-notifications/lib/notifications.css';
import ModalLayout from "./ModalLayout"


function Layout() {


  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent />
        <LeftSidebar />
      </div>
      <RightSidebar />
      <ModalLayout />
    </>
  )
}

export default Layout