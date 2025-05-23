import styles from './Card.module.scss'
import AppContext from '../../context.js'
import { useContext, useState, useEffect } from 'react'
import ContentLoader from 'react-content-loader'

export default function Card({
	name,
	price,
	imageUrl,
	id,
	onPlusClick,
	onFavClick,
	loading = false
}) {
	const { isItemAddedToCart, isItemAddedToFav } = useContext(AppContext)
	const itemObj = { name, price, imageUrl, id, parentId: id }
	const [isFavorite, setIsFavorite] = useState(isItemAddedToFav(id))

	useEffect(() => {
		setIsFavorite(isItemAddedToFav(id))
	}, [id, isItemAddedToFav])
	function onClickAdd() {
		onPlusClick(itemObj)
	}

	function onClickFav() {
		onFavClick(itemObj)
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={165}
					height={250}
					viewBox='0 0 160 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'>
					<rect x='0' y='0' rx='10' ry='10' width='155' height='155' />
					<rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
					<rect x='0' y='234' rx='5' ry='5' width='80' height='25' />
					<rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					{onFavClick && (
						<div className={styles.favorite} onClick={onClickFav}>
							<img src={isFavorite ? '/img/btn-liked.svg' : '/img/btn-unliked.svg'} alt='fav' />
						</div>
					)}
					<img width='100%' height={135} src={imageUrl} alt='Sneakers' />
					<h5>{name}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Ціна:</span>
							<b>{price} грн.</b>
						</div>
						{onPlusClick && (
							<img
								src={isItemAddedToCart(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
								alt='+'
								className={styles.plus}
								onClick={onClickAdd}
							/>
						)}
					</div>
				</>
			)}
		</div>
	)
}
