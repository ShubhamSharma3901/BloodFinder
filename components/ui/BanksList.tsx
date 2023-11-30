"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useEffect, useState } from "react";
import action, { fetchBanks } from "@/app/actions";

function BanksList() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchBanks().then((res) => {
      setBanks(res);
    });
    action();
  }, []);

  console.log(banks);

  return (
    <div>
      <ScrollArea></ScrollArea>
    </div>
  );
}

export default BanksList;
