defmodule Berkeley.HouseController do
  use Berkeley.Web, :controller

  alias Berkeley.House
  alias Berkeley.Repo

  action_fallback(Berkeley.ErrorController)

  def index(conn, _params) do
    render(conn, "index.json", houses: Repo.all(House))
  end

  def seed(conn, _params) do
    dbg(Berkeley.Seed.run())
    send_resp(conn, :no_content, "")
  end
end
