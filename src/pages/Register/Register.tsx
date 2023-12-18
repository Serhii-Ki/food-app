import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { register, userActions } from '../../store/user.slice';
import { AppDispatch, RootState } from '../../store/store';

import styles from './Register.module.css';

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
	name: {
		value: string;
	}
}

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if(jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async(e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		dispatch(register({email: email.value, password: password.value, name: name.value}));
	};

	return (
		<div className={styles['register']}>
			<Headling>Регистрация</Headling>
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input name='email' id='email' placeholder='Email'/>
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input name='password' id='password' type='password' placeholder='Пароль'/>
					
				</div>
				<div className={styles['field']}>
					<label htmlFor='name'>Ваше Имя</label>
					<Input name='name' id='name' type='text' placeholder='Имя'/>
					
				</div>
				<Button appearance='big'>Зарегистрироваться</Button>
			</form>
			{loginErrorMessage && <div className={styles['error']}>${loginErrorMessage}</div>}
			<div className={styles['links']}>
				<div>Есть аккаунта?</div>
				<Link to='/auth/login'>Войти</Link>
			</div>
		</div>
	);
}

export default Register;
