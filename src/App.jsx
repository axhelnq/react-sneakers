export default function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
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
      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img className="mr-15" width={40} height={40} src="../public/img/logo.png" alt="logo"/>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин найліпших кросівків</p>
          </div>
        </div>
        <div>
          <ul className="d-flex">
            <li className="mr-30 d-flex align-center">
              <img className="mr-10" width={18} height={18} src="../public/img/cart.svg" alt="cart"/>
              <span>1205 грн.</span>
            </li>
            <li>
              <img width={18} height={18} src="../public/img/user.svg" alt="user"/></li>
          </ul>
        </div>
      </header>
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
          <h1>Всі кросівки</h1>
          <div className="search-block d-flex">
            <img src="../public/img/search.svg" alt="search"/>
            <input type="text" placeholder="Пошук..."/>
          </div>
        </div>
        <div className="d-flex">
          <div className="card">
            {/*<img src="../public/img/btn-" alt=""/>*/}
            <div className="favorite">
              <img src="../public/img/btn-unliked.svg" alt="unliked"/>
            </div>
            <img width={133} height={112} src="../public/img/sneakers/1.jpg" alt="Sneakers"/>
            <h5>Чоловічі Кросівки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Ціна:</span>
                <b>7 500 грн.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="../public/img/plus.svg" alt="+"/>
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src="../public/img/sneakers/2.jpg" alt="Sneakers"/>
            <h5>Чоловічі Кросівки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Ціна:</span>
                <b>7 500 грн.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="../public/img/plus.svg" alt="+"/>
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src="../public/img/sneakers/3.jpg" alt="Sneakers"/>
            <h5>Чоловічі Кросівки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Ціна:</span>
                <b>7 500 грн.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="../public/img/plus.svg" alt="+"/>
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src="../public/img/sneakers/4.jpg" alt="Sneakers"/>
            <h5>Чоловічі Кросівки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Ціна:</span>
                <b>7 500 грн.</b>
              </div>
              <button className="button">
                <img width={11} height={11} src="../public/img/plus.svg" alt="+"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}