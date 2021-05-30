/**
 * Cart methods.
 */

import { Cart } from './GlobalVariables';

//-----------------Gets items put in cart from localstorage, if its not found it puts a empty array in--------------------
export const GetCart = () => {
    const cart = localStorage.getItem( 'cart' );

    if( cart == undefined|null ) return [];

    return JSON.parse( cart );
}

export const GetCartCount = () => {

    const cart = GetCart();
    let count = 0;

    cart.forEach( item => {
        count += item.Quantity;
    });

    return count;
}

export const GetCartTotal = () => {

    const cart = GetCart();
    let total = 0;

    cart.forEach( item => {
        total += ( item.Price * item.Quantity )
    });

    return total;

}

export const UpdateCartCount = () => {
    GetCartCount();
}

//-----------------Puts the item in cart by ID, if the ID is the same it adds Quantity, it puts in them item and quantity in localstorage--------------------
export const AddToCart = ( item = {} ) => {
    // Item object = { _id: 'id', Quantity: 1 }
    
    let cart = GetCart();

    if( cart != false ) {
        const findItem = cart.find( x => x._id === item._id );
    
        if( findItem != undefined ) {

            cart.find( x => x._id === item._id ).Quantity += item.Quantity;

        } else {
            
            cart.push( item );

        }
        
        localStorage.setItem( 'cart', JSON.stringify( cart ) );

        return cart;
    } else {
        cart.push( item );

        localStorage.setItem( 'cart', JSON.stringify( cart ) );

        return cart;
    }
}
//-----------------Removes the item from cart by ID and returns index and deletes it from localstorage and the new cart --------------------
export const RemoveItemFromCart = ( id ) => {
    
    let cart = GetCart();

    if( cart != false ) {

        cart.splice( cart.findIndex( x => x._id === id ), 1 );

        localStorage.setItem( 'cart', JSON.stringify( cart ) );

        return cart;
    }
    
    return [];
}

//-----------------Updates Cart everytime a textfield is changed, localstorage is updated.--------------------
// ! May only be used in the cart view.
export const UpdateCart = ( cartObject ) => {
    localStorage.setItem( 'cart', JSON.stringify( cartObject ) );

    UpdateCartCount();

    return cartObject;
}

/**
 * Cart methods end.
 */