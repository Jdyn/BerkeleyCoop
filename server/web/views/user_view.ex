defmodule Berkeley.UserView do
  use Berkeley.Web, :view

  alias Berkeley.UserTokenView
  alias Berkeley.UserView
  alias Berkeley.UserTokenView

  def render("index.json", %{users: users}) do
    %{
      users: render_many(users, UserView, "user_with_house.json", as: :user)
    }
  end

  def render("show.json", %{user: user}) do
    %{
      ok: true,
      user: render_one(user, UserView, "user.json", as: :user)
    }
  end

  def render("login.json", %{user: user, token: token}) do
    %{
      ok: true,
      user: render_one(user, UserView, "user_with_house.json", as: :user),
      token: token
    }
  end

  def render("ok.json", _) do
    %{
      ok: true
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      confirmedAt: user.confirmed_at,
      isAdmin: user.is_admin,
      bio: user.bio,
    }
  end

  def render("user_with_house.json", %{user: user}) do
    %{
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      confirmedAt: user.confirmed_at,
      isAdmin: user.is_admin,
      bio: user.bio,
      house: render_one(user.house, Berkeley.HouseView, "house.json", as: :house)
    }
  end

  def render("sessions.json", %{tokens: tokens}) do
    %{
      ok: true,
      tokens: render_many(tokens, UserTokenView, "token.json", as: :token)
    }
  end

  def render("session.json", %{token: token}) do
    %{
      ok: true,
      token: render_one(token, UserTokenView, "token.json", as: :token)
    }
  end

  def render("get_provider.json", %{url: url}) do
    %{
      ok: true,
      url: url
    }
  end
end
