import {useContext} from "react"
import AppContext from "../context.js"

export default function Info({title, description, image}) {
  const {setCartOpened} = useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img src={image} width={120} alt="cart state image"
           className="mb-20"/>
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className="greenButton" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="Arrow"/>
        Повернутися назад
      </button>
    </div>
  )
}