defmodule Berkeley.Chat.RoomView do
  use Berkeley.Web, :view

  def render("index.json", %{rooms: rooms}) do
    %{
      rooms: render_many(rooms, __MODULE__, "room.json", as: :room)
    }
  end

  def render("room.json", %{room: room}) do
    %{
      id: room.id,
      name: room.name,
      description: room.description,
      inserted_at: room.inserted_at,
      creator: render_one(room.creator, Berkeley.UserView, "user.json", as: :user),
      users: render_many(room.users, Berkeley.UserView, "user.json", as: :user)
    }
  end
end
