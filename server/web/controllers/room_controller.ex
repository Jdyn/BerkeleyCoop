defmodule Berkeley.RoomController do
  use Berkeley.Web, :controller

  alias Berkeley.Chat
  alias Berkeley.Chat.Room
  alias Berkeley.Repo
  alias Berkeley.Endpoint

  action_fallback(Berkeley.ErrorController)

  def create(conn, attrs) do
    current_user = conn.assigns[:current_user]

    payload = Map.put_new(attrs["room"], "creator_id", current_user.id)

    with {:ok, _} <- Chat.create_room(payload) do

      conn
      |> put_status(:created)
      |> send_resp(:no_content, "")
    end
  end
end
