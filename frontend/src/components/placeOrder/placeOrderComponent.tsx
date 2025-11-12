import {  type FC,useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import  useCartData from "../cart/CartComponent.hooks"
import CartTotal from "../cart/cartTotal/CartTotal"
import { ImageWithSkeleton } from "../ui/ImageWithSkeleton";
import Title from "../ui/Title"
import { ROUTES } from "../../constants/routes";
type paymentMethod = "stripe" | "razorpay" | "cod"
export const PlaceOrderComponent:FC=()=>{
  const{cartitemsSubtotal} = useCartData();
  const [method,setMethod] = useState<paymentMethod>('cod')
  const navigate = useNavigate()
return (
  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t border-[var(--border)]">
     {/*---------------Left Side ------------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"/>
          <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="last name"/>
        </div>
        <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"/>
        <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="text "
            placeholder="Street"/>
        <div className="flex gap-3">
          <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="text "
            placeholder="City"/>
          <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="text "
            placeholder="state"/> 
        </div>
        <div className="flex gap-3">
          <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"/>
          <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="text "
            placeholder="State"/> 
        </div>
        <input 
            className="border border-[var(--border)] rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"/> 
      </div>
      {/* ---------------Right Side ---------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal subtotal={cartitemsSubtotal}/>
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD"/>
          <div className="flex gap-3 flex-col lg:flex row">
            <div onClick={()=>setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe"?"bg-green-400":''}`}></p>
              <ImageWithSkeleton className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay"?"bg-green-400":''}`}></p>
              <ImageWithSkeleton className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod"?"bg-green-400":''}`}></p>
              <p className="">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button 
              className="bg-black text-white px-16 py-3 text-sm"
              onClick={()=>{navigate(ROUTES.ORDERS)}}>PLACE ORDER</button></div>
        </div>
      </div>

  </div>
)
};