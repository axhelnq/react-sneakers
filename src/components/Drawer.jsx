import {useEffect, useState} from "react";
import axios from "axios";

export default function Drawer({ onClickClose }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('https://67a7311c203008941f66e0f7.mockapi.io/cart')
      .then(res => setItems(res.data))
      .catch((error) => console.error('❌ Помилка при завантаженні даних про товари в корзині:', error))
  }, [])

  const handleRemove = async (id) => {
    if (!id) {
      console.error("❌ ID не передано або є undefined");
      return;
    }

    try {
      await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${id}`);

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn(`⚠️ Елемент з ID ${id} не знайдено (ймовірно, вже видалено)`);
      } else {
        console.error("❌ Помилка при видаленні предмета з кошика:", error);
      }
    }
  };


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
                <button className="greenButton">
                  Оформити замовлення <img src={'../public/img/arrow.svg'} alt="arrow"/>
                </button>
              </div>
            </>
          )
          : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img src={'../public/img/empty-cart.jpg'} width={120} height={120} alt="Empty cart image"
                   className="mb-20"/>
              <h2>Кошик пустий</h2>
              <p className="opacity-6">Добавте хоча б одну пару кросівок, щоб зробити замовлення.</p>
              <button className="greenButton" onClick={onClickClose}>
                <img src={'../public/img/arrow.svg'} alt="Arrow"/> Повернутися назад
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}