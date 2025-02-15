import Card from "../components/Card/Card.jsx";
import {useContext} from "react";
import AppContext from "../context.js";

export default function Favorites({onAddToFavorites, onAddToCart}) {
const {favorites} = useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.length > 0 ? (
          favorites
            .map((item) => (
              <Card
                key={item.id}
                onFavClick={(obj) => onAddToFavorites(obj)}
                onPlusClick={(obj) => onAddToCart(obj)}
                favorited
                {...item} // name url id price
              />
            ))
        ) : (
          <p>Пусто</p>
        )}
      </div>
    </div>
  )
}