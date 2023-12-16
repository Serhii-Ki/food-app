import axios, { AxiosError } from 'axios';

import { useEffect, useState } from 'react';
import MenuList from './MenuList/MenuList';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';

import styles from './Menu.module.css';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch(e) {
			console.log(e);
			if( e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getMenu();
	},[]);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Menu</Headling>
				<Search placeholder='Введите блюдо или состав'/>
			</div>
			<div>
				{error && <p>{error}</p>}
				{!isLoading && <MenuList products={products}/>}
				{isLoading && <p>Loading...</p>}
			</div>
		</>
	);
}

export default Menu;
