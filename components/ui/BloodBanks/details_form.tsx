"use client";
import React, { useEffect, useRef, useState } from "react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import bloodDetailsImg from "@/public/BloodDonation.png";
import Image from "next/image";
import action, { sessionAction } from "@/app/actions";
import { toast } from "../use-toast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Edit, EyeIcon, HomeIcon } from "lucide-react";

function BankDetails() {
  const [libraries] = useState<Libraries>(["places"]);

  const mapsKey = String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    bloodUnit: z.object({
      apUnit: z.string().min(1, "cannot be empty"),
      anUnit: z.string().min(1, "cannot be empty"),
      bpUnit: z.string().min(1, "cannot be empty"),
      bnUnit: z.string().min(1, "cannot be empty"),
      abpUnit: z.string().min(1, "cannot be empty"),
      abnUnit: z.string().min(1, "cannot be empty"),
      opUnit: z.string().min(1, "cannot be empty"),
      onUnit: z.string().min(1, "cannot be empty"),
    }),
    phoneNumber: z.string().regex(phoneRegex, "Invalid Phone Number"),
    address: z.object({
      street: z.string(),
      city: z.string().min(1, "City cannot be empty"),
      state: z.string().min(1, "State cannot be empty"),
      zip: z.string().regex(/^\d{6}$/),
    }),
    sectors: z.string().min(1, "Please select sector"),
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
      sectors: "",
    },
  });

  const { register } = form;

  const isSubmitting = useRef(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
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
        sectors,
      } = values;

      geocodeByAddress(String(street))
        .then((results) => {
          getLatLng(results[0]).then(({ lat, lng }) => {
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
              sectors,
            };

            fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bloodBank`, {
              method: "POST",
              body: JSON.stringify(obj),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                // console.log(data);
                toast({
                  title: "Submit Successful",
                  description: data?.message,
                  variant: "default",
                  className: "bg-green-600 text-green-50",
                });

                action();

                return data;
              })
              .catch((err) => {
                toast({
                  title: "Something went wrong",
                  description: "Please try again",
                  variant: "destructive",
                });
              });
            return obj;
          });
        })
        .catch((error) => {
          toast({
            title: "Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
          console.error(error);
        });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        variant: "destructive",
      });
      console.error(err);
    } finally {
    }
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
          "flex-1 shadow-xl flex flex-col justify-center items-center h-full"
        )}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <main className="flex laptop:flex-row flex-col justify-center items-center h-fit w-[100vw] bg-red-100">
              <section className="laptop:w-[50%] phone:w-[70%]">
                <CardHeader className="flex justify-center items-center p-10">
                  <CardTitle className="font-mono tracking-wide font-light text-slate-800">
                    Blood Bank Details Form
                  </CardTitle>
                </CardHeader>
                <Image src={bloodDetailsImg} alt={"bloodDetailsImg"} />
              </section>
              <section className="laptop:w-[60%] tablet:w-[90%] phone:w-full h-[100vh] laptop:p-[5rem] phone:p-5 gap-5 flex-col shadow-2xl bg-white rounded-tl-[2rem] rounded-tr-[2rem] flex justify-center items-center">
                <div className="flex gap-5 w-full">
                  <div className="flex-1">
                    <FormField
                      disabled={isSubmitting.current}
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
                  </div>
                  <div className="flex-1">
                    <FormField
                      disabled={isSubmitting.current}
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Phone Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-4 gap-3">
                  <FormField
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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

                <div className="grid mt-2 grid-cols-2 grid-rows-auto w-full gap-5">
                  <Autocomplete>
                    <div className="flex flex-col justify-center gap-3">
                      <label className="text-[14px] font-semibold">
                        Street
                      </label>
                      <Input
                        type="text"
                        {...register("address.street")}
                        disabled={isSubmitting.current}
                      />
                    </div>
                  </Autocomplete>
                  <FormField
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                    disabled={isSubmitting.current}
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
                  <FormField
                    disabled={isSubmitting.current}
                    control={form.control}
                    name="sectors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sector</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Sector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Private", "Govt."].map((item, index) => (
                              <SelectItem
                                key={String(item + index)}
                                value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full p-3 rounded-xl mt-8"
                    disabled={isSubmitting.current}>
                    Submit
                  </Button>
                </div>
                <div className="flex w-full">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}`}
                    className="w-full">
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="w-full p-3 rounded-xl mt-5"
                      disabled={isSubmitting.current}>
                      <HomeIcon className="w-10 mr-1" />
                      Go Home
                    </Button>
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/bloodBanks/detailsTable`}
                    className="w-full">
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="w-full p-3 rounded-xl mt-5">
                      <EyeIcon className="w-10 mr-1" />
                      Show Details
                    </Button>
                  </Link>
                </div>
              </section>
            </main>
          </form>
        </Form>
      </div>
    </>
  );
}

export default BankDetails;
