export function Form(){
return(
<section className="leading-[1.6] text-[1rem] p-8 rounded-2xl bg-[#fff] text-black">
  <h1 className="font-bold text-[32px]">Contact Us</h1>
  <form className="grid gap-4 fm:grid-cols-[repeat(2,1fr)]">
    <div className="form-group grid">
      <label htmlFor="fname">First Name</label>
      <input 
        type="text" 
        id="fname" 
        name="first_name"
        className="border border-black rounded-[6px] text-[0.875rem] py-[0.75em] px-[1.5em]  focus-visible:outline-[2px] focus-visible:outline-[#00FF00] "
        required />
    </div>
    <div className="form-group grid">
      <label htmlFor="lname">Last Name</label>
      <input 
        type="text" 
        id="lname" 
        name="last_name"
        className="border border-black rounded-[6px] text-[0.875rem] py-[0.75em] px-[1.5em]  focus-visible:outline-[2px] focus-visible:outline-[#00FF00]"
        required />
    </div>
    <div className="form-group grid col-span-full">
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        className="border border-black rounded-[6px] text-[0.875rem] py-[0.75em] px-[1.5em] focus-visible:outline-[2px] focus-visible:outline-[#00FF00]"
        required />
    </div>
    {/* -----radio buttons ----- */}
    <fieldset className="grid gap-[inherit] grid-cols-[inherit]">
      <legend>Query Type</legend>
      <div className="radio-group relative flex gap-[1ch]  border border-black rounded-[6px] py-[0.75em] px-[1.5em] ">
        <div className="customRadio relative group pl-[35px]  cursor-pointer mb-auto text-[22px] select-none">
          <input 
          type="radio" 
          id="general" 
          name="query"
          value="General Enquiry"
          className="absolute opacity-0 cursor-pointer h-0 w-0"
          required/>
          <span className="checkmark absolute group-hover:bg-[#ccc] top-0 left-0 h-[25px] w-[25px] bg-[#aaa] rounded-[50%]  after:absolute after:hidden after:left-[9px] after:top-[9px] after:w-[9px] after:h-[8px] after:bg-[#fff] after:rounded-[50%] "></span>
        </div>
        <label htmlFor="general" className="after:absolute after:inset-0">General Enquiry</label>
      </div>
      <div className="radio-group relative flex gap-[1ch] fm:items-center border border-black rounded-[6px] py-[0.75em] px-[1.5em] ">
        <div className="customRadio relative group pl-[35px] cursor-pointer mb-auto text-[22px] select-none">
          <input 
          type="radio" 
          id="support" 
          name="query"
          value="Support Request"
          className="absolute opacity-0 cursor-pointer h-0 w-0" 
          required/>
          <span className="checkmark absolute group-hover:bg-[#ccc] top-0 left-0 h-[25px] w-[25px] bg-[#aaa] rounded-[50%] after:absolute after:hidden after:left-[9px] after:top-[9px] after:w-[9px] after:h-[8px] after:bg-[#fff] after:rounded-[50%] "></span>
        </div>
        
        <label htmlFor="support" className="after:absolute after:inset-0">Support</label>
      </div>
    </fieldset>

    
    <div className="form-group grid col-span-full">
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" className="box-content resize-y h-[3lh] rounded-[6px] text-[0.875rem] py-[0.75em] px-[1.5em] border border-black focus-visible:outline-[2px] focus-visible:outline-[#00FF00]"required></textarea>
    </div>

    <div className="form-group flex gap-[1ch] col-span-full">
      <input 
        type="checkbox" 
        name="consent" 
        id="consent" 
        className="rounded-[6px] text-[0.875rem] py-[0.75em]  px-[1.5em] focus-visible:outline-[2px] focus-visible:outline-[#00FF00]" required/>
      <label htmlFor="consent">I consent to being contacted by the team</label>
    </div>
    <button className="bg-[hsl(169,82%,27%)] border-none py-[0.5em] px-[1em] col-span-full rounded-[6px] text-[#fff] hover:bg-[hsl(187,24%,22%)]">Submit</button>
  </form>
</section>)}