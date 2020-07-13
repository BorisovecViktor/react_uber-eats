import React, { useEffect } from 'react';
import './App.scss';

import { useSelector, useDispatch } from 'react-redux';
import * as store from './store';

import Header from './components/Header';
import RestaurantsPage from './pages/RestourantsPage';
// import Footer from './components/Footer';
import LazyFooter from './components/LazyFooter';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(store.getProducts);

  useEffect(() => {
    dispatch(store.loadProducts());
  }, [dispatch]
  );

  return (
    <div className="app">
      <Header />
      <div className="page">
        <main className="content">
          <RestaurantsPage products={products} />
        </main>
      </div>
      {/* <Footer /> */}
      <LazyFooter />
    </div>
  );
}

export default App;
