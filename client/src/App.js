import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';


import Header from './components/Header/Header';
import TopProducts from './components/Products/TopProducts'
function App() {
   return (
      <>
         <Header />
         <Image src="http://store.picbg.net/pubpic/46/C5/4241166cd1c646c5.jpg" fluid />
         <TopProducts />
      </>
   );
}

export default App;
