import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

export default function Header(props) {
	const { totalPrice } = useCart()

	return (
		<header className='d-flex justify-between align-center p-40'>
			<Link to={'/'}>
				<div className='d-flex align-center'>
					<img className='mr-15' width={40} height={40} src='/img/logo.png' alt='logo' />
					<div>
						<h3 className='text-uppercase'>React Sneakers</h3>
						<p className='opacity-5'>Магазин найліпших кросівок</p>
					</div>
				</div>
			</Link>
			<div>
				<ul className='d-flex'>
					<li className='mr-30 cu-p d-flex align-center fw-bold' onClick={props.onClickCart}>
						<img className='mr-10' width={18} height={18} src='/img/cart.svg' alt='Корзина' />
						<span style={{ color: '#5C5C5C' }}>{`${totalPrice} грн.`}</span>
					</li>
					<li className='mr-30 cu-p d-flex align-center'>
						<Link to={'/favorites'} className='d-flex align-center'>
							<img className='mr-10' width={18} height={18} src='/img/fav.svg' alt='Закладки' />
							<span style={{ color: '#5C5C5C' }}>Закладки</span>
						</Link>
					</li>
					<li className='cu-p d-flex align-center'>
						<Link to={'/orders'} className='d-flex align-center'>
							<img
								className='mr-10'
								width={18}
								height={18}
								src='/img/user.svg'
								alt='Пользователь'
							/>
							<span style={{ color: '#5C5C5C' }}>Профіль</span>
						</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}
