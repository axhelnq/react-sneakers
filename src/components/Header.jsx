export default function Header() {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img className="mr-15" width={40} height={40} src="../public/img/logo.png" alt="logo"/>
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин найліпших кросівок</p>
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
  )
}