
// import React, { useState, useRef, useEffect } from 'react';
// import { useCart, useDispatchCart } from './ContextReducer';

// export default function Card(props) {
//   const priceRef = useRef();
//   const cartState = useCart();
//   const dispatch = useDispatchCart();
//   const options = props.options || {};
//   const priceOptions = Object.keys(options);
//   const foodItem = props.foodItem;

//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState(priceOptions[0]);
//   const [finalPrice, setFinalPrice] = useState(0);

//   const handleAddToCart = () => {
//     const calculatedPrice = calculateFinalPrice();
//     dispatch({
//       type: "ADD",
//       id: props.foodItem._id,
//       name: props.foodItem.name,
//       price: calculatedPrice,
//       qty: qty,
//       size: size,
//     });
//     console.log(cartState);
//   };
 

//   useEffect(() => {
//     setSize(priceRef.current.value);
//   }, []);

//   useEffect(() => {
//     const calculatedPrice = calculateFinalPrice();
//     setFinalPrice(calculatedPrice);
//   }, [qty, size]);


//   const calculateFinalPrice = () => {
//     const selectedSizePrice = options[size] || 0;
//     return qty * parseInt(selectedSizePrice);
//   };

//   return (
//     <div>
//       <div>
//         <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
//           {foodItem && foodItem.img && (
//             <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//           )}
//           <div className="card-body">
//             {foodItem && (
//               <>
//                 <h5 className="card-title">{foodItem.name}</h5>
//                 <div className="container w-100"></div>
//               </>
//             )}
//             <select className="m-2 h-100 bg-light rounded" onChange={(e) => setQty(parseInt(e.target.value))}>
//               {Array.from(Array(6), (_, i) => (
//                 <option key={i + 1} value={i + 1}>{i + 1}</option>
//               ))}
//             </select>
//             <select className="m-2 h-100 bg-light rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
//               {priceOptions.map((data) => (
//                 <option key={data} value={data}>{data}</option>
//               ))}
//             </select>
//             <div className="d-inline-block h-100">
//               rs{finalPrice}/-
//             </div>
//           </div>
//           <hr></hr>
//           <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// }














import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  console.log(props.foodItem);
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//