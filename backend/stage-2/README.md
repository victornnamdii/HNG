# HNG BACKEND TASK TWO

This repo contains my solution for stage 2.

This task is hosted on: https://hng-task-2-fh1j.onrender.com

## Requirements

* A PostgreSQL Database
* Node.js
* TypeScript

## Setup

* Clone this repository `git clone https://github.com/victornnamdii/HNG.git` in terminal.
* Access the directory: `cd HNG/backend/stage-2` in terminal.
* Run `npm install` in terminal.
* Duplicate the `env.example` and fill in correct fields.
* Run `npm run start` in terminal.
* Access the server from the specified port.

## Tests

Unittests are contained in the `src/tests` directory. To test the server run the command `npm test` in terminal.

- - - -

## API Documentation

### Add Person

This request creates a new `Person` resource.

- **URL**: `/api`
- **Request Method**: `POST`

**Sample Request**
```bash
curl -X POST -H "Content-Type: application/json" 'https://hng-task-2-fh1j.onrender.com/api' \
--data '{
    "name": "victornnamdii",
    "age": "22",
    "email": "victorilodiuba@gmail.com",
    "occupation": "Backend Engineer"
}'
```

**Request Body**

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| name | Yes | String | The person's name. NB: This field is case insensitive, i.e, ILODIUBA and ilodiuba refer to the same Person resource. |
| age | No | String | The person's age. Should be a string of the number. |
| email | No | String | The person's email |
| occupation | No | String | The person's occupation |

**Successful Response (Example)**:

