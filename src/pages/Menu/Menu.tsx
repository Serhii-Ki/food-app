import Card from '../../components/Card/Card';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';

import styles from './Menu.module.css';

function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Headling>Menu</Headling>
				<Search placeholder='Введите блюдо или состав'/>
			</div>
			<div>
				<Card
					id={1}
					title='Test'
					description='Some text'
					price={32}
					rating={4.5}
					img={'./card-img.png'}
				/>
			</div>
		</>
	);
}

export default Menu;
