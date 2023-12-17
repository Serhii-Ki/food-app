import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import axios from 'axios';

import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';
import Layout from './layout/Menu/Layout.tsx';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Product from './pages/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';

import './index.css';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Loading...</>}><Menu/></Suspense>
			},
			{
				path: '/cart',
				element: <Cart/>
			},
			{
				path: '/product/:id',
				element: <Product/>,
				errorElement: <>Error</>,
				loader: async({params}) => {
					return defer({
						data: axios.get(`${PREFIX}/products/${params.id}`)
							.then(data => data)
					});
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: '/auth/login',
				element: <Login/>
			},
			{
				path: '/auth/register',
				element: <Register/>
			}
		]
	},
	{
		path: '*',
		element: <Error/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);
