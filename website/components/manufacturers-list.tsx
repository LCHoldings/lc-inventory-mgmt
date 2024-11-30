"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { Manufacturer } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { set } from "react-hook-form";

interface DevicesResponse {
    deviceCount: number;
}

interface ItemsResponse {
    itemCount: number;
}

async function getDevicesForManufacturer(manufacturerId: string) {
  const devicesRes = await fetch(
    `/api/manufacturers?action=getManufacturerDevices&manufacturerId=${manufacturerId}`,
    {
      method: "GET",
    }
  );
  const devicesData: DevicesResponse = await devicesRes.json();
  return devicesData.deviceCount || 0;
}

async function getItemsForManufacturer(manufacturerId: string) {
  const itemsRes = await fetch(
    `/api/manufacturers?action=getManufacturerItems&manufacturerId=${manufacturerId}`,
    {
      method: "GET",
    }
  );
  const itemsData: ItemsResponse = await itemsRes.json();
  return itemsData.itemCount || 0;
}

//const devices: String[] = [];
//const items: String[] = [];
export async function ManufacturerList() {
   const [items, setItems] = useState<String[]>([]);   
   const [devices, setDevices] = useState<String[] >([]);

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const res = await fetch("/api/manufacturers?action=getManufacturers", {
          method: "GET",
        });
        const data = await res.json();
        setManufacturers(data);
        for (const manufacturer of manufacturers) {
            setDevices([Number(manufacturer.id)]) = String(await getDevicesForManufacturer(manufacturer.id))
            setItems([Number(manufacturer.id)]) = String(await getItemsForManufacturer(manufacturer.id))
            
          }
          
       
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };
     
    fetchManufacturers();
  }, []);
  


 

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Support URL</TableHead>
            <TableHead>Devices</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manufacturers.map((manufacturer) => (
            <TableRow key={manufacturer.id}>
              <TableCell>
                {manufacturer.image ? (
                  <Image
                    src={manufacturer.image}
                    alt={manufacturer.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                ) : (
                  <AlertCircle className="w-10 h-10 text-gray-300" />
                )}
              </TableCell>
              <TableCell className="font-medium">{manufacturer.name}</TableCell>
              <TableCell>
                <p>{manufacturer.siteUrl || "N/A"}</p>
              </TableCell>
              <TableCell>
                <p>{manufacturer.supportEmail || "N/A"}</p>
              </TableCell>
              <TableCell>
                <p>{manufacturer.supportPhone || "N/A"}</p>
              </TableCell>
              <TableCell>
                <p>{manufacturer.supportUrl || "N/A"}</p>
              </TableCell>

              <TableCell>
                <p>{devices[manufacturer.id]}</p>
              </TableCell>
              <TableCell>
                <p>{items[manufacturer.id]}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
