import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
function Layout({ children }) {
    return (
      <div className="flex flex-col min-h-screen">
      <Sidebar />
 <div className="flex-1 ml-48 min-h-screen">{children}</div>
      <Footer className="mt-auto" />
    </div>
    );
  }


export default Layout;