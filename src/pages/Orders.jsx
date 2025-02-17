import Card from "../components/Card/Card.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AppContext from "../context.js";

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
          {...item} // name url id price
        />
      )
    )
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої покупки</h1>
      </div>
      <div className="d-flex flex-wrap">
        { renderItems() }
      </div>
    </div>
  )
}