# tomitter

a twitter like application.

## architecture

### `users`

user management api.
create user, login user, identify user.

* Kotlin
    * Ktor
    * Exposed
    * SQLite

### `profiles`

profile management api.
create profile, update profile, get profile.

* TypeScript
    * Express.js
    * omusubi
    * SQLite

### `tweet`

tweet management api.
create tweet, get tweet.

* Ruby
    * redis
    * grape
    * faraday
    * rackup

### `link`

user connection management api.
link user, get link.

* C#
    * .net core
    * EntityFrameworkCore
    * MySQL

### `web`

web application.
login, tweet, link.

* TypeScript
    * React
    * parcel
    * styled-component
