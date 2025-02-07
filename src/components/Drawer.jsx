export default function Drawer() {
  return (
    <div style={{display: 'none'}} className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Кошик
          <img className="removeBtn cu-p" src="../public/img/btn-remove.svg" alt="remove"/>
        </h2>
        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div style={{backgroundImage: 'url(../public/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
            <div className="mr-20 flex">
              <p className="mb-5">Чоловічі Кросівки Nike Blazer Mid Suede</p>
              <b>7 500 грн</b>
            </div>
            <img className="removeBtn" src="../public/img/btn-remove.svg" alt="remove"/>
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{backgroundImage: 'url(../public/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
            <div className="mr-20 flex">
              <p className="mb-5">Чоловічі Кросівки Nike Blazer Mid Suede</p>
              <b>7 500 грн</b>
            </div>
            <img className="removeBtn" src="../public/img/btn-remove.svg" alt="remove"/>
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{backgroundImage: 'url(../public/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
            <div className="mr-20 flex">
              <p className="mb-5">Чоловічі Кросівки Nike Blazer Mid Suede</p>
              <b>7 500 грн</b>
            </div>
            <img className="removeBtn" src="../public/img/btn-remove.svg" alt="remove"/>
          </div>
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
            Оформити замовлення <img src="../public/img/arrow.svg" alt="->"/>
          </button>
        </div>
      </div>
    </div>
  )
}