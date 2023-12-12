"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { Button } from "../button";
import { Edit, HomeIcon } from "lucide-react";

interface bankProps {
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
  sectors: string;
  sessionUserId: string;
}

function BankTable() {
  const [bank, setBank] = useState<bankProps>();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/bloodBank/details`)
      .then((data) => {
        // console.log(data);
        setBank(data.data);
      });
  }, []);
  console.log(bank);

  return (
    <Table>
      <TableCaption>
        Details You Have Submitted.
        <div className="flex justify-center items-center">
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}`} className="w-full">
            <Button
              type="button"
              variant={"ghost"}
              className="w-full p-3 rounded-xl mt-5">
              <HomeIcon className="w-10 mr-1" />
              Go Home
            </Button>
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/bloodBanks/detailsForm`}
            className="w-full">
            <Button
              type="button"
              variant={"ghost"}
              className="w-full p-3 rounded-xl mt-5">
              <Edit className="w-10 mr-1" />
              Edit Details
            </Button>
          </Link>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Street</TableHead>
          <TableHead>City</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Zip</TableHead>
          <TableHead>A+</TableHead>
          <TableHead>A-</TableHead>
          <TableHead>B+</TableHead>
          <TableHead>B-</TableHead>
          <TableHead>AB+</TableHead>
          <TableHead>AB-</TableHead>
          <TableHead>O+</TableHead>
          <TableHead className="text-right">O-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{bank?.name}</TableCell>
          <TableCell>{bank?.phone}</TableCell>
          <TableCell>{bank?.address?.street}</TableCell>
          <TableCell>{bank?.address?.city}</TableCell>
          <TableCell>{bank?.address?.state}</TableCell>
          <TableCell>{bank?.address?.zip}</TableCell>
          <TableCell>{bank?.bloodTypes?.Ap}</TableCell>
          <TableCell>{bank?.bloodTypes?.An}</TableCell>
          <TableCell>{bank?.bloodTypes?.Bp}</TableCell>
          <TableCell>{bank?.bloodTypes?.Bn}</TableCell>
          <TableCell>{bank?.bloodTypes?.ABp}</TableCell>
          <TableCell>{bank?.bloodTypes?.ABn}</TableCell>
          <TableCell>{bank?.bloodTypes?.Op}</TableCell>

          <TableCell className="text-right">{bank?.bloodTypes.On}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default BankTable;
