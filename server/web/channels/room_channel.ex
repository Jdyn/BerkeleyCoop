defmodule Berkeley.RoomChannel do
  @moduledoc false
  use Berkeley.Web, :channel

  alias Berkeley.Presence
  alias Berkeley.Repo

  @impl true
  def join("room:lobby", _message, socket) do
    send(self(), :after_join)

    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    user = socket.assigns.user
    members = Berkeley.User |> Repo.all() |> Repo.preload(:house)

    push(socket, "members", Berkeley.UserView.render("index.json", %{users: members}))

    online_at = inspect(System.system_time(:millisecond))

    with {:ok, _} <- Presence.track(socket, user.id, %{onlineAt: online_at}) do
      push(socket, "presence_state", Presence.list(socket))
    end

    {:noreply, socket}
  end

  # @impl true
  # def handle_in("rejoin", "room:" <> room_id, socket) do
  #   send(self(), :after_join)

  #   {:noreply, assign(socket, :room_id, room_id)}
  # end
end
