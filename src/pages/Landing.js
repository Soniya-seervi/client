import main from "../assets/images/main.svg"
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import {Link, Navigate} from 'react-router-dom'
import { useAppContext } from "../context/appContext"

const Landing = () => {

  const {user} = useAppContext()

  return (
    <>
      {user && <Navigate to='/'/>}
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
              JobTrack - an application to keep a track of your job applications. 
              You can add new jobs, edit and delete jobs. It also shows statistical 
              figures on your job lists. There is a dashboard page and a profile page.
              </p>
              <Link to="/register" className="btn btn-hero">
                  Login/Register
              </Link>
          </div>
          <img src={main} alt = "job hunt"  className= "main main-img"/>
        </div>
      </Wrapper>
    </>
  )
}

export default Landing

