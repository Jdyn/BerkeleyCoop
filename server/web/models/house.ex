defmodule Berkeley.House do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.Chat.Room
  alias Berkeley.User

  schema "houses" do
    field(:name, :string)
    field(:full_name, :string)
    field(:description, :string)

    has_many(:occupants, User)

    # To implement joining a user to a room by their house
    many_to_many(:rooms, Room, join_through: "houses_rooms")

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
    |> unique_constraint(:name)
  end

  def get_house(house_attrs) do
    Repo.get_by(House, id: house_attrs["id"])
  end
end
