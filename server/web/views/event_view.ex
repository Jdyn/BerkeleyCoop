defmodule Berkeley.EventView do
  use Berkeley.Web, :view

  def render("index.json", %{events: events}) do
    %{
      events: render_many(events, __MODULE__, "event_with_creator.json", as: :event)
    }
  end

  def render("show.json", %{event: event}) do
    %{
      ok: true,
      event: render_one(event, __MODULE__, "event.json", as: :event)
    }
  end

  def render("event.json", %{event: event}) do
    %{
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.start_date,
      endDate: event.end_date,
      insertedAt: event.inserted_at,
    }
  end

  def render("event_with_creator.json", %{event: event}) do
    %{
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.start_date,
      endDate: event.end_date,
      insertedAt: event.inserted_at,
      creator: render_one(event.creator, Berkeley.UserView, "user.json", as: :user),
    }
  end
end
