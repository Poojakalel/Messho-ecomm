import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { calculateOrderCost } from '../../helpers/helpers'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../redux/api/orderApi'

const PaymentMethod = () => {

    const [method,setMethod]=useState("")
    const navigate=useNavigate()

    const {shippingInfo,cartItems}=useSelector((state)=>state.cart)



    const[createNewOrder,{isLoading,error,isSuccess}]=
    useCreateNewOrderMutation()

    const [stripeCheckoutSession,{data:checkoutData, error:checkoutError}]=
    useStripeCheckoutSessionMutation()

    useEffect(()=>{
        if(checkoutData){

            navigate(checkoutData?.url);
        }
        if(checkoutError){
            toast.error(checkoutError?.data?.message);
        }
    },[checkoutData,checkoutError])

    useEffect(()=>{
        if(error){
            toast.error(error?.data?.message)
        }

        if(isSuccess){
            navigate("/")
        }
    }, [error,isSuccess] )

    const submitHandler=(e)=>{
        e.preventDefault()

        const {itemsPrice,shippingPrice,taxPrice,totalPrice}=calculateOrderCost(cartItems)

        if(method==="COD"){
            // create COD order

            const orderData={

                shippingInfo,
                orderItems:cartItems,
                itemsPrice,
                shippingAmount:shippingPrice,
                taxAmount:taxPrice,
                totalAmount:totalPrice,
                paymentInfo:{
                    status:"Not Paid",
                },
                paymentMethod:"COD",


            }

            console.log(shippingInfo)

            createNewOrder(orderData)

        }

        if(method==="Card"){
            // stripe checkout

            const orderData={

                shippingInfo,
                orderItems:cartItems,
                itemsPrice,
                shippingAmount:shippingPrice,
                taxAmount:taxPrice,
                totalAmount:totalPrice,
                

            };

            stripeCheckoutSession(orderData)



        }
    }

    
  return (
    <>
    <MetaData title={"Payment Method"}/>
    <CheckoutSteps shipping confirmOrder payment/>
        <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Select Payment Method</h2>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="codradio"
              value="COD"
              onChange={(e)=>setMethod("COD")}
            />
            <label className="form-check-label" for="codradio">
              Cash on Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="cardradio"
              value="Card"
              onChange={(e)=>setMethod("Card")}
            />
            <label className="form-check-label" htmlFor="cardradio">
              Card - VISA, MasterCard
            </label>
          </div>

          <button id="shipping_btn" type="submit" className="btn py-2 w-100">
            CONTINUE
          </button>
        </form>
      </div>
    </div>

    </>
  )
}

export default PaymentMethod