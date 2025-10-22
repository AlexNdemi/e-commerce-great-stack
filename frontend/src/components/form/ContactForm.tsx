import React from "react";

export default function ContactForm() {
  return (
    <section className="p-8 bg-white text-[hsl(187,24%,22%)] rounded-2xl max-w-[700px] mx-auto font-[Karla]">
      <form className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="fname" className="flex gap-1 after:content-['*'] after:text-[hsl(169,82%,27%)]">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            name="first_name"
            required
            className="border border-[hsl(187,24%,22%)] rounded-lg py-3 px-6 outline-green-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lname" className="flex gap-1 after:content-['*'] after:text-[hsl(169,82%,27%)]">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name="last_name"
            required
            className="border border-[hsl(187,24%,22%)] rounded-lg py-3 px-6 outline-green-600"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="email" className="flex gap-1 after:content-['*'] after:text-[hsl(169,82%,27%)]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border border-[hsl(187,24%,22%)] rounded-lg py-3 px-6 outline-green-600"
          />
        </div>

        <fieldset className="sm:col-span-2 grid gap-3 border-0 p-0">
          <legend className="flex gap-1 mb-2 after:content-['*'] after:text-[hsl(169,82%,27%)]">
            Query Type
          </legend>

          <label
            htmlFor="general"
            className="flex items-center gap-3 border border-[hsl(187,24%,22%)] rounded-lg py-3 px-6 cursor-pointer transition-colors has-[:checked]:bg-[hsl(148,38%,91%)] has-[:checked]:border-[hsl(169,82%,27%)]"
          >
            <input
              type="radio"
              id="general"
              name="query"
              value="general_enquiry"
              required
              className="size-5 accent-[hsl(169,82%,27%)]"
            />
            <span>General Enquiry</span>
          </label>

          <label
            htmlFor="support"
            className="flex items-center gap-3 border border-[hsl(187,24%,22%)] rounded-lg py-3 px-6 cursor-pointer transition-colors has-[:checked]:bg-[hsl(148,38%,91%)] has-[:checked]:border-[hsl(169,82%,27%)]"
          >
            <input
              type="radio"
              id="support"
              name="query"
              value="support"
              required
              className="size-5 accent-[hsl(169,82%,27%)]"
            />
            <span>Support Request</span>
          </label>
        </fieldset>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="message" className="flex gap-1 after:content-['*'] after:text-[hsl(169,82%,27%)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="border border-[hsl(187,24%,22%)] rounded-lg py-3 px-6 min-h-[6lh] resize-y outline-green-600"
          ></textarea>
        </div>

        <label
          htmlFor="consent"
          className="flex items-center gap-3 sm:col-span-2 cursor-pointer"
        >
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            className="size-5 accent-[hsl(169,82%,27%)]"
          />
          <span>I consent to being contacted by the team</span>
        </label>

        <button
          type="submit"
          className="sm:col-span-2 bg-[hsl(169,82%,27%)] text-white rounded-lg py-3 px-6 hover:bg-[hsl(187,24%,22%)] focus-visible:bg-[hsl(187,24%,22%)] transition-colors"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
