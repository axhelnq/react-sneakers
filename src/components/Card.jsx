export default function Card() {
  return (
    <div className="card">
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
  )
}