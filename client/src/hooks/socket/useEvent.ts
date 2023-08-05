import { Channel } from "phoenix";
import { useEffect, useRef } from "react";

function useEvent(channel: Channel | null, event: string, handler: (message: any) => void) {
  const handlerFun = useRef(handler);
  handlerFun.current = handler;

  useEffect(() => {
    if (channel === null) {
      return;
    }

    const ref = channel.on(event, (message) => {
      handlerFun.current(message);
    });

    return () => {
      channel.off(event, ref);
    };
  }, [channel, event]);
}

export default useEvent;
