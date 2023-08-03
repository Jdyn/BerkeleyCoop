defmodule Berkeley.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add(:title, :string)
      add(:description, :string)
      add(:start_date, :utc_datetime)
      add(:end_date, :utc_datetime)

      add(:creator_id, references(:users, on_delete: :delete_all))

      timestamps()
    end

    create table(:events_participants, primary_key: false) do
      add :participant_id, references(:users)
      add :event_id, references(:events)
    end
  end
end