```javascript
{
    "message": "New Person successfully added to DB",
    "Person": {
        "id": "11c08fc1-2f94-423c-92ca-7b0578b0b74b",
        "email": "victorilodiuba@gmail.com",
        "name": "victornnamdii",
        "age": 22,
        "occupation": "Backend Engineer",
        "updatedAt": "2023-09-11T15:06:49.348Z",
        "createdAt": "2023-09-11T15:06:49.348Z"
    }
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Please enter a name | 400 | Name field didn't have a value in the request body. |
| Name should be a string | 400 | Value of `name` in the request body wasn't a string. |
| Name already exists | 400 | Name in the request body already belongs a person in the DB. |
| Name already exists | 400 | Email in the request body already belongs a person in the DB. |
| Email should be a string | 400 | Email in the request body wasn't a string. |
| Please enter a valid email | 400 | Value of `email` field in the request body wasn't a valid email. |
| Age should be a string | 400 | Value of `age` in the request body wasn't a string. |
| Please enter a valid age | 400 | Value of `age` field in the request body wasn't a valid age. |
| Occupation should be a string | 400 | Value of `occupation` in the request body wasn't a string. |
| Internal Server Error | 500 | An internal server error occured |

### Get Person by name

This request returns a `Person` resource with a name specified in query parameter `name`.

- **URL**: `/api?name=example_name`. where `example_name` is the person's name.
- **Request Method**: `GET`

**Sample Request**
```bash
curl 'https://hng-task-2-fh1j.onrender.com/api?name=Ilodiuba'
```


**Successful Response (Example)**:

```javascript
{
    "Person": {
        "id": "2838f1d0-f000-4d2e-9cb7-21a1b346fb45",
        "email": "victor.ilodiuba@gmail.com",
        "name": "ilodiuba",
        "age": 22,
        "occupation": "Frontend Engineer",
        "createdAt": "2023-09-11T14:19:52.152Z",
        "updatedAt": "2023-09-11T14:58:55.708Z"
    }
}
```

NB: If the query parameter 'name' is not added to the url, it returns:

```javascript
{
    "message": "Welcome, add a query 'name' to the url to find a Person with the specified name",
    "slack_name": "victornnamdii",
    "current_day": "Monday",
    "utc_time": "2023-09-11T16:04:27Z",
    "track": "track",
    "github_file_url": "https://github.com/victornnamdii/HNG/blob/main/backend/stage-2/src/server.ts",
    "github_repo_url": "https://github.com/victornnamdii/HNG/tree/main/backend/stage-2",
    "status_code": 200
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| No user found with specified name | 404 | There is no user in the DB with the specified name. |
| Internal Server Error | 500 | An internal server error occured |

### Get all Persons

This request returns all `Person` resources in the DB.

- **URL**: `/api/all/persons`
- **Request Method**: `GET`

**Sample Request**
```bash
curl 'https://hng-task-2-fh1j.onrender.com/api/all/persons'
```


**Successful Response (Example)**:

```javascript
{
    "Persons": [
        {
            "id": "11c08fc1-2f94-423c-92ca-7b0578b0b74b",
            "email": "victor.ilodiuba2@gmail.com",
            "name": "victornnamdii2",
            "age": 22,
            "occupation": "Backend Engineer",
            "createdAt": "2023-09-11T15:06:49.348Z",
            "updatedAt": "2023-09-11T15:06:49.348Z"
        },
        {
            "id": "2838f1d0-f000-4d2e-9cb7-21a1b346fb45",
            "email": "victor.ilodiuba@gmail.com",
            "name": "ilodiuba",
            "age": 22,
            "occupation": "Frontend Engineer",
            "createdAt": "2023-09-11T14:19:52.152Z",
            "updatedAt": "2023-09-11T14:58:55.708Z"
        }
    ]
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Internal Server Error | 500 | An internal server error occured |

### Get Person by ID

This request returns a `Person` resource with a specified ID.

- **URL**: `/api/user_id`. where `user_id` is the person's id.
- **Request Method**: `GET`

**Sample Request**
```bash
curl -X POST -H "Content-Type: application/json" 'https://hng-task-2-fh1j.onrender.com/api/11c08fc1-2f94-423c-92ca-7b0578b0b74b'
```


**Successful Response (Example)**:

```javascript
{
    "Person": {
        "id": "11c08fc1-2f94-423c-92ca-7b0578b0b74b",
        "email": "victor.ilodiuba2@gmail.com",
        "name": "victornnamdii2",
        "age": 22,
        "occupation": "Backend Engineer",
        "createdAt": "2023-09-11T15:06:49.348Z",
        "updatedAt": "2023-09-11T15:06:49.348Z"
    }
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Invalid User ID. Please enter a valid UUID V4. | 400 | The user_id wasn't a v4 uuid. |
| No user found with specified ID | 404 | There is no user in the DB with the specified ID. |
| Internal Server Error | 500 | An internal server error occured |

### Update Person by ID

This request updates an already existing `Person` resource.

- **URL**: `/api/user_id`. where `user_id` is the person's id.
- **Request Method**: `PATCH`

**Sample Request**
```bash
curl -X PATCH -H "Content-Type: application/json" 'https://hng-task-2-fh1j.onrender.com/api/11c08fc1-2f94-423c-92ca-7b0578b0b74b' \
--data '{
    "name": "victornnamdii2"
}'
```

**Request Body**

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| name | No | String | The updated person's name. NB: This field is case insensitive, i.e, ILODIUBA and ilodiuba refer to the same Person resource. |
| age | No | String | The updated person's age. Should be a string of the number. |
| email | No | String | The updated person's email |
| occupation | No | String | The updated person's occupation |

**Successful Response (Example)**:

```javascript
{
    "message": "Person successfully updated",
    "updates": {
        "name": "victornnamdii2"
    }
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Invalid User ID. Please enter a valid UUID V4. | 400 | The user_id wasn't a v4 uuid. |
| Name should be a string | 400 | Value of `name` in the request body wasn't a string. |
| Name already exists | 400 | Name in the request body already belongs a person in the DB. |
| Name already exists | 400 | Email in the request body already belongs a person in the DB. |
| Email should be a string | 400 | Email in the request body wasn't a string. |
| Please enter a valid email | 400 | Value of `email` field in the request body wasn't a valid email. |
| Age should be a string | 400 | Value of `age` in the request body wasn't a string. |
| Please enter a valid age | 400 | Value of `age` field in the request body wasn't a valid age. |
| Occupation should be a string | 400 | Value of `occupation` in the request body wasn't a string. |
| Internal Server Error | 500 | An internal server error occured |

### Update Person by name

This request updates an already existing `Person` resource.

- **URL**: `/api?name=example_name`. where `example_name` is the person's name.
- **Request Method**: `PATCH`

**Sample Request**
```bash
curl -X PATCH -H "Content-Type: application/json" 'https://hng-task-2-fh1j.onrender.com/api?name=victornnamdii' \
--data '{
    "name": "victornnamdii2"
}'
```

**Request Body**

| Field | Required | Type | Description |
| --- | --- | --- | --- |
| name | No | String | The updated person's name. NB: This field is case insensitive, i.e, ILODIUBA and ilodiuba refer to the same Person resource. |
| age | No | String | The updated person's age. Should be a string of the number. |
| email | No | String | The updated person's email |
| occupation | No | String | The updated person's occupation |

**Successful Response (Example)**:

```javascript
{
    "message": "Person successfully updated",
    "updates": {
        "name": "victornnamdii"
    }
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Please specify name of Person to update | 400 | Query parameter `name` wasn't added to the url |
| Name should be a string | 400 | Value of `name` in the request body wasn't a string. |
| Name already exists | 400 | Name in the request body already belongs a person in the DB. |
| Name already exists | 400 | Email in the request body already belongs a person in the DB. |
| Email should be a string | 400 | Email in the request body wasn't a string. |
| Please enter a valid email | 400 | Value of `email` field in the request body wasn't a valid email. |
| Age should be a string | 400 | Value of `age` in the request body wasn't a string. |
| Please enter a valid age | 400 | Value of `age` field in the request body wasn't a valid age. |
| Occupation should be a string | 400 | Value of `occupation` in the request body wasn't a string. |
| Internal Server Error | 500 | An internal server error occured |

### Delete Person by ID

This request deletes a `Person` resource with a specified ID from the DB.

- **URL**: `/api/user_id`. where `user_id` is the person's id.
- **Request Method**: `DELETE`

**Sample Request**
```bash
curl -X DELETE -H "Content-Type: application/json" 'https://hng-task-2-fh1j.onrender.com/api/11c08fc1-2f94-423c-92ca-7b0578b0b74b'
```

**Successful Response (Example)**:

```javascript
{
    "message": "ilodiuba successfully deleted"
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Invalid User ID. Please enter a valid UUID V4. | 400 | The user_id wasn't a v4 uuid. |
| No user found with specified ID | 404 | There is no user in the DB with the specified ID. |
| Internal Server Error | 500 | An internal server error occured |

### Delete Person by name

This request deletes a `Person` resource with a name specified in query parameter `name`

- **URL**: `/api?name=example_name`. where `example_name` is the person's name.
- **Request Method**: `DELETE`

**Sample Request**
```bash
curl -X PATCH -H "Content-Type: application/json" 'https://hng-task-2-fh1j.onrender.com/api?name=Ilodiuba'
```

**Successful Response (Example)**:

```javascript
{
    "message": "ilodiuba successfully deleted"
}
```

**Error Messages**:

| Message | Status Code | Description |
| --- | --- | --- |
| Please specify name of Person to delete | 400 | Query parameter `name` wasn't added to the url |
| No user found with specified name | 404 | There is no user in the DB with the specified name. |
| Internal Server Error | 500 | An internal server error occured |
