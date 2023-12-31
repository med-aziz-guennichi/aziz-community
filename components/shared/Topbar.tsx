"use client";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import Anim from "@/animations/animation_lnrpfypc.json";
import Lotti from "lottie-react";
function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        {/* <Image src="/assets/logo.svg" alt="logo" width={28} height={28} /> */}
        <div className="w-[50px]">
          <Lotti animationData={Anim} loop={false} />
        </div>

        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Aziz threads
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
