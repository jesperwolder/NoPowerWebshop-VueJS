### GET domain.com/all
## returns
```json
{
    message: string,
    products: [
        {
            "_id": string,
            "Creator": {
                "createdBy": string,
                "creatorEmail": string,
                "creatorFullname": string
            },
            "Name": string,
            "Description": string,
            "Price": Number,
            "Image": string,
            "SalePercentage": number,
            "TechnicalDetails": [
                { "name": string, "value": any }
            ]
        }
    ]
}
```

### GET domain.com/product/:id
## returns
```json
{
    "message": string,
    "product": {
        "_id": string,
        "Creator": {
            "createdBy": string,
            "creatorEmail": string,
            "creatorFullname": string
        },
        "Name": string,
        "Description": string,
        "Price": Number,
        "Image": string,
        "SalePercentage": number,
        "TechnicalDetails": [
            { "name": string, "value": any }
        ]
    }
}
```

### POST domain.com/admin/create
## body (also requires jwt in headers)
```json
{
    "product": {
        "Name": string,
        "Description": string,
        "Price": Number,
        "Image": string,
        "SalePercentage": number, //optional
        "TechnicalDetails": [
            { "name": string, "value": any }
        ]
    }
}
```
### returns
```json
{
    "message": string,
    "product": {
        "_id": string,
        "Creator": {
            "createdBy": string,
            "creatorEmail": string,
            "creatorFullname": string
        },
        "Name": string,
        "Description": string,
        "Price": Number,
        "Image": string,
        "SalePercentage": number,
        "TechnicalDetails": [
            { "name": string, "value": any }
        ]
    }
}
```

### POST domain.com/admin/update
## body (requires jwt header)
```json
{
    "product": {
        "_id": string, // id of product to update
        "name": string,
        "description": string,
        "price": number,
        "image": string,
        "TechnicalDetails": [
            { "name": string, "value": any }
        ],
        "SalePercentage": number
    }
}
```

## returns
```json
{
    "message": string,
    "product": {
        "_id": string,
        "Creator": {
            "createdBy": string,
            "creatorEmail": string,
            "creatorFullname": string
        },
        "Name": string,
        "Description": string,
        "Price": Number,
        "Image": string,
        "SalePercentage": number,
        "TechnicalDetails": [
            { "name": string, "value": any }
        ]
    }
}
```

### POST domain.com/admin/changeProductStatus/{ID}
##  (requires jwt header)
## no body required

## returns
```json
{
    "message": string,
    "product": {
        "_id": string,
        "Creator": {
            "createdBy": string,
            "creatorEmail": string,
            "creatorFullname": string
        },
        "Name": string,
        "Description": string,
        "Price": Number,
        "Image": string,
        "SalePercentage": number,
        "TechnicalDetails": [
            { "name": string, "value": any }
        ],
        "isActive": Boolean,
        "Stock": Number
    }
}
```