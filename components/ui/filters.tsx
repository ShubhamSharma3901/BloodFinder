import React, { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useOrigin } from "@/lib/contexts";
import { DropletIcon, DropletsIcon } from "lucide-react";

const FormSchema = z.object({
  bloodGroup: z.string(),
});

function Filters() {
  const { setBloodType } = useOrigin();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = data;
    setBloodType(formData.bloodGroup);
  }

  return (
    <div className="w-full border rounded-2xl p-2 bg-neutral-50/90 border-transparent shadow-inner">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex justify-start items-center gap-2">
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem className="w-[80%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="font-light text-gray-500 shadow-md rounded-xl">
                      <SelectValue placeholder="Required Blood Group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="absolute z-[150]">
                    <SelectItem value="Ap">A+</SelectItem>
                    <SelectItem value="An">A-</SelectItem>
                    <SelectItem value="Bp">B+</SelectItem>
                    <SelectItem value="Bn">B-</SelectItem>
                    <SelectItem value="ABp">AB+</SelectItem>
                    <SelectItem value="ABn">AB-</SelectItem>
                    <SelectItem value="Op">O+</SelectItem>
                    <SelectItem value="On">O-</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-[30%] shadow-md hover:scale-95 transition flex gap-1 rounded-xl">
            Find
            <DropletsIcon className="w-[16px] h-auto" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Filters;
