import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import './App.scss';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import * as store from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Order from './components/Order';
import PopupCard from './components/PopupCard';
import Error from './components/Error';


import RestaurantsPage from './pages/RestourantsPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(store.getErrorMessage);
  const visibleProducts = useSelector(store.getVisibleProducts);
  const popupStatus = useSelector(store.getPopupStatus);
  const cart = useSelector(store.getCartData);

  useEffect(() => {
    dispatch(store.loadProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify([...cart]));
  }, [cart]);

  return (
    <div className="app">
      {popupStatus && <PopupCard />}
      <div
        className={cn('layout', {
          "layout--active": popupStatus,
        })}
      >
      </div>
      <Header />
      {error
        ?
        <Error error={error} />
        :
        <div className="page">
          <main className="content">
            <Switch>
              <Redirect from="/home" to="/" />
              <Route path="/" exact>
                <RestaurantsPage products={visibleProducts} />
              </Route>
              <Route path="/cart" exact>
                <Cart />
              </Route>
              <Route path="/order" exact>
                <Order />
              </Route>
              <Route path="/restaurants/:slug">
                <RestaurantDetailsPage />
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      }
      <Footer />
    </div>
  );
}

export default App;
