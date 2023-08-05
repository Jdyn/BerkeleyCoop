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

    belongs_to(:event, Berkeley.Event, foreign_key: :event_id)
    belongs_to(:creator, User, foreign_key: :creator_id)

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :description, :creator_id, :event_id])
    |> validate_required([:name, :description, :creator_id])
    |> foreign_key_constraint(:creator_id)
  end
end
