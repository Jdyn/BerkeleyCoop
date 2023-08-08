import React, { useEffect, useState } from 'react';
import { Socket } from 'phoenix';
import { useGetAccountQuery } from '../../api/account/account';

export const SocketContext = React.createContext<Socket | null>(null);

interface Props {
	children: React.ReactNode;
	url: string;
}

export function SocketProvider({ children, url }: Props) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const socketRef = React.useRef<any>();
	const { data } = useGetAccountQuery();

	useEffect(() => {
		if (data?.token) {
			const s = new Socket(url, { params: { token: data?.token } });
			s.connect();
			setSocket(s);
			socketRef.current = s;

			return () => {
				socketRef.current.disconnect();
			};
		}

		return () => {};
	}, [data?.token, url]);

	useEffect(() => {
		socketRef.current = socket;
	}, [socket]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
