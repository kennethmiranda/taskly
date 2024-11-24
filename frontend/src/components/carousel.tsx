"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

export function CarouselComponent() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        align: "center",
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className=""
    >
      <CarouselContent>
        <CarouselItem>
          <Card>
            <CardContent className="h-[350px] sm:h-[550px] flex items-center justify-center p-3">
              <img
                src="/hero-desktop-1.png"
                alt="Task Management"
                className="carousel-image"
              />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="h-[350px] sm:h-[550px] flex items-center justify-center p-3">
              <img
                src="/hero-mobile.png"
                alt="Task Management"
                className="carousel-image"
              />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="h-[350px] sm:h-[550px] flex items-center justify-center p-3">
              <img
                src="/hero-desktop-2.png"
                alt="Task Management"
                className="carousel-image"
              />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
