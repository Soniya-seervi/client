import main from "../assets/images/main.svg"
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
            <h1>
              job <span> Tracking </span> App 
            </h1>
            <p>
            Sed ut perspiciatis unde omnis iste natus error 
            sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
             vitae dicta sunt explicabo.
            </p>
            <Link to="/register" className="btn btn-hero">
                Login/Register
            </Link>
        </div>
        <img src={main} alt = "job hunt"  className= "main main-img"/>
      </div>
    </Wrapper>
  )
}

export default Landing

