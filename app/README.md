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
11. [Locations](#locations)

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
      "location_id": 1,
      "rechatters_count": 0,
      "likes_count": 0,
      "quoted_rechatters_count": 0
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
        "location_id": 1,
        "rechatters_count": 5,
        "likes_count": 10,
        "quoted_rechatters_count": 3
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
      "location_id": 1,
      "rechatters_count": 5,
      "likes_count": 10,
      "quoted_rechatters_count": 3
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

## Rechatters

### Create a Rechatter

Rechatter or quote-chatter other users' content.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/rechatters
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "chatter_id": 1,
      "content": "Rechattered with a comment"
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
      "chatter_id": 1,
      "content": "Rechattered with a comment",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```

### Get Rechatters for a Chatter

Show all quote-chatters (rechatters with content) associated with a specific chatter.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/chatters/:chatter_id/rechatters

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
        "chatter_id": 1,
        "content": "Rechattered with a comment",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ]
    ```


### Update a Rechatter

Edit rechatters.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/rechatters/:id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "content": "Updated rechatter content"
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
      "chatter_id": 1,
      "content": "Updated rechatter content",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T01:00:00Z"
    }
    ```

### Delete a Rechatter

Undo rechatters.

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/rechatters/:id

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Rechatter deleted",
      "statusCode": 200
    }
    ```

- Error response: Rechatter not found or not owned by the user

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Rechatter not found or not owned by the user",
      "statusCode": 404
    }

## Direct Messages

### Send a New Direct Message

Send a new direct message from one user to another.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/dm
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "recipient_id": 2,
      "content": "Hello, how are you?"
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
      "sender_id": 1,
      "recipient_id": 2,
      "content": "Hello, how are you?",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T00:00:00Z"
    }
    ```

### Get Direct Message Conversation

Display direct messages in a conversation view between two users.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/dm/conversation/:user_id

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "id": 1,
        "sender_id": 1,
        "recipient_id": 2,
        "content": "Hello, how are you?",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-01T00:00:00Z"
      }
    ]
    ```

### Update a Direct Message

Edit a sent direct message.

- Require Authentication: true
- Request

  - Method: PUT
  - URL: /api/dm/:dm_id
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "content": "Updated message content"
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
      "sender_id": 1,
      "recipient_id": 2,
      "content": "Updated message content",
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-01-01T01:00:00Z"
    }
    ```
## Followers

### Follow a User

Follow another user.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/follow/:user_id

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "follower_id": 1,
      "following_id": 2
    }
    ```

### Unfollow a User

Unfollow another user.

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/unfollow/:user_id

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Unfollowed successfully"
    }
    ```

### Get a User's Followers

Get a list of users who follow the specified user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/:user_id/followers

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "id": 1,
        "username": "User1",
        "first_name": "John",
        "last_name": "Doe"
      }
    ]
    ```

### Get a User's Following

Get a list of users that the specified user is following.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/:user_id/following

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "id": 2,
        "username": "User2",
        "first_name": "Jane",
        "last_name": "Doe"
      }
    ]
    ```
## Trends

### Get Trending Hashtags

Retrieve the top trending hashtags based on the number of occurrences in chatters within a specified time range.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/trends
  - Query Parameters:
    - `time_range`: (optional) The time range for the trends, e.g., "1h" (1 hour), "1d" (1 day), "1w" (1 week)
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    [
      {
        "hashtag": "#trending",
        "count": 1234
      },
      {
        "hashtag": "#chitter",
        "count": 567
      }
    ]
    ```

- Error response: none

### Get Chatters by Trending Hashtag

Retrieve chatters containing a specific hashtag when a user clicks on a trending topic.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/trends/:hashtag/chatters
  - URL Parameters:
    - `hashtag`: The hashtag clicked by the user (without the '#')
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
        "content": "Hello, world! #trending",
        "created_at": "2023-03-22T14:34:56.789Z",
        "updated_at": "2023-03-22T14:34:56.789Z",
        "media_url": "",
        "gif_url": "",
        "location_id": 1
      },
      {
        "id": 2,
        "user_id": 2,
        "username": "JaneDoe",
        "profile_picture": "",
        "content": "Check this out! #trending",
        "created_at": "2023-03-22T14:35:56.789Z",
        "updated_at": "2023-03-22T14:35:56.789Z",
        "media_url": "",
        "gif_url": "",
        "location_id": 2
      }
    ]
    ```

- Error response: none
