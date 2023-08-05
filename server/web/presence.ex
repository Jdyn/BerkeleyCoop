defmodule Berkeley.Presence do
  @moduledoc false
  use Phoenix.Presence,
    otp_app: :berkeley,
    pubsub_server: Berkeley.PubSub
  use Berkeley.Web, :channel

  alias Berkeley.User
  alias Berkeley.Repo

  @impl true
  def fetch(_topic, presences) do
    users = presences |> Map.keys() |> get_users_map()

    for {key, %{metas: metas}} <- presences, into: %{} do
      {key, %{metas: metas, user: Berkeley.UserView.render("user.json", %{user: users[String.to_integer(key)]})}}
    end
  end

  def get_users_map(ids) do
    query =
      from(u in User,
        where: u.id in ^ids,
        select: {u.id, u}
      )

    query |> Repo.all() |> Map.new()
  end
end
