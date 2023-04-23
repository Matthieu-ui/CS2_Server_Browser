import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Layout({ children }) { //children are rendered from the router
    return (
      <div className="">
      <Sidebar />
 <div className="">{children}</div>
      <Footer className="" />
    </div>
    );
  }


export default Layout;