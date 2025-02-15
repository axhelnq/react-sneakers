import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={'/'}>
        <div className="d-flex align-center">
          <img className="mr-15" width={40} height={40} src={'../public/img/logo.png'} alt="logo"/>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин найліпших кросівок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li className="mr-30 cu-p d-flex align-center" onClick={props.onClickCart}>
            <img className="mr-10" width={18} height={18} src={'../public/img/cart.svg'} alt="Корзина"/>
            <span style={{color: '#5C5C5C'}}>1205 грн.</span>
          </li>
          <li className="mr-30 cu-p d-flex align-center">
            <Link to={'/favorites'}>
              <img className="mr-10" width={18} height={18} src={'../public/img/fav.svg'} alt="Закладки"/>
              <span style={{color: '#5C5C5C'}}>Закладки</span>
            </Link>
          </li>
          <li className="cu-p d-flex align-center">
            <Link to={'/users'}>
              <img className="mr-10" width={18} height={18} src={'../public/img/user.svg'} alt="Пользователь"/>
              <span style={{color: '#5C5C5C'}}>Профіль</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}