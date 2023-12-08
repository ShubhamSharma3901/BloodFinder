import Image from "next/image";
import React from "react";
import bloodBankImg from "@/public/bloodBank.jpg";
import { Button } from "./button";
import { Badge } from "@/components/ui/badge";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOrigin } from "@/lib/contexts";

interface CardProps {
  name: string;
  phone: number;
  street: string;
  state: string;
  city: string;
  zip: number;
  timings: {
    open: string;
    close: string;
    off: string;
  };
  sectors: string;
}

function BanksCards({
  name,
  phone,
  street,
  state,
  city,
  zip,
  sectors,
}: CardProps) {
  const { bloodType } = useOrigin();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="before:block before:-inset-1 before:content-[''] before:bg-red-600 before:w-1 before:h-[8rem] before:rounded-tr-lg before:rounded-br-lg"></span>
      <div className="w-full px-7 h-full">
        <div className="flex justify-start items-center gap-7">
          <div className="phone:hidden xlPhone:block">
            <Image
              src={bloodBankImg}
              alt={"bloodBank_Img"}
              className="w-[4rem] h-auto"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center gap-3">
              <h1 className="text-xl phone:text-lg font-semibold">{name}</h1>
              <Badge
                variant={"secondary"}
                className=" bg-slate-200 text-slate-600">
                {sectors}
              </Badge>
            </div>
            <div>
              <p className="tablet:text-[12px] phone:text-[10px] font-light">
                {street}
              </p>
              <p className="tablet:text-[12px]  phone:text-[10px] font-light">
                {city}
              </p>
              <p className="tablet:text-[12px]  phone:text-[10px] font-light">
                {state} - {zip}
              </p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <Link href={`tel:${phone}`}>
                <Button
                  variant={"outline"}
                  className="flex justify-start items-center gap-2 border border-green-600 rounded-xl w-fit px-2 hover:scale-95 hover:shadow-inner hover:bg-green-100/20 transition">
                  <PhoneCall className="text-green-700" size={16} />
                  <p className="text-[12px] text-green-700">{phone}</p>
                </Button>
              </Link>
              <div className="relative w-full h-full">
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={"secondary"}
                      className="rounded-xl bg-violet-100 text-violet-800 hover:bg-violet-200 hover:scale-95 hover:shadow-inner transition">
                      <p className="text-[12px]">Get Allotment</p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="absolute z-[200] phone:bg-violet-100 text-violet-800 rounded-2xl shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Please Confirm
                      </DialogTitle>
                      <DialogDescription className="text-violet-900/70 py-3 flex flex-col gap-[1.65rem]">
                        According to Government Guidelines, You can be only
                        alloted 1 Unit of Blood from a Blood Bank
                        <Link
                          href={`${process.env.NEXT_PUBLIC_APP_URL}/users/payments?name=${name}&bloodType=${bloodType}`}>
                          <Button
                            variant={"secondary"}
                            className="rounded-xl w-full bg-violet-800 text-violet-100 hover:bg-violet-900  hover:shadow-none shadow-xl transition">
                            <p className="text-[12px]">Get Allotment</p>
                          </Button>
                        </Link>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="before:block before:-inset-1 before:content-[''] before:bg-red-600 before:w-1 before:h-[8rem] before:rounded-tl-lg before:rounded-bl-lg"></span>
    </div>
  );
}

export default BanksCards;
