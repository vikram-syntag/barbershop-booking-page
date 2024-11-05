import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Scissors, Clock, Award } from "lucide-react";

const reviews = [
  {
    name: "Holly L.",
    location: "Oakland, CA",
    review: "I've been seeing Christine for over a year. She does <span class='highlight'>amazing a-lines</span>, which I can now attest is true! Along with being a <span class='highlight'>talented stylist</span>, she is a great listener and a consummate professional."
  },
  {
    name: "Shristy A.",
    location: "San Jose, CA",
    review: "Christine has <span class='highlight'>more than 20 years of experience</span> and she is so down to earth! I feel sooo happy to support this small business for their creativity and honesty!"
  },
  {
    name: "Caroline L.",
    location: "Mountain View, CA",
    review: "They do a <span class='highlight'>good job for kids and adults</span>. It is one of the few <span class='highlight'>reasonably priced hair salons</span> in the area. Our hair is always soft and shiny when we walk out of this place."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="/images/c-hero.jpg"
          alt="Salon interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome to Christine's Salon</h1>
            <p className="text-xl mb-8">Experience luxury hair care with our award-winning stylists. Book your transformation today.</p>
            <Button size="lg" asChild>
              <Link href="/book">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Scissors className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Expert Stylists</h3>
                  <p className="text-muted-foreground">Our team of professional stylists brings years of experience and creativity.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
                  <p className="text-muted-foreground">Open 7 days a week with convenient morning and evening appointments.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Award className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
                  <p className="text-muted-foreground">Dedicated to providing exceptional service and results you'll love.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: review.review }} />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/reviews">Read More Reviews</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}