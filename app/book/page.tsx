"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addDays, format, isBefore, startOfToday } from "date-fns";

// Mock data - In a real app, this would come from an API
const SERVICES = [
  { id: "womens-cut", name: "Women's Cut", duration: 60, price: "25+" },
  { id: "mens-cut", name: "Men's Cut", duration: 30, price: "15" },
  { id: "mens-fade", name: "Men's Fade", duration: 45, price: "15+" },
  { id: "color-full", name: "Full Color", duration: 120, price: "Varies" },
  { id: "color-touchup", name: "Color Touch Up", duration: 90, price: "40+" },
  { id: "highlights", name: "Highlights", duration: 120, price: "70+" },
  { id: "perm", name: "Perm", duration: 120, price: "50+" },
  { id: "japanese-straight", name: "Japanese Straightening", duration: 240, price: "200+" },
  { id: "keratin", name: "Keratin Treatment", duration: 180, price: "150+" },
  { id: "brazilian", name: "Brazilian Blowout", duration: 180, price: "150+" }
];

const STYLISTS = [
  { 
    id: "christine", 
    name: "Christine (Owner)", 
    specialties: ["womens-cut", "color-full", "highlights", "keratin", "brazilian", "womens-cut", "color-full", "color-touchup", "highlights"],
    availability: ["monday", "tuesday", "wednesday", "thursday"]
  },
  { 
    id: "kim", 
    name: "Kim", 
    specialties: ["womens-cut", "mens-cut", "mens-fade", "perm"],
    availability: ["wednesday", "thursday", "friday", "saturday"]
  },
  { 
    id: "melissa", 
    name: "Melissa", 
    specialties: ["mens-cut", "mens-fade", "japanese-straight", "keratin"],
    availability: ["monday", "tuesday", "friday", "saturday"]
  }
];

const TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30"
];

export default function BookingPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [stylist, setStylist] = useState<string>("");
  const [selectionOrder, setSelectionOrder] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    firstVisit: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create booking data object
    const bookingData = {
      date: date ? format(date, 'MMMM d, yyyy') : '',
      time,
      service: SERVICES.find(s => s.id === service)?.name || '',
      stylist: STYLISTS.find(s => s.id === stylist)?.name || '',
      customer: customerInfo
    };

    // Store booking data in sessionStorage
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    toast.success("Booking confirmed! You'll receive a confirmation SMS shortly.");
    router.push('/book/confirmed');
  };

  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  const updateSelection = (type: string, value: any) => {
    // Update the value
    switch (type) {
      case 'date':
        setDate(value);
        break;
      case 'time':
        setTime(value);
        break;
      case 'service':
        setService(value);
        break;
      case 'stylist':
        setStylist(value);
        break;
    }

    // Update selection order
    setSelectionOrder(prev => {
      const newOrder = prev.filter(item => item !== type);
      return [...newOrder, type];
    });
  };

  const getFilteredStylists = () => {
    let filtered = STYLISTS;

    if (date) {
      const dayOfWeek = getDayOfWeek(date);
      filtered = filtered.filter(s => s.availability.includes(dayOfWeek));
    }

    if (service) {
      filtered = filtered.filter(s => s.specialties.includes(service));
    }

    return filtered;
  };

  const getFilteredServices = () => {
    let filtered = SERVICES;

    if (stylist) {
      const stylistData = STYLISTS.find(s => s.id === stylist);
      filtered = filtered.filter(s => stylistData?.specialties.includes(s.id));
    }

    return filtered;
  };

  const getFilteredTimes = () => {
    // In a real app, this would check against booked appointments
    return TIMES;
  };

  const shouldShowOptions = () => {
    const selections = selectionOrder.length;
    
    // Always show all options if date is selected first
    if (selectionOrder[0] === 'date') return true;
    
    // Show options if date is second selection
    if (selections >= 2 && selectionOrder.includes('date')) return true;
    
    // Show options if three selections are made (regardless of date)
    if (selections >= 3) return true;
    
    return false;
  };

  useEffect(() => {
    const allSelected = date && time && service && stylist;
    setShowForm(!!allSelected);
  }, [date, time, service, stylist]);

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Book Your Appointment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {!showForm && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Choose Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && updateSelection('date', newDate)}
                    disabled={(date) => isBefore(date, startOfToday())}
                    className="mb-4"
                  />
                  
                  {(shouldShowOptions() || time) && (
                    <div className="space-y-2">
                      <Label>Select Time</Label>
                      <Select value={time} onValueChange={(value) => updateSelection('time', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose time" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFilteredTimes().map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Choose Service & Stylist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(shouldShowOptions() || service) && (
                    <div className="space-y-2">
                      <Label>Select Service</Label>
                      <Select value={service} onValueChange={(value) => updateSelection('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose service" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFilteredServices().map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name} (${s.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {(shouldShowOptions() || stylist) && (
                    <div className="space-y-2">
                      <Label>Select Stylist</Label>
                      <Select value={stylist} onValueChange={(value) => updateSelection('stylist', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose stylist" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFilteredStylists().map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {showForm && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Booking Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Service:</p>
                    <p>{SERVICES.find(s => s.id === service)?.name}</p>
                    <p>Stylist:</p>
                    <p>{STYLISTS.find(s => s.id === stylist)?.name}</p>
                    <p>Date:</p>
                    <p>{date ? format(date, 'MMMM d, yyyy') : ''}</p>
                    <p>Time:</p>
                    <p>{time}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firstVisit">Is this your first visit?</Label>
                      <Select 
                        value={customerInfo.firstVisit}
                        onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, firstVisit: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Notes or Requests</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific concerns or preferences?"
                      className="min-h-[100px]"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Confirm Booking
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {!showForm && !shouldShowOptions() && (
          <p className="text-center mt-6 text-muted-foreground">
            Please select a date and one more option to see available choices
          </p>
        )}
      </div>
    </div>
  );
}