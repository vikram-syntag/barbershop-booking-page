"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";

const reviews = [
  {
    name: "Umang D.",
    location: "San Mateo, CA",
    date: "Feb 10, 2024",
    review: "Have gotten a haircut here a few times and still <span class='highlight'>one of the more reasonably priced salons</span> in the area. Generally isn't very busy and have liked the haircut I got here",
    service: "Haircut"
  },
  {
    name: "Josh G.",
    location: "CA, CA",
    date: "Sep 18, 2023",
    review: "They have been in the <span class='highlight'>same location for a couple decades</span>, that alone could tell that they must be doing something right. Staff are very attentive my son had a haircut and we didnt even have to wait. <span class='highlight'>First come first serve</span> no matter new or old client. Friendly people and the owner are very accommodating. I hope they last another 20 years!",
    service: "Haircut"
  },
  {
    name: "Holly L.",
    location: "Oakland, CA",
    date: "Jul 23, 2023",
    review: "I've been seeing Christine for over a year. I was looking for a new stylist and was impressed by her reviews. I remember one reviewer saying she does <span class='highlight'>amazing a-lines</span>, which I can now attest is true! The first time I saw her, I brought a picture of the haircut I was looking for, and she nailed it. Along with being a <span class='highlight'>talented stylist</span>, she is a great listener, a lovely person, and a consummate professional.",
    service: "Haircut"
  },
  {
    name: "Shristy A.",
    location: "San Jose, CA",
    date: "Dec 22, 2022",
    review: "Christine is one of my favorites since the first time she gave me a haircut! She is very sweet and suggests options very politely as well. She has <span class='highlight'>more than 20 years of experience</span> and she is so down to earth :) I feel sooo happy to support this small business for their creativity and honesty!",
    service: "Haircut"
  },
  {
    name: "Caroline L.",
    location: "Mountain View, CA",
    date: "Jun 12, 2022",
    review: "I go to that salon with my daughter for a haircut every 2-3 months. I have not had any color or other services done, so this review is for haircuts only. We have been going there since my daughter was 2 years old. They do a <span class='highlight'>good job for kids and adults</span>. It is one of the few <span class='highlight'>reasonably priced hair salons</span> in the area. We are happy with the haircuts, our hair is always soft and shiny when we walk out of this place. They are nice with my daughter and chat and joke with her. Both my daughter and I have always walked out of there satisfied with our haircut.",
    service: "Haircut"
  }
];

export default function ReviewsPage() {
  const [newReview, setNewReview] = useState({ name: "", service: "", rating: 5, review: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your review!");
    setNewReview({ name: "", service: "", rating: 5, review: "" });
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Client Reviews</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Read what our clients have to say about their experience at Christine's Salon
          </p>
          <a 
            href="https://www.yelp.com/biz/christines-salon-mountain-view-2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Read more reviews on Yelp
          </a>
        </div>

        <div className="grid gap-6 mb-12">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <p className="text-primary text-sm">{review.location}</p>
                    </div>
                    <div className="flex text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: review.review }} />
                  <p className="text-sm text-muted-foreground">
                    {review.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leave a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Received</Label>
                <Input
                  id="service"
                  value={newReview.service}
                  onChange={(e) => setNewReview({ ...newReview, service: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}