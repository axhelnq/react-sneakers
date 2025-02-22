import axios from "axios"
import AppContext from "./context.js"
import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import Header from "./components/Header.jsx"
import Drawer from "./components/Drawer/Drawer.jsx"

import Home from "./pages/Home.jsx"
import Orders from "./pages/Orders.jsx"
import Favorites from "./pages/Favorites.jsx"

export default function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)

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
      const findItem = favorites.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/favorites/${findItem.id}`)
      } else {
        setFavorites(prev => [...prev, obj])
        const { data } = await axios.post('https://67a7311c203008941f66e0f7.mockapi.io/favorites', obj)
        setFavorites(prev => prev.map(item => {
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
          onClickClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}