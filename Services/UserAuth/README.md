## Create file .env with values

```
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=
MONGO_PORT=
MONGO_DATABASE=

SECRET=
```

## domain.com/register
```json
{
    user: {
        email: string,
        fullname: string,
        password: string,
        phone: string,
        adress: {
            street: string,
            number: string,
            zip: number,
            city: string
        }
    }
}
```

### returns
```json
{ 
    message: string,
    jwt: string // if success
}
```

## domain.com/login
```json
{
    email: string,
    password: string
}
```

### returns
```json
{
    message: string,
    jwt: string // if success
}
```

## domain.com/update
### also requires jwt header
```json
{
    user: {
        _id: string,
        email: string,
        fullname: string,
        password: string,
        phone: string,
        adress: {
            street: string,
            number: string,
            zip: number,
            city: string
        },
        isAdmin: Boolean
    }
}
```

### returns

```json
{
    message: string
}
```

## domain.com/auth
### only requires header with jwt
```
jwt: string
```

### returns
```json
{
    authorized: Boolean,
    isAdmin: Boolean,
    user: {
        _id: string,
        email: string,
        fullname: string,
        password: string,
        phone: string,
        adress: {
            street: string,
            number: string,
            zip: number,
            city: string
        },
        isAdmin: Boolean
    }
}
```

## domain.com/admin/getAllUsers
### only requires header
```
jwt: string
```

### returns
```json
{
    message: string
}
```

## domain.com/admin/changeprivilege
### changes the admin from false to true or true to false, depending on the current role
### header
```
jwt: string
```
### body
```json
{
    userID: string
}
```

### returns
```json
{
    message: string
}
```

## domain.com/admin/updateUser
### header
```json
"jwt": string
```
### body
### all values are optional but the _id
```json
{
    "user": {
        "_id": string,
        "email": string,
        "fullname": string,
        "password": string,
        "phone": string,
        "adress": {
            "street": string,
            "number": string,
            "zip": number,
            "city": string
        }
    }
}
```

### returns
```json
{
    "message": string,
    "user": {
        "_id": string,
        "email": string,
        "fullname": string,
        "password": string,
        "phone": string,
        "adress": {
            "street": string,
            "number": string,
            "zip": number,
            "city": string
        },
        "isAdmin": Boolean
    }
}
```