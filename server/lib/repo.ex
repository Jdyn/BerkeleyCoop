defmodule Berkeley.Repo do
  use Ecto.Repo,
    otp_app: :berkeley,
    adapter: Ecto.Adapters.Postgres
end
