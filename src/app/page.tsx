import Image from "next/image";
import { CheckCircle, Coins, Wallet } from "lucide-react";
import FindRidesForm from "@/components/find-rides-form";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/style";

export default function Home() {
  return (
    <>
      <main className="relative min-w-full -translate-y-navbar min-h-[calc(100dvh-3rem-theme(spacing.3)*2-theme(spacing.6))] bg-[url(/assets/img/bg-1.jpg)] bg-center bg-cover px-3 pt-24 flex-n-center">
        <div className="relative z-10 pt-16 backdrop-blur-sm rounded-lg">
          <div className="absolute top-0 left-0 bg-background w-full h-full -z-10 rounded-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-y-2/3 -translate-x-1/2 w-full max-w-[100vw] max-h-52 aspect-[1191/569]">
            <Image
              src="/assets/img/car-illustration.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>

          <h1 className="text-center mb-4">Explore Rides</h1>

          <FindRidesForm />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-background"></div>
      </main>
      <section className="relative bg-background">
        <div className="sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2 translate-y-[calc(-1*(3rem+theme(spacing.3)*4))] grid grid-cols-1 sm:grid-cols-3 w-full max-w-sm mx-auto sm:max-w-screen-md px-4 py-4 sm:pt-0 gap-4">
          <FeatureCard
            icon={<Wallet className="text-primary size-8" />}
            title="Budget Travel"
            description="Wherever your destination, a shared ride will get you there affordably."
          />
          <FeatureCard
            icon={<CheckCircle className="text-primary size-8" />}
            title="Reliable & Easy"
            description="We verify reviews, profiles, and IDs for safe travel with user-friendly, secure technology"
          />
          <FeatureCard
            icon={<Coins className="text-primary size-8" />}
            title="Earn Money"
            description="Share your ride and make money to cover your travel costs *and more*."
          />
        </div>

      </section>
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconPosition?: "left" | "top";
  className?: string;
}

const iconPositionClassnames = {
  left: "grid grid-cols-[3rem_auto]",
  top: "grid grid-rows-[3rem_auto]",
}

function FeatureCard({ icon, title, description, iconPosition, className }: FeatureCardProps) {
  return (
    <Card className={cn("p-4 gap-3 border-primary", iconPositionClassnames[iconPosition ?? 'top'], className)}>
      <div className={'flex-n-center'}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
}