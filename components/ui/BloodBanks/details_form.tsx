"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import bloodDetailsImg from "@/public/BloodDonation.png";
import Image from "next/image";
import action from "@/app/actions";

function BankDetails() {
  const [libraries] = useState<Libraries>(["places"]);

  const mapsKey = String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    bloodUnit: z.object({
      apUnit: z.string(),
      anUnit: z.string(),
      bpUnit: z.string(),
      bnUnit: z.string(),
      abpUnit: z.string(),
      abnUnit: z.string(),
      opUnit: z.string(),
      onUnit: z.string(),
    }),
    phoneNumber: z.string().regex(phoneRegex, "Invalid Phone Number"),
    address: z.object({
      street: z.string().min(0).max(100),
      city: z.string().min(0, "City cannot be empty"),
      state: z.string().min(0, "State cannot be empty"),
      zip: z.string().regex(/^\d{6}$/),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bloodUnit: {
        apUnit: "",
        anUnit: "",
        bpUnit: "",
        bnUnit: "",
        abpUnit: "",
        abnUnit: "",
        opUnit: "",
        onUnit: "",
      },
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
  });

  const { register } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      name,
      bloodUnit: {
        apUnit,
        anUnit,
        bpUnit,
        bnUnit,
        abpUnit,
        abnUnit,
        opUnit,
        onUnit,
      },
      phoneNumber,
      address: { street, city, state, zip },
    } = values;

    geocodeByAddress(String(street))
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          //   setCoords({ lat, lng });
          const obj = {
            name,
            bloodTypes: {
              Ap: Number(apUnit),
              An: Number(anUnit),
              Bp: Number(bpUnit),
              Bn: Number(bnUnit),
              ABp: Number(abpUnit),
              ABn: Number(abnUnit),
              Op: Number(opUnit),
              On: Number(onUnit),
            },
            phone: Number(phoneNumber),

            address: {
              city,
              state,
              street,
              zip: Number(zip),
            },
            coords: {
              lat,
              lng,
            },
          };
          //   console.log(obj);
          fetch("http://localhost:3000/api/bloodBank", {
            method: "POST",
            body: JSON.stringify(obj),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              action();
              return data;
            });
          return obj;
        });
      })
      .catch((error) => console.error(error));
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapsKey,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (loadError) {
    return <div>Error Loading</div>;
  }

  return (
    <>
      <div
        className={cn(
          "flex-1 shadow-xl flex flex-col justify-center items-cente h-full"
        )}>
        {/* <CardHeader>
            <CardTitle className="">Blood Bank Details Form</CardTitle>
          </CardHeader> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <main className="flex laptop:flex-row flex-col justify-center items-center h-fit w-[100vw] bg-red-100">
              <section className="laptop:w-[50%] phone:w-[70%]">
                <Image src={bloodDetailsImg} alt={"bloodDetailsImg"} />
              </section>
              <section className="laptop:w-[60%] tablet:w-[90%] phone:w-full h-[100vh] laptop:p-[5rem] phone:p-5 gap-5 flex-col shadow-2xl bg-white rounded-tl-[2rem] rounded-bl-[2rem] flex justify-center items-center">
                <div className="flex flex-col gap-5 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Name Here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="w-full grid grid-cols-4 gap-3">
                    <FormField
                      control={form.control}
                      name="bloodUnit.apUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>A+</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodUnit.anUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>A-</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodUnit.bpUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>B+</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodUnit.bnUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>B-</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bloodUnit.abpUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>AB+</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodUnit.abnUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>AB-</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodUnit.opUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>O+</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodUnit.onUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>O-</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Unit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid mt-2 grid-cols-2 grid-rows-auto w-full gap-5">
                  <Autocomplete>
                    <div className="flex flex-col justify-center gap-3">
                      <label className="text-[14px] font-semibold">
                        Street
                      </label>
                      <Input type="text" {...register("address.street")} />
                    </div>
                  </Autocomplete>
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full p-3 rounded-xl mt-5">
                  Submit
                </Button>
              </section>
            </main>
          </form>
        </Form>
      </div>
    </>
  );
}

export default BankDetails;
