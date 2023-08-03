defmodule Berkeley.Events do
  @moduledoc """
  The Products context.
  """
  use Berkeley.Web, :service

  alias Berkeley.Event
  alias Berkeley.Repo

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do
    Repo.all(event_query())
  end

  @doc """
  Gets a single event.

  ## Examples

      iex> get_event(123)
      %Event{}

      iex> get_event(456)
      {:not_found, reason}

  """
  def get_event(id) do
    with %Event{} = event <- Repo.one(event_query(id: id)) do
      event
    else
      _ -> {:not_found, "Event does not exist."}
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
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
    |> case do
      {:ok, event} ->
        {:ok, Repo.one(event_query(id: event.id))}

      {:error, changeset} ->
        {:error, changeset}
    end
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

  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
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
      where: ^params,
      left_join: c in assoc(e, :creator),
      left_join: r in assoc(e, :room),
      left_join: p in assoc(e, :participants),
      preload: [creator: c, room: r, participants: p]
    )
  end
end
