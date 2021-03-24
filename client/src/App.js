import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import Categories from './components/Home/Categories/Categories';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Details from './components/Details/Details';
import AddProduct from './components/AddProduct/AddProduct'
import Footer from './components/Footer/Footer';
import Error404 from './components/Error404/Error404';

function App() {
   return (
      <>
         <Header />
         <Switch>
            <Route path="/" exact component={Categories} />
            <Route path="/categories/:category" exact component={Categories} />
            <Route path="/categories/:category/:id/details" component={Details} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path='/add-product' exact component={AddProduct} />;
            <Route component={Error404} />
         </Switch>
         <Footer />
      </>
   );
}

export default App;
