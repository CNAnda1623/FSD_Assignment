"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
  roleOptions,
  countryOptions,
} from "@/data/contactForm";
import { Container } from "../ui/Container";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      city: "",
      newsletter: false,
    },
  });

  const onSubmit = () => {
    setSubmitted(true);
    reset();
  };

  return (
    <section className="py-20 lg:py-28 bg-[#f5f5f5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Heading */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
              CONTACT US
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-500 font-light leading-relaxed">
              Connect with our clean energy specialists to find customized PV,
              storage, and charging solutions for your projects.
            </p>
          </div>

          {/* Right: Accessible Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-neutral-100">
            {submitted && (
              <div
                role="alert"
                className="mb-8 p-4 rounded-xl bg-orange-50 border border-[#fe7900]/30 text-neutral-800 text-sm"
              >
                <p className="font-semibold text-[#fe7900]">
                  Thank you for your interest!
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  This is a demo submission. No network request was made and no
                  data was stored.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Role Select */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Which best describes you? *
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="w-full h-12 px-4 rounded-xl bg-neutral-100 text-neutral-800 text-sm border-0 focus:ring-2 focus:ring-[#fe7900] outline-none"
                  aria-invalid={Boolean(errors.role)}
                >
                  <option value="">Select your Role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* First Name & Last Name (2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    placeholder="First Name"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-100 text-neutral-800 text-sm border-0 focus:ring-2 focus:ring-[#fe7900] outline-none placeholder:text-neutral-400"
                    aria-invalid={Boolean(errors.firstName)}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-100 text-neutral-800 text-sm border-0 focus:ring-2 focus:ring-[#fe7900] outline-none placeholder:text-neutral-400"
                    aria-invalid={Boolean(errors.lastName)}
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="sungrow@email.com"
                  className="w-full h-12 px-4 rounded-xl bg-neutral-100 text-neutral-800 text-sm border-0 focus:ring-2 focus:ring-[#fe7900] outline-none placeholder:text-neutral-400"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Country & City (2 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                  >
                    Country / Region *
                  </label>
                  <select
                    id="country"
                    {...register("country")}
                    className="w-full h-12 px-4 rounded-xl bg-neutral-100 text-neutral-800 text-sm border-0 focus:ring-2 focus:ring-[#fe7900] outline-none"
                    aria-invalid={Boolean(errors.country)}
                  >
                    <option value="">Select Country / Region</option>
                    {countryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                  >
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city")}
                    placeholder="City"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-100 text-neutral-800 text-sm border-0 focus:ring-2 focus:ring-[#fe7900] outline-none placeholder:text-neutral-400"
                    aria-invalid={Boolean(errors.city)}
                  />
                  {errors.city && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Privacy Terms & Checkboxes */}
              <div className="space-y-3 pt-2 text-xs text-neutral-500">
                <p className="leading-relaxed">
                  By submitting this form, you acknowledge that your information
                  will be processed in accordance with Sungrow&apos;s{" "}
                  <a
                    href="https://www.sungrowpower.com/in/en/privacy-policy-terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fe7900] underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("termsAccepted")}
                    className="mt-0.5 rounded text-[#fe7900] focus:ring-[#fe7900]"
                  />
                  <span>
                    I have read and agree to the Sungrow Terms of Use *
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className="text-xs text-red-600">
                    {errors.termsAccepted.message}
                  </p>
                )}

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("newsletter")}
                    className="mt-0.5 rounded text-[#fe7900] focus:ring-[#fe7900]"
                  />
                  <span>
                    I would like to receive product updates, news and
                    promotions from Sungrow.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#606060] hover:bg-[#4d4d4d] text-white text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
