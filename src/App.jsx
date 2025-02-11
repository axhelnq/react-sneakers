import Card from "./components/Card/Card.jsx";
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    axios.get('https://67a7311c203008941f66e0f7.mockapi.io/items')
    .then(res => setItems(res.data))
    .catch((error) => console.error('❌ Помилка при завантаженні даних про товари:', error))
    axios.get('https://67a7311c203008941f66e0f7.mockapi.io/cart')
      .then(res => setCartItems(res.data))
      .catch((error) => console.error('❌ Помилка при завантаженні даних про товари в корзині:', error))
  }, [])

  if (cartOpened) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  const onAddToCart = (obj) => {
    axios.post('https://67a7311c203008941f66e0f7.mockapi.io/cart', obj)
      .catch((error) => console.error('❌ Помилка при додавання товара в кошик:', error))
    setCartItems(prev => [...prev, obj])
  }

  const onAddToFavorites = (obj) => {
    axios.post('https://67a7311c203008941f66e0f7.mockapi.io/favorites', obj)
      .catch((error) => console.error('❌ Помилка при додавання товара в улюблені:', error))
    setFavorites(prev => [...prev, obj])
  }

  return (
    <div className="wrapper clear">
      {cartOpened &&
        <Drawer
          cartItems={cartItems}
          onClickClose={() => {setCartOpened(false)}}
        />
      }
      <Header onClickCart={() => {setCartOpened(true)}}/>
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue.trim().length ? `Пошук за запитом: "${searchValue}"` : 'Всі кросівки'}</h1>
        <div className="search-block d-flex">
          <img src="../public/img/search.svg" alt="search"/>
          {searchValue &&
            <img
              className="clear cu-p"
              src={'../public/img/btn-remove.svg'}
              alt="Clear"
              onClick={() => setSearchValue("")}
            />
          }
          <input
            type="text"
            placeholder="Пошук..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
      </div>
        <div className="d-flex flex-wrap">
          {items.length > 0 ? (
            items
              .filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item) => (
                <Card
                  key={item.id} // тут
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onPlusClick={(obj) => onAddToCart(obj)}
                  onFavClick={(obj) => onAddToFavorites(obj)}
                  id={item.id}
                />
              ))
          ) : (
            <p>Завантаження даних... Надіємося що mockAPI не підведе!😁</p>
          )}
        </div>
      </div>
    </div>
  )
}