defmodule Berkeley.Event do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.Chat.Room
  alias Berkeley.User

  schema "events" do
    field(:title, :string)
    field(:description, :string)
    field(:start_date, :utc_datetime)
    field(:end_date, :utc_datetime)

    belongs_to(:creator, User, foreign_key: :creator_id)

    # To implement joining an event as a user.
    many_to_many(:participants, User, join_through: "participants_events")

    has_one(:room, Room)
    belongs_to(:house, Berkeley.House)

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:title, :description, :start_date, :end_date, :house_id, :creator_id])
    |> validate_required([:title, :description, :start_date, :end_date, :house_id, :creator_id])
  end
end
