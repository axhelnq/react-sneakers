export default function Drawer({ onClickClose, items = []}) {
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
        <div className="items">
          {items.map((obj) => (
            <div
              className="cartItem d-flex align-center mb-20" key={obj.id || `${obj.name}-${obj.price}`}>
              <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.name}</p>
                <b>{obj.price} грн.</b>
              </div>
              <img className="removeBtn" src={'../public/img/btn-remove.svg'} alt="remove"/>
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
            Оформити замовлення <img src={'../public/img/arrow.svg'} alt="->"/>
          </button>
        </div>
      </div>
    </div>
  )
}