defmodule Berkeley.EventController do
  use Berkeley.Web, :controller

  alias Berkeley.Event
  alias Berkeley.Events

  action_fallback(Berkeley.ErrorController)

  def index(conn, _params) do
    events = Events.list_events()
    render(conn, "index.json", events: events)
  end

  def create(conn, attrs) do
    current_user = conn.assigns[:current_user]

    payload = Map.put_new(attrs["event"], "creator_id", current_user.id)

    with {:ok, %Event{} = event} <- Events.create(payload) do
      conn
      |> put_status(:created)
      |> render("show.json", event: event)
    end
  end

  def show(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    render(conn, "show.json", event: event)
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    Events.delete_event(event)
    send_resp(conn, :no_content, "")
    # with {:ok, _} <- Events.delete_event(event) do
    #   send_resp(conn, :no_content, "")
    # end
  end
end
