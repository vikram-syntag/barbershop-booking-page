"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6" />
          <span className="text-xl font-bold">Christine's Salon</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/services" className="text-foreground/60 hover:text-foreground">Services</Link>
          <Link href="/stylists" className="text-foreground/60 hover:text-foreground">Our Team</Link>
          <Link href="/reviews" className="text-foreground/60 hover:text-foreground">Reviews</Link>
          <Link href="/contact" className="text-foreground/60 hover:text-foreground">Contact</Link>
          <Button asChild variant="default">
            <Link href="/book">Book Now</Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}