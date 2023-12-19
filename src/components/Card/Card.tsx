import { Link } from 'react-router-dom';

import { CardProps } from './Card.props';

import styles from './Card.module.css';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';

function Card(props: CardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};

	return (
		<Link to={`/product/${props.id}`} style={{textDecoration: 'none'}}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{backgroundImage: `url('${props.img}')`}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>$</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="./add-cart-icon.svg" alt="Add to cart icon" />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src="./star-icon.svg" alt="star icon" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default Card;
