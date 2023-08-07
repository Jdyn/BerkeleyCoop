defmodule Berkeley.Chat do
  @moduledoc """
  The Chat context.
  """
  use Berkeley.Web, :service

  import Ecto.Query, warn: false

  alias Berkeley.Chat
  alias Berkeley.Chat.Message
  alias Berkeley.Chat.Room
  alias Berkeley.Endpoint
  alias Berkeley.Repo
  alias Berkeley.User

  @doc """
  Returns the list of rooms.

  ## Examples

      iex> list_rooms()
      [%Room{}, ...]

  """
  def list_rooms(%User{} = user) do
    house_rooms =
      from(
        r in Room,
        left_join: h in assoc(r, :houses),
        where: h.id == ^user.house_id,
        select: r
      )
      |> Repo.all()
      |> Repo.preload([:creator, :users, :event, :houses])

    user_rooms = user |> assoc(:rooms) |> Repo.all() |> Repo.preload([:creator, :users, :event, :houses])

    house_rooms ++ user_rooms
  end

  @doc """
  Gets a single room.

  Raises `Ecto.NoResultsError` if the Room does not exist.

  ## Examples

      iex> get_room!(123)
      %Room{}

      iex> get_room!(456)
      ** (Ecto.NoResultsError)

  """
  def get_room!(id) do
    Repo.get(Room, id)
  end

  def get_message!(id) do
    Repo.get(Message, id)
  end

  def last_ten_messages_for(room_id) do
    room_id
    |> Chat.Query.for_room()
    |> Repo.all()
    |> Repo.preload(:sender)
  end

  def last_user_message_for_room(room_id, user_id) do
    room_id
    |> Chat.Query.last_user_message_for_room(user_id)
    |> Repo.one()
  end

  @doc """
  Creates a room.

  ## Examples

      iex> create_room(%{field: value})
      {:ok, %Room{}}

      iex> create_room(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_room(attrs \\ %{}) do
    %Room{}
    |> Room.create_changeset(attrs)
    |> Repo.insert()
  end

  def create_room!(attrs \\ %{}) do
    %Room{}
    |> Room.create_changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Updates a room.

  ## Examples

      iex> update_room(room, %{field: new_value})
      {:ok, %Room{}}

      iex> update_room(room, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_room(%Room{} = room, attrs) do
    room
    |> Room.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a room.

  ## Examples

      iex> delete_room(room)
      {:ok, %Room{}}

      iex> delete_room(room)
      {:error, %Ecto.Changeset{}}

  """
  def delete_room(%Room{} = room) do
    Repo.delete(room)
  end

  def delete_message(%Message{} = message) do
    Repo.delete(message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking room changes.

  ## Examples

      iex> change_room(room)
      %Ecto.Changeset{data: %Room{}}

  """
  def change_room(%Room{} = room, attrs \\ %{}) do
    Room.changeset(room, attrs)
  end

  def change_message(%Message{} = message, attrs \\ %{}) do
    Message.changeset(message, attrs)
  end

  def create_message(attrs \\ %{}) do
    %Message{}
    |> Message.changeset(attrs)
    |> Repo.insert!()
    |> preload_message_creator()
    |> publish_message_created()
  end

  def update_message(%Message{} = message, attrs) do
    message
    |> Message.changeset(attrs)
    |> Repo.update()
    |> publish_message_updated()
  end

  def preload_message_creator(%Message{} = message) do
    Repo.preload(message, :creator)
  end

  def publish_message_created(%Chat.Message{} = message) do
    message = Chat.MessageView.render("message.json", %{message: message})
    Endpoint.broadcast("chat:#{message.room_id}", "shout", message)
    {:ok, message}
  end

  def publish_message_created(result), do: result

  def publish_message_updated({:ok, message} = result) do
    Endpoint.broadcast("chat:#{message.room_id}", "updated_message", %{message: message})
    result
  end

  def publish_message_updated(result), do: result

  def get_previous_n_messages(id, n) do
    id
    |> Chat.Query.previous_n(n)
    |> Repo.all()
    |> Repo.preload(:sender)
  end
end
