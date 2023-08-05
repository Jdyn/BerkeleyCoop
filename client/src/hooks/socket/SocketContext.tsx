import React, { useEffect, useState } from "react";
import { Socket } from "phoenix";

export const SocketContext = React.createContext<Socket | null>(null);

export function SocketProvider({ children, options, url }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = new Socket(url, options);
    s.connect();
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [options, url]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
