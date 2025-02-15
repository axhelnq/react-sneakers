import styles from './Card.module.scss'
import {useContext, useState} from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context.js";

export default function Card({name, price, imageUrl, id, onPlusClick, onFavClick, favorited = false, loading = false}) {
  const [isFav, setIsFav] = useState(favorited)
  const { isItemAddedToCart } = useContext(AppContext)

  function onClickAdd() {
    onPlusClick({name, price, imageUrl, id})
  }

  function onClickFav() {
    onFavClick({name, price, imageUrl, id})
    setIsFav(!isFav)
  }
  
  return (
    <div className={styles.card}>
      {loading ?
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 160 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155"/>
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25"/>
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
        </ContentLoader>
        :
        <>
          <div className={styles.favorite} onClick={onClickFav}>
            <img src={isFav ? "../public/img/btn-liked.svg" : "../public/img/btn-unliked.svg"} alt="fav"/>
          </div>
          <img width="100%" height={135} src={imageUrl} alt="Sneakers"/>
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Ціна:</span>
              <b>{price} грн.</b>
            </div>
              <img
                src={isItemAddedToCart(id) ? '../public/img/btn-checked.svg' : '../public/img/btn-plus.svg'}
                alt="+"
                className={styles.plus}
                onClick={onClickAdd}
              />
          </div>
        </>
      }
    </div>
  )
}