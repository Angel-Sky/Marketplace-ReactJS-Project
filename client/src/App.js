import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import Header from './components/Header/Header';
import Categories from './components/Categories/Categorie';

function App() {
   return (
      <>
         <Header />
         <Image src="http://store.picbg.net/pubpic/46/C5/4241166cd1c646c5.jpg" fluid />
         <Switch>
            <Route path="/" exact component={Categories} />
            <Route path="/categories/:category" component={Categories} />
         </Switch>
         {/* <Categories />
         <TopProducts /> */}
      </>
   );
}

export default App;
