import axios from 'axios'
import Info from '../Info.jsx'
import styles from './Drawer.module.scss'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/useCart.js'

export default function Drawer({ onClickClose, opened }) {
	const { cartItems, setCartItems, totalPrice } = useCart()
	const [isOrderCompleted, setIsOrderCompleted] = useState(false)
	const [orderId, setOrderId] = useState(null)
	const [isLoading, setIsLoading] = useState()

	const handleEscapeKey = (event) => {
		if (event.key === 'Escape') {
			onClickClose()
		}
	}

	useEffect(() => {
		if (opened) {
			document.body.style.overflow = 'hidden'
			document.addEventListener('keydown', handleEscapeKey)
			window.scrollTo({
				top: 0,
				behavior: 'auto'
			})
		} else {
			document.body.style.overflow = 'visible'
		}

		return () => {
			document.body.style.overflow = 'visible'
			document.removeEventListener('keydown', handleEscapeKey)
		}
	}, [opened, onClickClose])

	const handleRemove = async (id) => {
		try {
			await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${id}`)

			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
		} catch (error) {
			console.error('❌ Помилка при видаленні предмета з кошика:', error)
		}
	}

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post('https://67a7311c203008941f66e0f7.mockapi.io/orders', {
				items: cartItems
			})
			for (const item of cartItems) {
				// костиль) mockAPI не може робити реплейс
				await axios.delete(`https://67a7311c203008941f66e0f7.mockapi.io/cart/${item.id}`)
			}
			setOrderId(data.id)
			setIsOrderCompleted(true)
			setCartItems([])
		} catch (error) {
			console.error('❌ Помилка при створенні замовлення:', error)
		}
		setIsLoading(false)
	}

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className='mb-30 d-flex justify-between'>
					Кошик
					<img
						onClick={onClickClose}
						className='removeBtn cu-p'
						src='/img/btn-remove.svg'
						alt='Close'
					/>
				</h2>
				{cartItems.length > 0 ? (
					<>
						<div className='items flex'>
							{cartItems.map((obj) => (
								<div className='cartItem d-flex align-center mb-20' key={obj.id}>
									<div
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
										className='cartItemImg'
									></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{obj.name}</p>
										<b>{obj.price} грн.</b>
									</div>
									<img
										className='removeBtn'
										src='/img/btn-remove.svg'
										alt='remove'
										onClick={() => handleRemove(obj.id)}
									/>
								</div>
							))}
						</div>
						<div className='cartTotalBlock'>
							<ul className=''>
								<li>
									<span>Разом:</span>
									<div></div>
									<b>{`${totalPrice} грн.`}</b>
								</li>
								<li>
									<span>З них на ПДВ 20%:</span>
									<div></div>
									<b>{`${totalPrice * 0.2} грн.`}</b>
								</li>
							</ul>
							<button className='greenButton' onClick={() => onClickOrder()} disabled={isLoading}>
								Оформити замовлення <img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</>
				) : (
					<Info
						title={isOrderCompleted ? 'Замовлення оформлене!' : 'Кошик пустий'}
						description={
							isOrderCompleted
								? `Ваше замовлення #${orderId} незабаром буде передано кур'єрській доставці`
								: 'Добавте хоча б одну пару кросівок, щоб зробити замовлення.'
						}
						image={isOrderCompleted ? '/img/completed-order.jpg' : '/img/empty-cart.jpg'}
					/>
				)}
			</div>
		</div>
	)
}
