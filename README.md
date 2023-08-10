# Development

The application requires two servers to run at the same time.
## Starting the client (Web Interface)

Ensure you have a suitable version of `node` and `npm` and ensure you are inside the client directory.
```
cd ./client

npm install

npm run dev
```
Now view the console for the port that the development server is listening on. It should be `localhost:3000`

## Starting the server (Backend interface)

You MUST have the following Elixir dependencies installed. You can install both from [elixir-lang](https://elixir-lang.org/install.html) website. Install the following versions:
```
Elixir 1.15.4
Erlang/OTP 26 [erts-14.0.2]
PostgreSQL 15
```
After successfully installing, you should be able to see the version in the terminal
```
elixir -v

Erlang/OTP 26 [erts-14.0.2] [source] [64-bit] [smp:10:10] [ds:10:10:10] [async-threads:1] [jit] [dtrace]

Elixir 1.15.4 (compiled with Erlang/OTP 26)
```
Additionally, you must have a postgreSQL server installed. See instructions [here](https://www.postgresql.org/download/).
Once Elixir, OTP 26, and PostreSQL are installed, you can run the following commands sequentally. First ensure you are in the server directory:

```
cd ./server
mix deps.get
mix deps.compile
mix ecto.reset
mix phx.server
```
The server while now be available on `localhost:4000`. The frontend `client` is already programmed to communciate with the server on port `4000`. No additional configuration is needed.
## Accessing the app locally

Navigate to `localhost:3000` and you will be confronted with the sign in page. The local database comes seeded with the following login automatically:
```
username: test@test.com
password: Password123
```
This will give you full access to the application and functionality.
