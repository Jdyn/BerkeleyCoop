defmodule Berkeley.Event do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.User
  alias Berkeley.Chat.Room

  schema "events" do
    field(:title, :string)
    field(:description, :string)
    field(:start_date, :utc_datetime)
    field(:end_date, :utc_datetime)

    belongs_to(:creator, User, foreign_key: :creator_id)

    # you have to basically join the event...
    many_to_many(:participants, User, join_through: "events_participants")

    has_one(:room, Room)

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:title, :description, :start_date, :end_date, :creator_id])
    |> validate_required([:title, :description, :start_date, :end_date, :creator_id])
  end
end
