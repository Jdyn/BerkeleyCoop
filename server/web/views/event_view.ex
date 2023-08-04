defmodule Berkeley.EventView do
  use Berkeley.Web, :view

  def render("index.json", %{events: events}) do
    %{
      events: render_many(events, __MODULE__, "event.json", as: :event)
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
end
