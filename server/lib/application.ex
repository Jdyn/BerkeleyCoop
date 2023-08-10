defmodule Berkeley.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Berkeley.Repo,
      # Start the Telemetry supervisor
      # Berkeley.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Berkeley.PubSub},
      # Start the Endpoint (http/https)
      Berkeley.Presence,
      Berkeley.Endpoint
      # Start a worker by calling: Berkeley.Worker.start_link(arg)
      # {Berkeley.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Berkeley.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Berkeley.Endpoint.config_change(changed, removed)
    :ok
  end
end
