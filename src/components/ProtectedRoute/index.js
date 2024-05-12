import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  // console.log(props)
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
  /** <Route {...props} /> <---> <Route exact path="/" component={Home} /> */
  /** Here "exact" keyword is a "boolean attribute" to the Route Component. It is same as "exact={true}" */
}

export default ProtectedRoute
