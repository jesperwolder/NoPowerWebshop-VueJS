//------------------2 first checks authorisation and authentication, the last 3 checks if the permission is true-------------------
export const CurrentSession = {
    isLoggedIn: false,
    isAdmin: false,
    Fullname: null,
    PageFound: true,
    PermissionDenied: false,
    RequireAdmin: false,
}
//------------------Puts a array of items in cart-------------------
export const Cart = {
    Items: [],
    Count: 0
}
//-----------------splitter products up in different categories--------------------
export const GlobalProducts = {
    Categories: []
}