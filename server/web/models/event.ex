defmodule Berkeley.Event do
  @moduledoc false
  use Berkeley.Web, :model

  alias Berkeley.User

  schema "events" do
    field(:title, :string)
    field(:description, :string)
    field(:start_date, :utc_datetime)
    field(:end_date, :utc_datetime)

    belongs_to(:creator, User)
    belongs_to(:room, Room)

    # you have to basically join the event...
    many_to_many(:participants, User, join_through: "events_users")

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
