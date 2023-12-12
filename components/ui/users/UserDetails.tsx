"use client";
import React, { use } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserDetailImg from "@/public/UserDetailsForm.jpeg";
import { Input } from "../input";
import { cn } from "@/lib/utils";
import { Button } from "../button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../form";
import axios from "axios";
import { toast } from "../use-toast";
import Link from "next/link";
import { HomeIcon, LayoutDashboard } from "lucide-react";

function UserDetailsForm() {
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  const schema = z.object({
    name: z.string().trim().min(2).max(255),
    email: z.string().trim().email(),
    phoneNumber: z.string().regex(phoneRegex).min(10).max(10),
    street: z.string().trim().min(2),
    city: z.string().trim().min(2),
    state: z.string().trim().min(2),
    zip: z.string().min(6).max(6),
    gender: z.string(),
    date: z.string().max(2).min(1),
    month: z.string().max(2).min(1),
    year: z.string().max(4).min(4),
    age: z.string().max(2).min(1),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit } = form;

  const { errors } = form.formState;

  const submitData = (data: z.infer<typeof schema>) => {
    const {
      name,
      email,
      phoneNumber,
      street,
      city,
      state,
      zip,
      gender,
      date,
      month,
      year,
      age,
    } = data;
    const obj = {
      name,
      email,
      phone: Number(phoneNumber),
      address: {
        street,
        city,
        state,
        zip: Number(zip),
      },
      gender,
      dob: {
        date: Number(date),
        month: Number(month),
        year: Number(year),
      },
      age: Number(age),
    };

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        toast({
          title: "Submit Successful",
          description: data?.message || "",
          variant: "default",
          className: "bg-green-600 text-green-50",
        });
        return data;
      })
      .catch((err) => {
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        });
        console.error(err);
      });

    return obj;
  };

  return (
    <main className="flex justify-center items-center phone:flex-col laptop:flex-row laptop:h-[100vh] phone:h-screen bg-[#ffdde3]">
      <section className="laptop:w-[40%] phone:w-[60%] ">
        <Image src={UserDetailImg} alt="dp" />
      </section>

      <section className="laptop:w-[60%] phone:w-full tablet:px-[5rem] laptop:px-0 bg-white/80 h-full rounded-tl-[2rem] phone:rounded-tr-[2rem] laptop:rounded-bl-[2rem] flex justify-center items-center phone:py-7 laptop:py-0">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(submitData)}
            className="laptop:w-[60%] phone:w-[80%] flex flex-col justify-center items-center gap-5">
            <p className="laptop:text-4xl phone:text-2xl font-bold py-2 ">
              Enter Your Details
            </p>
            <div className="flex flex-col gap-1 w-full">
              <Input
                type="text"
                {...register("name")}
                name="name"
                placeholder="Full Name"
                className={cn(
                  "py-6 px-4 rounded-xl",
                  errors.name &&
                    "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                )}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Input
                type="email"
                {...register("email")}
                name="email"
                placeholder="E-Mail"
                className={cn(
                  "py-6 px-4 rounded-xl",
                  errors.name &&
                    "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Input
                type="text"
                {...register("phoneNumber")}
                name="phoneNumber"
                placeholder="Contact Number"
                className={cn(
                  "py-6 px-4 rounded-xl",
                  errors.name &&
                    "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                )}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 grid-rows-auto w-full gap-5">
              <div>
                <Input
                  type="text"
                  {...register("street")}
                  name="street"
                  placeholder="Street"
                  className={cn(
                    "py-6 px-4 rounded-xl",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.street && (
                  <span className="text-red-500 text-xs">
                    {errors.street.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  {...register("city")}
                  name="city"
                  placeholder="City"
                  className={cn(
                    "py-6 px-4 rounded-xl",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.city && (
                  <span className="text-red-500 text-xs">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  {...register("state")}
                  name="state"
                  placeholder="State"
                  className={cn(
                    "py-6 px-4 rounded-xl",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.state && (
                  <span className="text-red-500 text-xs">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  {...register("zip")}
                  name="zip"
                  placeholder="Zip"
                  className={cn(
                    "py-6 px-4 rounded-xl",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.zip && (
                  <span className="text-red-500 text-xs">
                    {errors.zip.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-[100%] grid grid-cols-3 gap-5">
              <Input
                type="number"
                placeholder="DD"
                className="w-full rounded-xl "
                {...register("date")}
                name="date"
              />
              {errors.date && (
                <span className="text-red-500 text-xs">
                  {errors.date.message}
                </span>
              )}
              <Input
                type="number"
                placeholder="MM"
                className="w-full rounded-xl "
                {...register("month")}
                name="month"
              />
              {errors.month && (
                <span className="text-red-500 text-xs">
                  {errors.month.message}
                </span>
              )}
              <Input
                type="number"
                placeholder="YYYY"
                className="w-full rounded-xl "
                {...register("year")}
                name="year"
              />
              {errors.year && (
                <span className="text-red-500 text-xs">
                  {errors.year.message}
                </span>
              )}
            </div>
            <div className="flex w-full gap-5">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-[80%]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="font-light text-gray-500 shadow-md rounded-xl">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="absolute z-[150]">
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Input
                type="number"
                placeholder="Age"
                className="w-full rounded-xl "
                {...register("age")}
                name="age"
              />
            </div>

            <div className="w-full flex justify-center items-center gap-5">
              <Button type="submit" className="w-full py-[1.25rem] rounded-xl">
                Submit
              </Button>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/map`}
                className="w-full">
                <Button
                  type="button"
                  variant={"outline"}
                  className="w-full p-3 rounded-xl">
                  <LayoutDashboard className="w-10 mr-1" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}

export default UserDetailsForm;
