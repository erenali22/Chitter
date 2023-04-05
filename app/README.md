# Chitter API Documentation

## Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Chatters](#chatters)
4. [Likes](#likes)
5. [Replies](#replies)
6. [Rechatters](#rechatters)
7. [Direct Messages](#direct-messages)
8. [Followers](#followers)
9. [Trends](#trends)
10. [Who to Follow](#who-to-follow)
11. [Chatter Trends](#chatter-trends)
12. [Locations](#locations)

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/me
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "profile_picture": "",
      "bio": "Hello, I am John Smith!",
      "location": "New York, USA"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/login
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "profile_picture": "",
      "bio": "Hello, I am John Smith!",
      "location": "New York, USA",
      "token": ""
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/new/user
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "password": "secret password",
      "profile_picture": "",
      "bio": "Hello, I am John Smith!",
      "location": "New York, USA"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "profile_picture": "",
      "bio": "Hello, I am John Smith!",
      "location": "New York, USA",
      "token": ""
    }
    ```

- Error Response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": { "email": "User with that email already exists" }
    }
    ```

- Error Response: User already exists with the specified username

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": { "username": "User with that username already exists" }
    }
    ```

- Error Response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "password": "Password is required"
      }
    }
    ```

## Users

### Get a User's Profile

Returns the public profile information for the specified user.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/users/:username
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "profile_picture": "",
      "bio": "Hello, I am John Smith!",
      "location": "New York, USA",
      "created_at": "2023-03-20T12:34:56.789Z"
    }
    ```

- Error Response: User not found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found",
      "statusCode": 404
    }
    ```

### Update a User's Profile

Updates the current user's profile with the provided information.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/users/:username
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "profile_picture": "",
      "bio": "Hello, I am John Smith!",
      "location": "New York, USA"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "profile_picture": "",
      "bio": "Hello, I am John!",
      "location": "Seattle, USA",
      "updated_at": "2023-03-22T14:34:56.789Z"
    }
    ```

- Error Response: User not found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User not found",
      "statusCode": 404
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required"
      }
    }
    ```
## Chatters

### Create a New Chatter

Compose and post a new chatter with a character limit, optional hashtags, gif, emojis, and location.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/chatters
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "content": "Hello, world! #chitter",
      "media_url": "",
      "gif_url": "",
      "location_id": 1
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "content": "Hello, world! #chitter",
      "created_at": "2023-03-22T14:34:56.789Z",
      "updated_at": "2023-03-22T14:34:56.789Z",
      "media_url": "",
      "gif_url": "",
      "location_id": 1
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "content": "Content is required and must be within 280 characters"
      }
    }
    ```

### Get Chatters for User's Timeline

Retrieve chatters for the current user's timeline, including chatters from people they follow.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/chatters/timeline
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "username": "JohnSmith",
        "profile_picture": "",
        "content": "Hello, world! #chitter",
        "created_at": "2023-03-22T14:34:56.789Z",
        "updated_at": "2023-03-22T14:34:56.789Z",
        "media_url": "",
        "gif_url": "",
        "location_id": 1
      }
    ]
    ```

### Update a Chatter (Optional)

Edit a chatter created by the current user.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/chatters/:id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "content": "Bye, world! #chitter"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "user_id": 1,
      "content": "Bye, world! #chitter",
      "created_at": "2023-03-22T14:34:56.789Z",
      "updated_at": "2023-03-22T15:34:56.789Z",
      "media_url": "",
      "gif_url": "",
      "location_id": 1
    }
    ```

- Error response: Chatter not found or not owned by the user

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter not found or not owned by the user",
      "statusCode": 404
    }
    ```

### Delete a Chatter

Remove a chatter created by the current user.

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/chatters/:id
  - Body: none

- Successful Response

  - Status Code: 204
  - Headers:
    - Content-Type: application/json
  - Body: none

- Error response: Chatter not found or not owned by the user

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter not found or not owned by the user",
      "statusCode": 404
    }
    ```
## Likes

### Like a Chatter

Add a like to a chatter by the current user.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/chatters/:id/likes
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter liked",
      "chatter_id": 1,
      "user_id": 2
    }
    ```

- Error response: Chatter not found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter not found",
      "statusCode": 404
    }
    ```

### Unlike a Chatter

Remove a like from a chatter by the current user.

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/chatters/:id/likes
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter unliked",
      "chatter_id": 1,
      "user_id": 2
    }
    ```

- Error response: Chatter not found or not liked by the user

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter not found or not liked by the user",
      "statusCode": 404
    }
    ```

## Replies

### Create a Reply

Add a reply to a chatter by the current user.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/chatters/:id/replies
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "content": "This is a reply to the chatter"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reply created",
      "chatter_id": 1,
      "user_id": 2,
      "content": "This is a reply to the chatter",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-01T12:00:00Z"
    }
    ```

- Error response: Chatter not found

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Chatter not found",
      "statusCode": 404
    }
    ```

### Get Replies for a Chatter

Retrieve all replies for a specific chatter.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/chatters/:id/replies

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "id": 1,
        "user_id": 2,
        "username": "JaneDoe",
        "content": "This is a reply to the chatter",
        "created_at": "2023-01-01T12:00:00Z",
        "updated_at": "2023-01-01T12:00:00Z"
      },
      {
        "id": 2,
        "user_id": 3,
        "username": "JohnSmith",
        "content": "Another reply to the chatter",
        "created_at": "2023-01-01T12:15:00Z",
        "updated_at": "2023-01-01T12:15:00Z"
      }
    ]
    ```

### Update a Reply

Edit a reply to a chatter by the current user.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/replies/:id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "content": "This is an updated reply to the chatter"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reply updated",
      "reply_id": 1,
      "content": "This is an updated reply to the chatter",
      "updated_at": "2023-01-02T12:00:00Z"
    }
    ```

- Error response: Reply not found or not owned by the user

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reply not found or not owned by the user",
      "statusCode": 404
    }
    ```

### Delete a Reply

Remove a reply to a chatter created by the current user.

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/replies/:id

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reply deleted",
      "statusCode": 200
    }
    ```

- Error response: Reply not found or not owned by the user

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Reply not found or not owned by the user",
      "statusCode": 404
    }
    ```

