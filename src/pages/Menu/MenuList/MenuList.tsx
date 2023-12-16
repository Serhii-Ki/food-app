import Card from '../../../components/Card/Card';
import { MenuList } from './MenuList.props';

import styles from './MenuList.module.css';

function MenuList({products}: MenuList) {
	return (
		products.map(product => (
			<Card
				key={product.id}
				id={product.id}
				name={product.name}
				description={product.ingredients.join(', ')}
				price={product.price}
				rating={product.rating}
				img={product.image}
			/>
		))
	);
}

export default MenuList;
