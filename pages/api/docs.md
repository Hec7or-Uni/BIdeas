## REST API - V1
You can access the REST API of the server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is `localhost:3000/api/`, so you can e.g. reach the API with `localhost:3000/api/user`).

### `User`
* **`POST`** `/api/user` Register a new user
    * body:
        * `name: String`: Name of the new user
        * `lastName: String`: Last name of the new user
        * `userName: String`: Nick of the new user
        * `email: String`: Email of the new user
        * `plan: Number`: Account type
        * `salt: String`: Random Char[16] with SHA512 encryption
        * `passwd: String`: (salt + passwd) with SHA512 encryption
* **`PUT`** ❌ `/api/user` 🔒 Updates the data of a user
* **`GET`** `/api/user?id=Number` 🔒 Returns the data of the user + projects
* **`DELETE`** ❌ `/api/user` 🔒 Deletes the account of the user
* **`GET`** `/api/user/lite?id=Number` 🔒 Returns a brief of user's data + teams
* **`POST`** ❓ `/api/user/login` Returns the credentials of the users to check the login
    * body:
        * `id: String`: The email or username of a user
* **`GET`** ❓ `/api/user/participates?id=Number` 🔒 Returns the participations of a user
* **`DELETE`** `/api/user/participates?id=Number` 🔒 Deletes a participation
* **`POST`** ❓ `/api/user/request-join` 🔒 Request to join a team
    * body:
        * `id: Number`
* **`GET`** ❓ `/api/user/request-join?id=Number` 🔒 Returns the teams contacted by a user
* **`DELETE`** `/api/user/request-join?id=Number` 🔒 Delete the request of a user -> team
* **`POST`** ❓ `/api/user/request-member` 🔒 Request a user to join a team
    * body:
        * `id: Number`
* **`GET`** ❓ `/api/user/request-member?id=Number` 🔒 Returns the users contacted by a team
* **`DELETE`** `/api/user/request-member?id=Number` 🔒 Deletes the request of a team -> user
* **`GET`** `/api/user/requested-join` 🔒 Returns the requests of a user -> team
* **`GET`** `/api/user/requested-member` 🔒 Returns the request of a team -> user

### `Users` 
* **`GET`** `/api/users/` 🔒 Returns the data of each user
* **`GET`** `/api/users/lite` 🔒 Returns a brief of each user
* **`GET`** `/api/users/{id}` 🔒 Returns the data of a specific user

### `Team` 
* **`POST`** ❌ `/api/team/` 🔒 Create a team
* **`PUT`** ❌ `/api/team/` 🔒 Updates the data of a team
* **`GET`** `/api/team?id=number` 🔒 Returns the data of a team + users
* **`DELETE`** ❌ `/api/team/` 🔒
* **`GET`** `/api/team/lite?id:<number|string>` 🔒 Returns a brief of a specified team
* **`POST`** `/api/team/member` 🔒 Links a user to a team
    * body:
        * `type: Number`: User or team
        * `id: Number`: Id of the pair {idUser, idProject} in requestMember or requestJoin
        * `idUser: Number`: Id of the user
        * `idProject: Number`: Id of the project
* **`DELETE`** `/api/team/member?id=number` 🔒 Deletes a pair of {user, project}

### `Teams` 
* **`GET`** `/api/teams/` 🔒 Returns the data of each team
* **`GET`** `/api/teams/lite` 🔒 Returns a brief of each team
* **`GET`** `/api/teams/{id}` 🔒 Returns the data of a specific team
