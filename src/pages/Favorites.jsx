import { useContext } from 'react'
import AppContext from '../context.js'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card/Card.jsx'

export default function Favorites() {
	const { favorites, onAddToFavorites, onAddToCart } = useContext(AppContext)
	const navigate = useNavigate()

	return (
		<div className='content p-40'>
			<div className='d-flex align-center justify-between mb-40'>
				<h1 className='d-flex align-center justify-between'>
					<img
						src='/img/back-button.svg'
						alt='<'
						className='pr-20 cu-p'
						onClick={() => navigate(-1)}
					/>
					Мої закладки
				</h1>
			</div>
			<div className='d-flex flex-wrap'>
				{favorites.length > 0 ? (
					favorites.map((item) => (
						<Card
							key={item.id}
							id={item.parentId}
							onFavClick={onAddToFavorites}
							onPlusClick={onAddToCart}
							favorited={true} // Бо це сторінка фаворитів
							imageUrl={item.imageUrl}
							price={item.price}
							name={item.name}
						/>
					))
				) : (
					<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
						<img
							src='/img/favorites-empty.png'
							width={70}
							alt='cart state image'
							className='mb-20'
						/>
						<h2 className='mb-5'>Закладок нема :(</h2>
						<p className='opacity-6 mb-50'>Ви нічого не добавляли в закладки</p>
						<button className='greenButton' onClick={() => navigate(-1)}>
							<img src='/img/arrow.svg' alt='Arrow' />
							Повернутися назад
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
