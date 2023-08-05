defmodule Berkeley.HouseView do
  use Berkeley.Web, :view

  def render("house.json", %{house: house}) do
    %{
      id: house.id,
      title: house.name
    }
  end
end
