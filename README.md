# blogs-api
This is an api for a blog app

### User
| field  |  data_type | constraints  |
|---|---|---|
|  firstname | string  |  required |
|  lastname  |  string |  required |
|  email     | string  |  required |
|  password |   string |  required |


### blogs
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  description|   string  |  optional  |
|  body  | string |  required  |
|  author   | objectId |  required |
|  state | string  |  required,default:"draft"|
|  read_count |  number |optional |
|  reading_time |  number | optional |
|  time_stamp |  date |  optional |
|  tags|  [string] | optional |




## APIs
---

### Signup User

- Route: /authentication/signup
- Method: POST

### Signin User

- Route:/authentication /signin
- Method: POST

---
### Create blog

- Route:/blogs /create
- Method: POST
- Header
    - Authorization: Bearer {token}
---
### Get blogsById

- Route: /blogs/:id
- Method: GET
- Header
    - Authorization: Bearer {token}


### Get allBlogs

- Route: /blogs/get
- Method: GET
- Header:
    - Authorization: Bearer {token}
    
### Patch blogs
- Route:/blogs/:id
-method:PATCH
-Header:
    - Authorization: Bearer {token}

### Delete
- Route:/blogs/:id
-method:DELETE
-Header:
    - Authorization: Bearer {token}
     
## Contributor
- Samuel Warrie