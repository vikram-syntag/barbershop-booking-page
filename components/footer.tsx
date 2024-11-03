import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const hours = [
  { day: "Monday", hours: "10:00am - 7:00pm" },
  { day: "Tuesday", hours: "10:00am - 7:00pm" },
  { day: "Wednesday", hours: "10:00am - 7:00pm" },
  { day: "Thursday", hours: "10:00am - 7:00pm" },
  { day: "Friday", hours: "9:00am - 7:00pm" },
  { day: "Saturday", hours: "9:00am - 7:00pm" },
  { day: "Sunday", hours: "10:00am - 6:00pm" }
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(650) 966-8588</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" />
              <span>2425 California St<br />Mountain View, CA 94040</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/book" className="hover:text-primary">Book Appointment</Link></li>
            <li><Link href="/services" className="hover:text-primary">Services</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Hours</h3>
          <ul className="space-y-2">
            {hours.map((day) => (
              <li key={day.day} className="flex justify-between">
                <span>{day.day}:</span>
                <span>{day.hours}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-primary font-medium">Walk-ins Welcome!</p>
        </div>
      </div>
      
      <div className="border-t">
        <div className="container py-6 text-center text-sm">
          © {new Date().getFullYear()} Christine's Salon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}