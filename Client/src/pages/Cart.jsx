import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CartCard } from '../components/CourseCard';

const Cart = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    return (
        <div className="h-screen md:h-full dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] bg-blend-multiply text-gray-800 dark:text-gray-50">
            {cartItems.map((item) =>
                <div key={item?._id} className="mx-4 md:mx-10">
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