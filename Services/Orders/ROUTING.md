# User routing

## POST service.com/create
### denne funktion kan køres både uden og med jwt header, så vil brugeren bliver oprettet med brugerID eller uden alt efter om jwt bliver sendt med
### Body (Billing kun krævet hvis der ikke er nogen jwt header)
```json
{
    "Order": {
        "Products": [
            { "_id" "id of prod", "Quantity": 1 },
            { "_id" "id of prod", "Quantity": 1 },
            ...
        ],
        "Billing": { // kun krævet hvis ingen jwt er givet
            "Fullname": "Bob Marley",
            "Email": "bob.marley@yahoo.com",
            "Phone": "69696969",
            "Address": "Marleyvej 420, 7100 Vejle"
        }
    }
}
```
### Response
```json
{
    "Message": "fejlbesked eller success",
    "Order": {
        // fulder order objekt sendt tilbage
    }
}
```

## GET service.com/order/:ID
### denne funktion indeholder et url parameter som skal være orderID

### Response
```json
{
    "Message": "fejlbesked eller success",
    "Order": {
        // fulder order objekt sendt tilbage
    }
}
```

## GET service.com/orders
### Denne funktion kræver jwt header

### Response
```json
{
    "Message": "fejlbesked eller success",
    "Orders": [
        // array of order objects
    ]
}
```

# Admin Routing

## GET service.com/admin/all
### henter alle ordre, og kræver jwt

### Response
```json
{
    "Message": "fejlbesked eller success",
    "Orders": [
        // Array med alle ordre objekter
    ]
}
```

## GET service.com/admin/order/:ID 
### Denne route er ikke længere nødvendig men kan benyttes hvis der skulle tilføjes authentication på GET service.com/order/:ID
### Kræver jwt header

### Response
```json
{
    "Message": "fejlbesked eller success",
    "Orders": {
        // fulde ordre objekt
    }
}
```

## GET service.com/admin/statuses
### kræver jwt i header

### Response
```json
{
    "Message": "fejlbesked eller success",
    "Stauses": [
        "Status 1",
        "Status 2",
        ...
    ]
}
```

## POST service.com/admin/updateStatus
### kræver jwt header
```json
{
    "Order": {
        "_id": "Ordre id",
        "Status": "Nye status"
    }
}
```
### Response
```json
{
    "Message": "fejlbesked eller success",
    "Order": {
        // fulder order objekt sendt tilbage
    }
}
```