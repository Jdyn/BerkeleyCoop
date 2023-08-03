defmodule Berkeley.RoomChannel do
  @moduledoc false
  use Berkeley.Web, :channel

  alias Berkeley.Chat
  alias Berkeley.Repo

  @impl true
  def join("room:lobby", _message, socket) do
    send(self(), :after_join)

    {:ok, socket}
  end

  @impl true
  def join("room:" <> room_id, _params, socket) do
    send(self(), :after_join)
    send(self(), :send_messages)

    {:ok, assign(socket, :room_id, room_id)}
  end

  @impl true
  def handle_info(:after_join, socket) do
    rooms = Chat.list_rooms(socket.assigns.user)

    push(socket, "lobby", Chat.RoomView.render("index.json", %{rooms: rooms}))

    {:noreply, socket}
  end

  @impl true
  def handle_info(:send_messages, socket) do
    room_id = socket.assigns.room_id

    with true <- is_binary(room_id) do
      messages =
        Repo.all(
          from(m in Chat.Message,
            where: m.room_id == ^room_id,
            order_by: [asc: m.inserted_at],
            preload: [:creator]
          )
        )

      push(socket, "messages", Chat.MessageView.render("index.json", %{messages: messages}))
    end

    {:noreply, socket}
  end

  @impl true
  def handle_in("shout", payload, socket) do
    payload
    |> Map.merge(%{
      "room_id" => socket.assigns.room_id,
      "creator_id" => socket.assigns.user.id
    })
    |> Chat.create_message()

    {:noreply, socket}
  end
end
