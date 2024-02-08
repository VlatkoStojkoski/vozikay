import { Ride } from "@/actions/db";
import FindRidesForm from "@/components/find-rides-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Coins, Flag, Locate, Plus, Search, User, Wallet } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div className="fill-screen flex-n-center flex-col gap-6 justify-between px-6 py-12 pt-48 sm:pt-36 bg-background">
      <div className="flex flex-col gap-8 max-w-md mx-auto">
        <div className="relative p-4 bg-red-500 rounded-lg">
          <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 h-52 aspect-[1191/569]">
            <Image
              src="/assets/img/car-illustration.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
          <FindRidesForm />
          {/* <div className="bg-white p-4 rounded-lg shadow-md mt-24">
            <div className="flex items-center space-x-2">
              <Locate className="text-gray-500 w-8" />
              <Input placeholder="Leaving from..." />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Flag className="text-gray-500 w-8" />
              <Input placeholder="Going to..." />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <div className="flex items-center space-x-2 w-full mt-4">
                <Calendar className="text-gray-500 w-8" />
                <Input type="date" placeholder="Date" />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <User className="text-gray-500 w-8" />
                <Input type='number' placeholder="1" className="max-w-[10ch]" />
              </div>
            </div>
            <Button className="w-full mt-4 bg-red-500 text-white">Search for a ride...</Button>
          </div> */}
        </div>
        <div className="flex flex-col gap-4">
          {/* <div className="flex items-center space-x-4">
            <Wallet className="text-gray-800 w-8" />
            <div>
              <h3 className="text-lg font-semibold">Budget Travel</h3>
              <p className="text-sm text-gray-600">
                Wherever your destination, a shared ride will get you there affordably.
              </p>
            </div>
          </div> */}
          <FeatureCard
            icon={<Wallet className="text-gray-800 w-10" />}
            title="Budget Travel"
            description="Wherever your destination, a shared ride will get you there affordably."
          />
          <FeatureCard
            icon={<CheckCircle className="text-gray-800 w-10" />}
            title="Reliable & Easy"
            description="We verify reviews, profiles, and IDs for safe travel with user-friendly, secure technology"
          />
          {/* Earn money card */}
          <FeatureCard
            icon={<Coins className="text-gray-800 w-10" />}
            title="Earn Money"
            description="Share your ride and make money to cover your travel costs *and more*."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-4 grid grid-cols-[3rem_auto] gap-x-2">
      <div className="flex-n-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
}