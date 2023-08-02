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
    user = socket.assigns.user
    rooms = Chat.list_rooms_for_user(user)

    dbg(rooms)

    push(socket, "lobby", Chat.RoomView.render("index.json", %{rooms: rooms}))

    {:noreply, socket}
  end

  @impl true
  def handle_info(:send_messages, socket) do
    room_id = socket.assigns.room_id

    messages =
      Repo.all(
        from(m in Chat.Message,
          where: m.room_id == ^room_id,
          order_by: [asc: m.inserted_at],
          preload: [:user]
        )
      )

    push(socket, "messages", Chat.MessageView.render("index.json", %{messages: messages}))

    {:noreply, socket}
  end

  @impl true
  def handle_in("shout", payload, socket) do
    msg =
      %Chat.Message{}
      |> Chat.Message.changeset(
        Map.merge(payload, %{"room_id" => socket.assigns.room_id, "user_id" => socket.assigns.user.id})
      )
      |> Repo.insert!()
      |> Repo.preload(:user)

    message = Berkeley.Chat.MessageView.render("message.json", %{message: msg})

    broadcast(socket, "shout", message)
    {:noreply, socket}
  end
end
