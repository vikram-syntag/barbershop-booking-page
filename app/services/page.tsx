import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    category: "Haircut",
    services: [
      { name: "Men's Cut", price: "15" },
      { name: "Men's Fade", price: "15+" },
      { name: "Women's Cut", price: "25+" }
    ]
  },
  {
    category: "Color",
    services: [
      { name: "Full Head", price: "Varies" },
      { name: "Touch Up", price: "40+" },
      { name: "Highlight", price: "70+" },
      { name: "Perm", price: "50+" },
      { name: "Japanese Straightening", price: "200+" },
      { name: "Keratin Treatment", price: "150+" },
      { name: "Brazilian Blowout", price: "150+" }
    ]
  },
  {
    category: "Shampoo",
    services: [
      { name: "Shampoo/Set", price: "20" },
      { name: "Shampoo/Blow out", price: "20+" },
      { name: "Shampoo only", price: "7+" }
    ]
  },
  {
    category: "Wax",
    services: [
      { name: "Eyebrows", price: "10" },
      { name: "Lips", price: "10" },
      { name: "Chin", price: "5" },
      { name: "Face", price: "5" },
      { name: "Underarm", price: "15" },
      { name: "Bikini", price: "25" },
      { name: "Arms", price: "10" },
      { name: "Legs", price: "15" },
      { name: "Brazilian", price: "25" }
    ]
  },
  {
    category: "Nails",
    services: [
      { name: "Manicure", price: "40" },
      { name: "Pedicure", price: "30" },
      { name: "Gellac Polish", price: "25" },
      { name: "Polish Change", price: "7" }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We offer a comprehensive range of beauty services to meet all your needs.
          All services include a consultation with your stylist.
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
          <Link href="/book">Book Appointment</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="text-primary">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.services.map((service) => (
                  <div key={service.name} className="flex justify-between items-center">
                    <span>{service.name}</span>
                    <span className="font-semibold">${service.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>* Prices may vary based on hair length, thickness, and complexity of service.</p>
        <p>* Consultation required for some services to determine final pricing.</p>
        <p className="mt-4 text-primary font-medium">Walk-ins are welcomed!</p>
      </div>
    </div>
  );
}