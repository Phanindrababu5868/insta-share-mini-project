import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dpj2drryk/image/upload/v1651907552/Group_kgw16h.png"
      alt="page not found"
      className="not-found-img"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found.
      <br /> Please go back to the homepage.
    </p>
    <Link to="/" className="not-found-link">
      <button type="button" className="not-found-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
