defmodule Berkeley.Chat.Room do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.Chat.Message
  alias Berkeley.House
  alias Berkeley.User

  schema "rooms" do
    field(:name, :string)
    field(:description, :string)

    has_many(:messages, Message)

    many_to_many(:users, User, join_through: "users_rooms")
    many_to_many(:houses, House, join_through: "houses_rooms")

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
