import React, {useState, useContext} from 'react';
import {BottomNavigation as PBottomNavigation} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHamburger, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import ProductsView from '../ProductsView/ProductsView';
import CartView from '../CartView/CartView';
import { CartContext } from '../../providers/CartProvider';

const routes = [
    {
        key: 'products',
        title: 'Produtos',
        component: ProductsView,
        icon: ({size, color}) => (<FontAwesomeIcon icon={faHamburger} size={size} color={color} />)
    },
    {
        key: 'cart',
        title: 'Carrinho',
        component: CartView,
        icon: ({size, color}) => (<FontAwesomeIcon icon={faShoppingCart} size={size} color={color} />)
    }
]

/*const renderScene = PBottomNavigation.SceneMap({
    products: ProductsView,
    cart: CartView
})*/

export default function BottomNavigation(props){
    const [index, setIndex] = useState(0);
    const [{products}, cartDispatch] = useContext(CartContext);

    function renderScene({route, jumpTo}){
        /*switch(route.key){
            case 'products': return <ProductsView jumpTo={jumpTo} />;
            case 'cart': return <CartView jumpTo={jumpTo} />
        }*/
        if(route.key !== routes[index].key){
            return null;
        }
        const Component = route.component;
        return <Component jumpTo={jumpTo} />;
    }

    return(
        <PBottomNavigation 
            navigationState={{
                routes,
                index
            }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            getBadge={({route})=> {
                if(route.key === 'cart' && products.length){
                    return products.length;
                }
                return false;
            }}
        />
    )
}