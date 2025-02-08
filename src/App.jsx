import Card from "./components/Card/Card.jsx";
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";
import {useEffect, useState} from "react";

export default function App() {
  const [cartOpened, setCartOpened] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetch('https://67a7311c203008941f66e0f7.mockapi.io/items')
      .then(response => response.json())
      .then(json => setItems(json))
      .catch((error) => console.error('Помилка при завантаженні даних:', error));
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
    // пофіксити лишні добавлення і стан кнопки
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClickClose={() => {setCartOpened(false)}} />}
      <Header onClickCart={() => {setCartOpened(true)}}/>
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
          <h1>Всі кросівки</h1>
          <div className="search-block d-flex">
            <img src="../public/img/search.svg" alt="search"/>
            <input type="text" placeholder="Пошук..."/>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.length > 0 ? (
            items.map((item) => (
              <Card
                key={item.id || `${item.name}-${item.price}`}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlusClick={(obj) => onAddToCart(obj)}
                onFavClick={() => console.log(item)} // логічніше
              />
            ))
          ) : (
            <p>Завантаження даних... Надіємося що сервер не підведе!😁</p>
          )}
        </div>
      </div>
    </div>
  )
}