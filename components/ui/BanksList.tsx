"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useEffect, useState } from "react";
import action, { fetchBanks } from "@/app/actions";
import { useOrigin } from "@/lib/contexts";
import { getAddressFromGeocode } from "@/lib/utils";
import BanksCards from "./BanksCards";

function BanksList() {
  const [banks, setBanks] = useState<
    Array<{
      name: string;
      coords: { lat: number; lng: number };
      bloodTypes: {
        Ap: number;
        An: number;
        Bp: number;
        Bn: number;
        ABp: number;
        ABn: number;
        Op: number;
        On: number;
      };
      address: {
        street: string;
        city: string;
        state: string;
        zip: number;
      };
      phone: number;
      timings: {
        open: string;
        close: string;
        off: string;
      };
      sectors: string;
    }>
  >([]);
  const { origin, setIsLoad, bloodType } = useOrigin();

  console.log(origin);

  useEffect(() => {
    setIsLoad(false);
    getAddressFromGeocode(origin, setBanks, setIsLoad, bloodType)
      .then((city) => {
        fetchBanks(city, bloodType).then((res) => {
          setBanks(res);
          setIsLoad(true);
        });
        console.log(city);
      })
      .catch((err) => {
        console.log("Error aagya");
      });
    action();
  }, [origin, bloodType, setIsLoad]);

  return (
    <div>
      <ScrollArea className="flex flex-col gap-8">
        {banks.length === 0 ? (
          <h1 className="text-sm font-light text-neutral-400">
            Oops, No Blood Bank Available at the moment.
            <br />
            (Please Try at Different Location or Select Different Blood Group)
          </h1>
        ) : (
          banks?.map((bank) => {
            return (
              <section
                key={bank?.phone}
                className="border rounded-2xl w-full flex justify-center items-center relative h-fit py-5 hover:scale-105 cursor-pointer transition ease-in-out">
                <BanksCards
                  name={bank?.name}
                  phone={bank?.phone}
                  street={bank?.address?.street}
                  state={bank?.address?.state}
                  city={bank?.address?.city}
                  zip={bank?.address?.zip}
                  timings={bank?.timings}
                  sectors={bank?.sectors}
                />
              </section>
            );
          })
        )}
      </ScrollArea>
    </div>
  );
}

export default BanksList;
