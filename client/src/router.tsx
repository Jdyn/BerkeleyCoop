import './styles/global.css';
import { LoaderFunction, createBrowserRouter, redirect } from 'react-router-dom';
import { AnyAction, Dispatch, Store } from '@reduxjs/toolkit';
import RootLayout from './components/Layout/Root';
import Auth from './screens/Auth/login';
import Chat from './screens/Chat/Chat';
import Events from './screens/Events/Events';
import { accountApi } from './api';
import Event from './screens/Events/Event/Event';
import Home from './screens/Home/Home';
import { SocketProvider } from './hooks/socket/SocketContext';
import SignUp from './screens/Auth/signup';

const rootLoader: (dispatch: Dispatch) => LoaderFunction = (dispatch) => async (_request) => {
	dispatch(accountApi.util.resetApiState());
	const result = dispatch(accountApi.endpoints.getAccount.initiate() as unknown as AnyAction);

	try {
		const response = await result.unwrap();

		if (response.ok) {
			return null;
		}
	} catch (error) {
		return redirect('/signin');
	}
	return null;
	// return redirect('/signin');
};

const baseUrl = import.meta.env.PROD
	? 'wss://berkeley.fly.dev/socket'
	: 'ws://localhost:4000/socket';

const router = (store: Store) =>
	createBrowserRouter([
		{
			path: '/',
			element: (
				<SocketProvider url={baseUrl}>
					<RootLayout />
				</SocketProvider>
			),
			loader: rootLoader(store.dispatch),
			children: [
				{
					path: 'chats',
					element: <Chat />,
					children: [
						{
							path: ':id',
							element: <Chat />
						}
					]
				},
				{
					path: 'events/:id',
					element: <Event />
				},
				{
					path: 'events',
					element: <Events />
				},
				{
					path: '/',
					element: <Home />
				}
			]
		},
		{
			path: '/',
			children: [
				{
					path: 'signin',
					element: <Auth type="signin" />
				},
				{
					path: 'signup',
					element: <SignUp type="signup" />
				}
			]
		}
	]);

export default router;
