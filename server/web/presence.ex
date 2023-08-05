defmodule Berkeley.Presence do
  use Phoenix.Presence,
    otp_app: :berkeley,
    pubsub_server: Berkeley.PubSub
end
