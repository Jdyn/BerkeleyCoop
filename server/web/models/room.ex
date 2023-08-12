defmodule Berkeley.Chat.Room do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.Chat.Message
  alias Berkeley.House
  alias Berkeley.User
  alias Berkeley.Repo

  schema "rooms" do
    field(:name, :string)
    field(:description, :string)

    has_many(:messages, Message, on_delete: :delete_all)

    many_to_many(:users, User, join_through: "users_rooms")
    many_to_many(:houses, House, join_through: "houses_rooms")

    belongs_to(:event, Berkeley.Event, foreign_key: :event_id)
    belongs_to(:creator, User, foreign_key: :creator_id)

    timestamps()
  end

  @doc false
  def create_changeset(room, attrs) do
    houses = Repo.all(from h in House, where: h.name in ^attrs["houses"])

    room
    |> cast(attrs, [:name, :description, :creator_id, :event_id])
    |> validate_required([:name, :description, :creator_id, :houses])
    |> put_assoc(:houses, houses)
    |> validate_houses(houses)
    |> foreign_key_constraint(:creator_id)
  end

  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :description, :creator_id, :event_id])
    |> validate_required([:name, :description, :creator_id])
    |> foreign_key_constraint(:creator_id)
  end

  def validate_houses(changeset, houses) do
    # Ensure the users current house is in the list of houses
    user = Repo.get!(User, changeset.changes.creator_id)
    if Enum.any?(houses, fn house -> house.id == user.house_id end) do
      changeset
    else
      add_error(changeset, :houses, "You must include your current house in the room.")
    end
  end
end
