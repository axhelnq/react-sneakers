import Card from "./components/Card/Card.jsx";
import Header from "./components/Header.jsx";
import Drawer from "./components/Drawer.jsx";

const arr = [
  {
    name: 'Чоловічі Кросівки Nike Blazer Mid Suede',
    price: 5600,
    imageUrl: '../public/img/sneakers/1.jpg'
  },
  {
    name: 'Чоловічі Кросівки Nike Air Max 270',
    price: 5600,
    imageUrl: '../public/img/sneakers/2.jpg'
  },
  {
    name: 'Чоловічі Кросівки Nike Blazer Mid Suede',
    price: 3600,
    imageUrl: '../public/img/sneakers/3.jpg'
  },
  {
    name: 'Кросівки Puma X Aka Boku Future Rider',
    price: 3800,
    imageUrl: '../public/img/sneakers/4.jpg'
  },
]

export default function App() {
  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header/>
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
          <h1>Всі кросівки</h1>
          <div className="search-block d-flex">
            <img src="../public/img/search.svg" alt="search"/>
            <input type="text" placeholder="Пошук..."/>
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj, index) => (
            <Card
              key={index}
              name={obj.name}
              price={obj.price}
              imageUrl={obj.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  )
}