import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button/Button';
import { AppDispatch, RootState } from '../../store/store';

import styles from './Layout.module.css';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const items = useSelector((s: RootState) => s.cart.items);

	useEffect(() => {
		dispatch(getProfile());
	},[dispatch]);

	const logOut = () => {
		dispatch(userActions.logOut());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['user-avatar']} src="./user-avatar.png" alt="User avatar" />
					<div className={styles['name']}>
						{profile?.name}
					</div>
					<div className={styles['mail']}>
						{profile?.email}
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
						Cart <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
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
