import { useEffect } from 'react';
import { State } from './state/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import { getProfile } from './state/actions/authActions';

//import components
import Header from './components/Header/Header';

//import pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Listing from './pages/Listing/Listing';
import SingleListing from './pages/Listing/SingleListing';
import CreateListing from './pages/CreateListing/CreateListing';

const App = () => {

   const dispatch = useDispatch();
   const { isLoggedIn } = useSelector((state: State) => state.auth)

   useEffect(() => {
      if (isLoggedIn) {
         dispatch(getProfile())
      }
   }, [])

   return (
      <>
         <Router>
            <Header />
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/listings" component={Listing} />
               <ProtectedRoute exact path="/listings/create" component={CreateListing} />
               <Route exact path="/listings/:id" component={SingleListing} />
               <Route exact path="/contact" component={() => <div>Contact us</div>} />
               <GuestRoute exact path="/login" component={Login} />
               <GuestRoute exact path="/signup" component={Signup} />
            </Switch>
         </Router>
      </>
   );
}

export default App;
