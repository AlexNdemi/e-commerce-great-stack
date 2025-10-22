import { useForm, useFieldArray, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/Checkbox";
import { RadioButton } from "../ui/RadioButton";

const contactSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email("Please enter a valid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
  phoneNumbers: z.array(
    z.object({
      number: z
        .string()
        .regex(/^\d{2,10}$/, "Please enter a valid phone number")
        .nonempty("Phone number is required"),
    })
  ),
  query: z.string().nonempty("Please select a query type"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .nonempty("Message is required"),
  consent: z.boolean().refine(val => val === true, "You must consent to be contacted"),
});

type FormValues = z.infer<typeof contactSchema>;

const ContactForm2 = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phoneNumbers: [{ number: "" }],
      query: "",
      message: "",
      consent: false,
    },
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isValid, isSubmitting } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-[hsl(148,38%,91%)] py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(187,24%,22%)] mb-6">
          Contact Us
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="first_name" className="font-medium text-[hsl(187,24%,22%)]">
              First Name <span className="text-red-800">*</span>
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              className={`border rounded-lg px-6 py-3 ${
                errors.first_name ? "border-red-500" : "border-[hsl(186,15%,59%)]"
              }`}
            />
            {errors.first_name && (
              <span className="text-red-500 text-sm">{errors.first_name.message}</span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="last_name" className="font-medium text-[hsl(187,24%,22%)]">
              Last Name <span className="text-red-800">*</span>
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className={`border rounded-lg px-6 py-3 ${
                errors.last_name ? "border-red-500" : "border-[hsl(186,15%,59%)]"
              }`}
            />
            {errors.last_name && (
              <span className="text-red-500 text-sm">{errors.last_name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="email" className="font-medium text-[hsl(187,24%,22%)]">
              Email <span className="text-red-800">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`border rounded-lg px-6 py-3 ${
                errors.email ? "border-red-500" : "border-[hsl(186,15%,59%)]"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="password" className="font-medium text-[hsl(187,24%,22%)]">
              Password <span className="text-red-800">*</span>
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`border rounded-lg px-6 py-3 ${
                errors.password ? "border-red-500" : "border-[hsl(186,15%,59%)]"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Phone Numbers */}
          <div className="grid gap-4 md:col-span-2">
            <label className="font-medium text-[hsl(187,24%,22%)]">
              Phone Numbers
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-1">
                <input
                  {...register(`phoneNumbers.${index}.number`)}
                  placeholder="Enter phone number"
                  className={`border rounded-lg px-6 py-3 ${
                    errors.phoneNumbers?.[index]?.number
                      ? "border-red-500"
                      : "border-[hsl(186,15%,59%)]"
                  }`}
                />
                {errors.phoneNumbers?.[index]?.number && (
                  <span className="text-red-500 text-sm">
                    {errors.phoneNumbers[index]?.number?.message}
                  </span>
                )}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-fit text-sm text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ number: "" })}
              className="bg-[hsl(169,82%,27%)] text-white rounded-md px-4 py-2"
            >
              Add phone number
            </button>
          </div>

          {/* Query Type */}
          <fieldset className="md:col-span-2">
            <legend className="font-medium text-[hsl(187,24%,22%)] mb-2">
              Query Type <span className="text-red-800">*</span>
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="query"
                control={control}
                render={({ field }) => (
                  <>
                    <RadioButton
                      id="general"
                      name={field.name}
                      value="general_enquiry"
                      label="General Enquiry"
                      checked={field.value === "general_enquiry"}
                      onChange={field.onChange}
                    />
                    <RadioButton
                      id="support"
                      name={field.name}
                      value="support"
                      label="Support Request"
                      checked={field.value === "support"}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
            </div>
            {errors.query && (
              <span className="text-red-500 text-sm">{errors.query.message}</span>
            )}
          </fieldset>

          {/* Message */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label htmlFor="message" className="font-medium text-[hsl(187,24%,22%)]">
              Message <span className="text-red-800">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message")}
              placeholder="Enter your message here..."
              className={`border rounded-lg px-6 py-3 ${
                errors.message ? "border-red-500" : "border-[hsl(186,15%,59%)]"
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message.message}</span>
            )}
          </div>

          {/* Consent */}
          <div className="md:col-span-2">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="consent"
                  name={field.name}
                  label="I consent to being contacted by the team"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            {errors.consent && (
              <span className="text-red-500 text-sm">{errors.consent.message}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="md:col-span-2 bg-[hsl(169,82%,27%)] text-white rounded-lg px-6 py-3 font-medium hover:bg-[hsl(187,24%,22%)] focus:outline-none disabled:opacity-50"
          >
            Submit
          </button>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
};

export default ContactForm2;
