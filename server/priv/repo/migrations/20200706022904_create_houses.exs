defmodule Berkeley.Repo.Migrations.CreateHouses do
  use Ecto.Migration

  def change do
    create table(:houses) do
      add :name, :string
      add :full_name, :string
      add :description, :text

      timestamps()
    end

    create unique_index(:houses, [:name])
  end
end
