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
      updatedAt: room.updated_at,
      creator: render_one(room.creator, Berkeley.UserView, "user.json", as: :user),
      users: render_many(room.users, Berkeley.UserView, "user.json", as: :user),
      event: render_one(room.event, Berkeley.EventView, "event.json", as: :event),
      houses: render_many(room.houses, Berkeley.HouseView, "house.json", as: :house),
      messages: render_many(room.messages, Berkeley.Chat.MessageView, "message.json", as: :message),
    }
  end
end
