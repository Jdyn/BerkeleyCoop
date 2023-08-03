defmodule Berkeley.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :description, :string

      add(:creator_id, references(:users, on_delete: :delete_all))
      add(:event_id, references(:events, on_delete: :delete_all))

      timestamps()
    end

    create table(:houses_rooms, primary_key: false) do
      add :house_id, references(:houses)
      add :room_id, references(:rooms)
    end

    create table(:users_rooms, primary_key: false) do
      add :user_id, references(:users)
      add :room_id, references(:rooms)
    end
  end
end
