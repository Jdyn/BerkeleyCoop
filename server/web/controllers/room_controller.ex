defmodule Berkeley.RoomController do
  use Berkeley.Web, :controller

  alias Berkeley.Chat

  action_fallback(Berkeley.ErrorController)

  def create(conn, attrs) do
    current_user = conn.assigns[:current_user]

    payload = Map.put_new(attrs["room"], "creator_id", current_user.id)

    with {:ok, room} <- Chat.create_room(payload) do

      rooms = Chat.list_rooms(current_user)
      Berkeley.Endpoint.broadcast("chat:lobby", "lobby", Chat.RoomView.render("index.json", %{rooms: rooms}))

      conn
      |> put_status(:created)
      |> put_view(Berkeley.Chat.RoomView)
      |> render("room.json", room: room |> Berkeley.Repo.preload([:creator, :users, :houses, :event, :messages]))
    end
  end
end
