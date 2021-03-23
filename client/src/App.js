import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Categories from './components/Home/Categories';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ProductPage from './components/Product/ProductPage';
import Error404 from './components/Error404/Error404';

function App() {
   return (
      <>
         <Header />
         <Switch>
            <Route path="/" exact component={Categories} />
            <Route path="/categories/:category" exact component={Categories} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/categories/:category/:id/details" component={ProductPage}/>
            <Route component={Error404} />
         </Switch>
      </>
   );
}

export default App;
