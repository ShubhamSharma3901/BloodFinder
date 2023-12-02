"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useEffect, useState } from "react";
import action, { fetchBanks } from "@/app/actions";
import { useOrigin } from "@/lib/contexts";
import { getAddressFromGeocode } from "@/lib/utils";
import BanksCards from "./BanksCards";

function BanksList() {
  const [banks, setBanks] = useState([]);
  const { origin, setIsLoad } = useOrigin();

  console.log(origin);

  useEffect(() => {
    setIsLoad(false);
    getAddressFromGeocode(origin, setBanks, setIsLoad);
    action();
  }, [origin]);

  return (
    <div>
      <ScrollArea className="flex flex-col gap-8">
        {banks.length === 0 ? (
          <h1>Empty...</h1>
        ) : (
          banks?.map((bank) => {
            return (
              <section
                key={bank.id}
                className="border rounded-lg w-full flex justify-center items-center relative h-fit py-5 hover:scale-105 cursor-pointer transition ease-in-out">
                <BanksCards
                  name={bank?.name}
                  phone={bank?.phone}
                  street={bank?.address?.street}
                  state={bank?.address?.state}
                  city={bank?.address?.city}
                  zip={bank?.address?.zip}
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
