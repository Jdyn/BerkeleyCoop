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
alias Berkeley.House

houses = [
  %House{
    name: "Casa Zimbabwe",
    full_name: "Casa Zimbabwe",
    description: "Casa Zimbabwe has gone through many incarnations over the years since her construction in the 1960s as both the first building designed specifically to be a student co-op, and the first in the nation to be co-ed."
  },
  %House{
    name: "Cloyne Court",
    full_name: "Cloyne Court",
    description: "Cloyne Court opened fresh after renovations in Fall 2014 as the Substance-Free Academic Theme House. Cloyne is the closest BSC house to the UC campus, but is also removed enough to offer respite from the hubbub of Berkeley. "
  },
  %House{
    name: "Davis House",
    full_name: "Davis House",
    description: "Originally built in the late 19th century for the attorney of the storied Hearst Family, this resplendent manor was one of the first homes to grace Panoramic Hill. Just as close to campus as to a leisurely walk in the woods, Davis is a welcoming and comfortable retreat."
  },
  %House{
    name: "Euclid Hall",
    full_name: "Euclid Hall",
    description: "Euclid is one of the smaller houses, and correspondingly clean and mellow. We're unique in that we have the highest single to double ratio in the co-ops - out of nineteen rooms, only FIVE are doubles."
  },
  %House{
    name: "HiP",
    full_name: "Hillegass Parker House",
    description: "Hillegass Parker House (HiP) is unlike any other place you are likely to live. It is a home, a safe haven, a community, an experiment, and many other things."
  },
  %House{
    name: "Hoyt Hall",
    full_name: "Hillegass Parker House",
    description: "Hoyt Hall is women-identifying only in the fall and spring, co-ed during the summer. Looking for a place where you can find a community full of the most ambitious and amazing individuals you'll ever meet? Well, Hoyt Hall is your best bet."
  },
  %House{
    name: "Kidd Hall",
    full_name: "Kidd Hall",
    description: "Childish and totally awesome at heart, Kidd is a happy-go-lucky house just two blocks from North Gate. Unique co-opers from all walks of life manage to fit into the occasionally quiet, but always welcoming and everchanging culture of the BSC's smallest house."
  },
  %House{
    name: "Kingman Hall",
    full_name: "Kingman Hall",
    description: "Kingman Hall, aka Toad Hall, when the weather is just so, is something of a resplendent Victorian manor lodged in the red wooded hills of North Berkeley. Ivy and Morning Glories creep along the sides of the house."
  },
  %House{
    name: "Lothlorien",
    full_name: "Lothlorien",
    description: "Founded in the 1970s, Lothlorien has long-standing traditions of activism and art. It's a house where one can make signs for a protest, learn to cook, find peer support, paint a mural, watch the sunset over the Bay, and build friendships - all in the same"
  },
  %House{
    name: "POC House",
    full_name: "Person of Color Theme House",
    description: "No Description"
  },
  %House{
    name: "Ridge House",
    full_name: "Ridge House",
    description: "Ridge House is the perfect fit for people who are looking for a friendly atmosphere. Ridgelings know there is a good balance between respect for the needs of a student and appreciation of a well-deserved break."
  },
  %House{
    name: "Sherman Hall",
    full_name: "Ridge House",
    description: "Sherman is women identifying only during the Fall and Spring. Men and women in the summer. Sherman Hall is a gorgeous 9,000 square foot home on the Southside of Berkeley. Sherman Hall is ADA accessible and has two DSP singles."
  },
  %House{
    name: "Stebbins",
    full_name: "Stebbins Hall",
    description: "Stebbins Hall is home to students of all backgrounds: veteran co-op'ers and sophomores fresh out of the dorms, junior transfers and foreign exchange students, engineers and sun worshippers, kombucha brewers and vegan bakers, hikers and pole dancers, yogis and crossword fanatics, the gluten-intolerant and caffeine addicts"
  },
  %House{
    name: "Convent",
    full_name: "The Convent",
    description: "The Convent is in fact a former convent, but the studious, cloistered nuns have long since been replaced by studious, cloistered graduate and re-entry students. Well, at least some of them are studious."
  },
  %House{
    name: "Wilde House",
    full_name: "Johnson-Rivera House",
    description: "Identifiable by the bright energy radiating from it, the Oscar Wilde Johnson-Rivera co-op houses enough people to make every day feel like a social event but few enough to create a close sense of community between its colorful members."
  },
  %House{
    name: "Wolfhaus",
    full_name: "Wolf House",
    description: "The king of the south, Wolf House (“Wolfhaus”) is the pinnacle of cooperative living. Here exists the perfect mix: a small and intimate living space where everyone knows and loves each other, and also a big-house reputation with parties to match, including the world-famous annual Drag Party."
  },
  %House{
    name: "Fenwick Weavers",
    full_name: "Fenwick Weavers Village",
    description: "Fenwick Weavers' Village is an apartment complex"
  },
  %House{
    name: "Northside",
    full_name: "Northside Apartments",
    description: "Northside Co-op is located in two adjacent buildings on Le Conte near Kidd, Euclid, Stebbins, and Hoyt co-ops. It is what might be called the final resting place of all good co-opers (hardwood floors, lots of light through multi-paned, old-fashioned windows)."
  },
  %House{
    name: "Rochdale",
    full_name: "Rochdale Apartments",
    description: "The great thing about the BSC's largest co-op, Rochdale Village, is that it has the best of both worlds. As one of 259 co-op members in this apartment complex, you can mingle at parties, get together for a game of pool in the common room, or just chat with fellow students while doing your laundry."
  },
]

Enum.each(houses, fn house ->
  Repo.insert!(house)
end)

houses = Repo.all(House)

Accounts.register(
  %{
    first_name: "John",
    last_name: "Doe",
    email: "test@test.com",
    password: "Password123",
    house_id: 1
  },
  :default
)

Accounts.register(
  %{
    first_name: "Sally",
    last_name: "Mae",
    email: "test@test1.com",
    password: "Password123",
    house_id: 1
  },
  :default
)

Accounts.register(
  %{
    first_name: "Alice",
    last_name: "Wonder",
    email: "test@test2.com",
    password: "Password123",
    house_id: 2
  },
  :default
)

Repo.insert(%Room{
  name: "Global Chat",
  description: "All houses in one room.",
  creator_id: 1,
  houses: houses,
  users: [],
  messages: []
})

Repo.insert(%Room{
  name: "Casa Zimbabwe",
  description: "General chat room",
  creator_id: 1,
  houses: [Repo.get_by!(House, name: "Casa Zimbabwe")],
  users: [Repo.get!(User, 1), Repo.get!(User, 2)],
  messages: []
})

# user = Repo.get!(User, 1) |> Repo.preload(:rooms)
# user = Ecto.Changeset.change(user, rooms: user.rooms ++ [%{id: 1}, %{id: 2}])

# Repo.update!(user)
