import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context.js";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";

export default function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData(){
      setIsLoading(true)

      const cartResponse = await axios.get('https://67a7311c203008941f66e0f7.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://67a7311c203008941f66e0f7.mockapi.io/favorites')
      const itemsResponse = await axios.get('https://67a7311c203008941f66e0f7.mockapi.io/items')

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${obj.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://67a7311c203008941f66e0f7.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, data])
      }
    } catch (error) {
      console.error('❌ Помилка при додаванні/видаленні товара з кошика:', error)
    }
  }

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
      } else {
        const { data } = await axios.post('https://67a7311c203008941f66e0f7.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      console.error('❌ Помилка при додаванні/видаленні товара з улюблених:', error)
    }
  }

  const isItemAddedToCart = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAddedToCart,
        setCartOpened,
      }}
    >
      <div className="wrapper clear">
        {cartOpened &&
          <Drawer
            cartItems={cartItems}
            onClickClose={() => setCartOpened(false)}
            setCartItems={setCartItems}
          />
        }
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                favorites={favorites}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}