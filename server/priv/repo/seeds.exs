# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Berkeley.Repo.insert!(%Berkeley.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Berkeley.Repo
alias Berkeley.Chat.Room
alias Berkeley.User
alias Berkeley.Chat.Message
alias Berkeley.Accounts

Accounts.register(
  %{
    first_name: "John",
    last_name: "Doe",
    email: "test@test.com",
    password: "Password123"
  },
  :default
)

Repo.insert(%Room{
  name: "General",
  description: "General chat room",
  creator_id: 1,
  users: [Repo.get!(User, 1)],
  messages: [
    %Message{
      content: "Hello, world! Room1",
      user_id: 1
    },
    %Message{
      content: "Hi, there! Room1",
      user_id: 1
    }
  ]
})

Repo.insert(%Room{
  name: "Casa Zimbabwe",
  description: "General chat room",
  creator_id: 1,
  users: [Repo.get!(User, 1)],
  messages: [
    %Message{
      content: "Hello, world! Room2",
      user_id: 1
    },
    %Message{
      content: "Hi, there! Room2",
      user_id: 1
    }
  ]
})

user = Repo.get!(User, 1) |> Repo.preload(:rooms)
user = Ecto.Changeset.change(user, rooms: user.rooms ++ [Repo.get!(Room, 1), Repo.get!(Room, 2)])

Repo.update!(user)
