defmodule Berkeley.Repo.Migrations.CreateHouses do
  use Ecto.Migration

  def change do
    create table(:houses) do
      add :name, :string
      add :description, :string

      timestamps()
    end

    create unique_index(:houses, [:name])
  end
end
