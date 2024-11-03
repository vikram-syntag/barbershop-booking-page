import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stylists = [
  {
    name: "Christine",
    role: "Master Stylist & Owner",
    specialties: ["Color Specialist", "Precision Cuts", "Wedding Styling"]
  },
  {
    name: "Kim",
    role: "Stylist",
    specialties: ["Balayage", "Brazilian Blowout", "Men's Fades"]
  },
  {
    name: "Melissa",
    role: "Stylist",
    specialties: ["Creative Color", "Japanese Straightening", "Keratin Treatments"]
  }
];

export default function StylistsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-lg text-muted-foreground">
          Our experienced stylists are passionate about creating the perfect look for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stylists.map((stylist) => (
          <Card key={stylist.name}>
            <CardHeader>
              <CardTitle>{stylist.name}</CardTitle>
              <p className="text-primary font-medium">{stylist.role}</p>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {stylist.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}