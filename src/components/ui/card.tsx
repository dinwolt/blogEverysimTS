import * as React from "react"
import { IGatsbyImageData } from "gatsby-plugin-image";
import { cn } from "@/lib/utils"
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      " max-w-md w-auto  h-auto rounded-lg overflow-hidden shadow-lg bg-white",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 ", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { img: IGatsbyImageData }
>(({ className, img, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative lg:h-64 md:h-32 w-full", className)}
    {...props}
  >
    <GatsbyImage image={img} alt="Card" className="object-cover w-full h-full scale-110"/>
  </div>
));

CardImage.displayName = "CardImage";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "lg:text-2xl font-semibold text-gray-800 mb-2 hover:text-gray-900 transition-colors",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardTag = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "lg:text-sm text-xs text-blue-500 mb-2 font-medium",
      className
    )}
    {...props}
  />
))
CardTag.displayName = "CardTag"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("hidden sm:block md:text-sm lg:text-md text-base text-gray-500 mt-auto", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative lg:h-64 md:h-32 w-full", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardImage, CardFooter, CardTag, CardTitle, CardDescription, CardContent }
