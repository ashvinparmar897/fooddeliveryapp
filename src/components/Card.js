import React, { useEffect, useRef } from 'react'
import { useDispatchCart, useCart, } from "../components/ContextReducer";
import { useState } from 'react';


const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState('')

    const handleAddCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }

        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty })
                return
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        // console.log(data)

    }
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    let finalPrice = qty * parseInt(options[size])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxWidth": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">Some quick example text to build </p>
                        <div className='container w-100'>
                            <select className=' h-100 m-2 bg-success' onChange={(e) => { setQty(e.target.value) }}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className=' h-100 m-2 bg-success' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                                {
                                    priceOptions.map((data) => {
                                        return (
                                            <option key={data} value={data}>{data}</option>
                                        )
                                    })

                                }
                            </select>

                            <div className=' d-inline fs-5 h-100'>₹{finalPrice}/-</div>
                        </div>
                        <hr />
                        <div className="btn bg-success text-white ms-2" to="/" onClick={handleAddCart}>Add to Cart</div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card
