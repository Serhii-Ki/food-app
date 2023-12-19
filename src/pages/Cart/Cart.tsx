import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Headling from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { Product } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';

import styles from './Cart.module.css';



function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const getItem = async(id: number)  => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(item => getItem(item.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<div>
			<Headling className={styles['headling']}>Корзина</Headling>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if(!product) {
					return;
				}
				return <CartItem key={product.id} count={i.count} {...product}/>;
			})}
		</div>
	);
}

export default Cart;
