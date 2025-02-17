import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer/Drawer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context.js";

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import Orders from "./pages/Orders.jsx";

export default function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData(){
      try {
        setIsLoading(true)

        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://67a7311c203008941f66e0f7.mockapi.io/cart'),
          axios.get('https://67a7311c203008941f66e0f7.mockapi.io/favorites'),
          axios.get('https://67a7311c203008941f66e0f7.mockapi.io/items')
        ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        console.log('❌ Помилка при запиті даних', error)
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post('https://67a7311c203008941f66e0f7.mockapi.io/cart', obj)
        setCartItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
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
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAddedToCart,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavorites,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          cartItems={cartItems}
          onClickClose={() => setCartOpened(false)}
          setCartItems={setCartItems}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route
            path="/"
            element={
              <Home // context
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
              <Favorites // context
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders
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
// Пофіксити баг з з'їздом верстки коли кошик відкритий
// зробити закриття кошика коли клікнули не по ньому або нажало esc
// вирівняти іконки в хедері з текстом і корзину шрифт жирніший
// fav зарефакторити як з корзиною було
// добавити кнопки "назад" на фам і ордерс
// зробити пустий ордерс і фав
// в фавах криво працює added