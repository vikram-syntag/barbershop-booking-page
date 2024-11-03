"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, User, Scissors, Phone, Mail } from "lucide-react";
import Link from "next/link";

interface BookingData {
  date: string;
  time: string;
  service: string;
  stylist: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    firstVisit: string;
    notes: string;
  };
}

export default function BookingConfirmedPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
      // Clear the data after retrieving it
      sessionStorage.removeItem('bookingData');
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="container py-12 text-center">
        <p>No booking information found. Please make a booking first.</p>
        <Button asChild className="mt-4">
          <Link href="/book">Book Appointment</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            You will receive a confirmation SMS shortly.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-left">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{bookingData.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{bookingData.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <Scissors className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{bookingData.service}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-left">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Stylist</p>
                  <p className="font-medium">{bookingData.stylist}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-left">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{bookingData.customer.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-left">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{bookingData.customer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-left">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{bookingData.customer.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t space-y-4">
              <p className="text-sm text-muted-foreground">
                Need to make changes to your appointment?
                <br />
                Call us at (650) 966-8588
              </p>

              <Button asChild className="w-full">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}