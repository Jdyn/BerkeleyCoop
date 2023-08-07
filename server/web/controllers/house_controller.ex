defmodule Berkeley.HouseController do
  use Berkeley.Web, :controller

  alias Berkeley.House
  alias Berkeley.Repo

  action_fallback(Berkeley.ErrorController)

  def index(conn, _params) do
    render(conn, "index.json", houses: Repo.all(House))
  end
end
