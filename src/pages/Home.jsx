import { useContext } from "react"
import AppContext from "../context.js"
import Card from "../components/Card/Card.jsx"

export default function Home({searchValue, setSearchValue, isLoading}) {
  const { items, favorites, onAddToCart, onAddToFavorites } = useContext(AppContext)

  const renderItems = () => {
    return (
      isLoading
        ? [...Array(8)].map((item, index) => ({ id: `skeleton-${index}`}))
        : items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    ).map((item) => (
        <Card
          key={item.id}
          onPlusClick={(obj) => onAddToCart(obj)}
          onFavClick={(obj) => onAddToFavorites(obj)}
          favorited={favorites.some(obj => Number(obj.id) === Number(item.id))}
          loading={isLoading}
          {...item}
        />
      )
    )
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue.trim().length ? `Пошук за запитом: "${searchValue}"` : 'Всі кросівки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search"/>
          {searchValue &&
            <img
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
              onClick={() => setSearchValue("")}
            />
          }
          <input
            type="text"
            placeholder="Пошук..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}