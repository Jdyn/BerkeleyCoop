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
      username: message.user.first_name <> " " <> message.user.last_name,
      content: message.content,
      inserted_at: message.inserted_at,
      room_id: message.room_id,
      user: render_one(message.user, Berkeley.UserView, "user.json", as: :user)
    }
  end
end
