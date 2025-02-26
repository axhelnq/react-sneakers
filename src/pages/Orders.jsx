import axios from "axios"
import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card/Card.jsx"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://67a7311c203008941f66e0f7.mockapi.io/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        console.error('❌ Помилка при завантажуванні даних:', error)
      }
    })()
  },[])

  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)].map((item, index) => ({ id: `skeleton-${index}`}))
        : orders
    ).map(item => (
        <Card
          key={item.id}
          loading={isLoading}
          {...item}
        />
      )
    )
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="d-flex align-center justify-between">
          <img
            src="/img/back-button.svg"
            alt="<"
            className="pr-20 cu-p"
            onClick={() => navigate(-1)}
          />
          Мої замовлення
        </h1>
      </div>
      <div className="d-flex flex-wrap">
        {orders.length > 0
          ? renderItems()
          : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img
                src="/img/orders-empty.png"
                width={70}
                alt="cart state image"
                className="mb-20"
              />
              <h2 className="mb-5">У вас нема замовлень</h2>
              <p className="opacity-6 mb-40">Ви жебрка?<br/>Оформіть хоча б одне замовлення.</p>
              <button className="greenButton" onClick={() => navigate(-1)}>
                <img src="/img/arrow.svg" alt="Arrow"/>
                Повернутися назад
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}