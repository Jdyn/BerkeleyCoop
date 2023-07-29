import useWebsockets from "~/hooks/useWebsocket";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: { request: Request }) => {
  const token = request.headers.get("Cookie");

  return json({ token });
};

export default function Index() {
  const data = useLoaderData();

  console.log(data);
  const res = useWebsockets({
    room: "room:lobby",
    token: "d9RNf1Aj1OO1mf_rpmKxXh3B6KGKVSlZrLn_Vp1aTeM",
    onNewMessage: () => {
      console.log("new message");
    },
  });

  console.log(res);
  return <main>Hello World</main>;
}
