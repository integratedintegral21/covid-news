import {Link, Outlet} from "react-router-dom";
import "./Layout.css"

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <br/>
      <Outlet />
    </>
  )
}

export default Layout;