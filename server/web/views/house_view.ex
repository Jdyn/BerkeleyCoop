defmodule Berkeley.HouseView do
  use Berkeley.Web, :view

  def render("index.json", %{houses: houses}) do
    %{
      houses: render_many(houses, __MODULE__, "house.json", as: :house)
    }
  end

  def render("house.json", %{house: house}) do
    %{
      id: house.id,
      name: house.name,
      description: house.description,
    }
  end
end
