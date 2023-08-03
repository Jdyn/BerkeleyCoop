defmodule Berkeley.Chat.MessageView do
  use Berkeley.Web, :view

  def render("index.json", %{messages: messages}) do
    %{
      messages: render_many(messages, __MODULE__, "message.json", as: :message)
    }
  end

  def render("message.json", %{message: message}) do
    %{
      id: message.id,
      username: message.creator.first_name <> " " <> message.creator.last_name,
      content: message.content,
      inserted_at: message.inserted_at,
      room_id: message.room_id,
      user: render_one(message.creator, Berkeley.UserView, "user.json", as: :user)
    }
  end
end
