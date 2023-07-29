defmodule Berkeley.RoomChannel do
  @moduledoc false
  use Phoenix.Channel

  alias Berkeley.Chat

  def join("room:lobby", _message, socket) do
    user = socket.assigns.user
    {:ok, assign(socket, :rooms, Chat.list_rooms_for_user(user))}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end
end
