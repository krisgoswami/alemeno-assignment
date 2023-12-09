import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CartCard } from '../components/CourseCard';

const Cart = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    return (
        <div>
            {cartItems.map((item) =>
                <div key={item?._id} className="mx-4 md:mx-10 mt-4">
                    <CartCard
                        id={item.id}
                        title={item?.title}
                        instructor={item?.instructor}
                        price={item?.price}
                        thumbnail={item?.thumbnail}
                    />
                </div>
            )}
        </div>
    )
}

export default Cart;