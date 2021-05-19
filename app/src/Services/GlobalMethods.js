/**
 * Cart methods.
 */

export const GetCart = () => {
    const cart = localStorage.getItem( 'cart' );

    if( cart == undefined|null ) return [];

    return JSON.parse( cart );
}

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

export const RemoveItemFromCart = ( id ) => {
    
    let cart = GetCart();

    if( cart != false ) {

        cart.splice( cart.findIndex( x => x._id === id ), 1 );

        localStorage.setItem( 'cart', JSON.stringify( cart ) );

        return cart;
    }
    
    return [];
}

// ! May only be used in the cart view.
export const UpdateCart = ( cartObject ) => {
    localStorage.setItem( 'cart', JSON.stringify( cartObject ) );

    return cartObject;
}

/**
 * Cart methods end.
 */