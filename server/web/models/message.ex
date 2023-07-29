defmodule Berkeley.Chat.Message do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.Chat.Room
  alias Berkeley.User

  schema "messages" do
    field(:content, :string)

    belongs_to(:room, Room)
    belongs_to(:user, User)

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:content, :user_id, :room_id])
    |> validate_required([:content, :user_id, :room_id])
  end
end
