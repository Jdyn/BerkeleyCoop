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
  def handle_info(:after_join, socket) do
    user = socket.assigns.user
    room_id = socket.assigns.room_id

    rooms =
      user
      |> Chat.list_rooms_for_user()
      |> Enum.map(fn r -> %{name: r.name, id: r.id, description: r.description} end)

    push(socket, "lobby", %{rooms: rooms})

    if room_id do
      push(socket, "messages", %{
        messages:
          Repo.all(
            from(m in Chat.Message,
              where: m.room_id == ^room_id,
              order_by: [asc: m.inserted_at],
              preload: [:user]
            )
          )
          |> Enum.map(fn m ->
            %{content: m.content, user: m.user.first_name <> " " <> m.user.last_name}
          end)
      })
    end

    {:noreply, socket}
  end

  @impl true
  def join("room:" <> room_id, _params, socket) do
    send(self(), :after_join)

    {:ok, assign(socket, :room_id, room_id)}
  end

  @impl true
  def handle_in("shout", payload, socket) do
    msg =
      Chat.Message.changeset(
        %Chat.Message{}, Map.merge(payload, %{"room_id" => socket.assigns.room_id, "user_id" => socket.assigns.user.id})
      )
      |> Repo.insert!()
      |> Repo.preload(:user)

    socket
    |> broadcast("shout", %{content: msg.content, user: msg.user.first_name <> " " <> msg.user.last_name})

    {:noreply, socket}
  end
end
