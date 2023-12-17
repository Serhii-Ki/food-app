import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';

import styles from './Login.module.css';

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

function Login() {
	const [error,setError] = useState<string | undefined>();
	const navigate = useNavigate();

	const submit = async(e: FormEvent) => {
		e.preventDefault();
		setError(undefined);
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async(email: string, password: string) => {
		try{
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			console.log(data);
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch(e) {
			if(e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input name='email' id='email' placeholder='Email'/>
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input name='password' id='password' type='password' placeholder='Пароль'/>
					
				</div>
				<Button appearance='big'>Вход</Button>
			</form>
			{error && <div className={styles['error']}>${error}</div>}
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</div>
	);
}

export default Login;
