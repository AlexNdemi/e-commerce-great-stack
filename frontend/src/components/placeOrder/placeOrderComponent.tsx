import  useCartData from "../cart/CartComponent.hooks"
import CartTotal from "../cart/cartTotal/CartTotal"
import Title from "../ui/Title"
export function PlaceOrderComponent(){
  const{cartitemsSubtotal} = useCartData();
return (
  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t border-[var(--border)]">
     {/*---------------Left Side ------------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className="flex gap-3">
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
      </div>

  </div>
)
};