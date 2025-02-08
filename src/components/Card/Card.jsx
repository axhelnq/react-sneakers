import styles from './Card.module.scss'
import { useState } from "react";

export default function Card({name, price, imageUrl, onPlusClick, onFavClick}) {
  const [isAdded, setIsAdded] = useState(false)
  const [isFav, setIsFav] = useState(false)

  function onClickAdd() {
    onPlusClick({name, price, imageUrl})
    setIsAdded(!isAdded)
  }

  function onClickFav() {
    setIsFav(!isFav)
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFav}>
        <img src={isFav ? "../public/img/btn-liked.svg" : "../public/img/btn-unliked.svg"} alt="unliked"/>
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Ціна:</span>
          <b>{price} грн.</b>
        </div>
        <img
          src={isAdded ? '../public/img/btn-checked.svg' : '../public/img/btn-plus.svg'}
          alt="+"
          className={styles.plus}
          onClick={onClickAdd}
        />
      </div>
    </div>
  )
}