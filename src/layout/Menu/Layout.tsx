import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import Button from '../../components/Button/Button';

import styles from './Layout.module.css';


function Layout() {
	const navigate = useNavigate();

	const logOut = () => {
		localStorage.removeItem('jwt');
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['user-avatar']} src="./user-avatar.png" alt="User avatar" />
					<div className={styles['name']}>
						Kiba Sergey
					</div>
					<div className={styles['mail']}>
						kiba@gmail.com
					</div>
				</div>
				<div className={styles['menu']}>
					<NavLink to='/' className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src='./menu-icon.svg' alt='menu icon'/>
						Menu
					</NavLink>
					<NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src='./cart-icon.svg' alt='cart icon'/>
						Cart
					</NavLink>
				</div>
				<Button onClick={logOut} className={styles['exit']}>
					<img src="./exit-icon.svg" alt="exit-icon" />
					Выйти
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
		
	);
}

export default Layout;
