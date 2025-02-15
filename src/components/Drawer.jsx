import {useEffect, useState} from "react";
import axios from "axios";
import Info from "./Info.jsx";

export default function Drawer({ cartItems, setCartItems, onClickClose }) {
  const [items, setItems] = useState(cartItems) // локальний стан якось не обовязковий і його потім якось треба прибрати
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setItems(cartItems)
  }, [cartItems])

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${id}`);

      setCartItems((prev) => prev.filter((item) => item.id !== id))
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("❌ Помилка при видаленні предмета з кошика:", error);
    }
  };

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('https://67a7311c203008941f66e0f7.mockapi.io/orders', {
        items: cartItems,
      })
      for (const item of cartItems) { // костиль) mockAPI не може робити реплейс
        await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${item.id}`);
      }
      setOrderId(data.id)
      setIsOrderCompleted(true)
      setCartItems([])
    } catch (error) {
      console.error("❌ Помилка при створенні замовлення:", error)
    }
    setIsLoading(false)
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Кошик
          <img
            onClick={onClickClose}
            className="removeBtn cu-p"
            src={'../public/img/btn-remove.svg'}
            alt="Close"
          />
        </h2>
        {items.length > 0
          ? (
            <>
              <div className="items">
                {items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.name}</p>
                      <b>{obj.price} грн.</b>
                    </div>
                    <img
                      className="removeBtn"
                      src={'../public/img/btn-remove.svg'}
                      alt="remove"
                      onClick={() => handleRemove(obj.id)}
                    />
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul className="">
                  <li>
                    <span>Разом:</span>
                    <div></div>
                    <b>15 000 грн.</b>
                  </li>
                  <li>
                    <span>Податок 5%:</span>
                    <div></div>
                    <b>750 грн.</b>
                  </li>
                </ul>
                <button
                  className="greenButton"
                  onClick={() => onClickOrder()}
                  disabled={isLoading}
                >
                  Оформити замовлення <img src={'../public/img/arrow.svg'} alt="arrow"/>
                </button>
              </div>
            </>
          ) : (
            <Info
              title={isOrderCompleted ? 'Замовлення оформлене!' : 'Кошик пустий'}
              description={isOrderCompleted ? `Ваше замовлення #${orderId} незабаром буде передано кур'єрській доставці` :'Добавте хоча б одну пару кросівок, щоб зробити замовлення.'}
              image={isOrderCompleted ? '../public/img/completed-order.jpg' :'../public/img/empty-cart.jpg'}
            />
          )
        }
      </div>
    </div>
  )
}