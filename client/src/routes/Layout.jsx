import Sidebar from "../components/Sidebar";
function Layout({ children }) {
    return (
      <div>
        <Sidebar />
        <div className="ml-48">{children}</div>
      </div>
    );
  }


export default Layout;