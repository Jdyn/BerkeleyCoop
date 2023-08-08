defmodule Berkeley.Events do
  @moduledoc """
  The Products context.
  """
  use Berkeley.Web, :service

  alias Berkeley.Chat
  alias Berkeley.Event
  alias Berkeley.Repo
  alias Berkeley.User
  alias Ecto.Multi

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do
    Event |> Repo.all() |> Repo.preload([:creator, :house])
  end

  @doc """
  Gets a single event.

  ## Examples

      iex> get_event(123)
      %Event{}

      iex> get_event(456)
      {:not_found, reason}

  """
  def get_event!(id) do
    with %Event{} = event <- Repo.get_by(Event, id: id) |> Repo.preload([:creator, :house]) do
      event
    else
      _ -> {:not_found, "Event does not exist."}
    end
  end

  def create(attrs \\ %{}) do
    with {:ok, result} <-
           Multi.new()
           |> Multi.insert(:event, Event.changeset(%Event{}, attrs))
           |> Multi.insert(:room, fn %{event: event} ->
             Chat.Room.changeset(%Chat.Room{}, %{
               name: event.title <> " Chat",
               description: "Chat about the " <> event.title <> " Event",
               creator_id: event.creator_id,
               event_id: event.id,
               users: [Repo.get!(User, event.creator_id)]
             })
           end)
           |> Multi.update(:user, fn %{event: event, room: room} ->
             user = User |> Repo.get_by!(id: event.creator_id) |> Repo.preload(:rooms)
             rooms = user.rooms ++ [room]

             user
             |> Ecto.Changeset.change()
             |> Ecto.Changeset.put_assoc(:rooms, rooms)
           end)
           |> Repo.transaction() do
      {:ok, result[:event] |> Repo.preload([:house, :creator])}
    end
  end

  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event!(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update()
  end

  def update_event!(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update!()
  end

  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Multi.new()
    |> Multi.delete_all(:delete_user_rooms, fn _ ->
      room = Repo.get_by(Chat.Room, event_id: event.id)

      from(ur in "users_rooms",
        where: ur.room_id == ^room.id,
        select: [:room_id]
      )
    end)
    |> Multi.delete(:delete_room, fn _ ->
      Repo.one(
        from(r in Chat.Room,
          where: r.event_id == ^event.id,
          select: r
        )
      )
    end)
    |> Multi.delete(:delete_event, fn _ ->
      Repo.one(
        from(e in Event,
          where: e.id == ^event.id,
          select: e
        )
      )
    end)
    |> Repo.transaction()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{data: %Event{}}

  """
  def change_event(%Event{} = event, attrs \\ %{}) do
    Event.changeset(event, attrs)
  end

  def event_query(params \\ []) do
    from(e in Event,
      where: ^params
    )
  end
end
