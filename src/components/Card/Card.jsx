import styles from './Card.module.scss'

export default function Card({ name, price, imageUrl }) {

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src={"../public/img/btn-unliked.svg"} alt="unliked"/>
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Ціна:</span>
          <b>{price} грн.</b>
        </div>
        <button className="button">
          <img
            width={11}
            height={11}
            src={'../public/img/plus.svg'}
            alt="+"
          />
        </button>
      </div>
    </div>
  )
}