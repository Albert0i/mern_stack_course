import { Outlet } from 'react-router-dom'
import Header from './DashHeader'
import Footer from './DashFooter'

const DashLayout = () => {
  return (
    <>
        <Header />
        <div className="dash-container">            
            <Outlet />            
        </div>
        <Footer />
    </>
  )
}

export default DashLayout