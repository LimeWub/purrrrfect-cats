import { Heart, PawPrint, House, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs"
import { ListingHome } from "./listing-home"
import { ListingExplore } from "./listing-explore"
import { ListingFavourites } from "./listing-favourites"
import { ErrorState, ErrorStateTitle } from "@/components/error-state"
import { Button } from "@/components/button"

export const Listing = () => {
  return (
    <div className="container mx-auto px-4 grow flex flex-col gap-4">
      <p className="text-xs font-heading-cursive -mt-5">Cool cats. Cute cats. Cat cats.</p>
      <Tabs defaultValue="uploaded">
        <TabsList className="ml-auto">
          <TabsTrigger value="uploaded"><House />Home</TabsTrigger>
          <TabsTrigger value="search"><PawPrint />Explore</TabsTrigger>
          <TabsTrigger value="favourites"><Heart />Favourites</TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded" className="mt-4">
          <ListingHome />
        </TabsContent>

        <TabsContent value="search" className="mt-4">
          <ListingExplore />
        </TabsContent>

        <TabsContent value="favourites" className="mt-4">
          <ListingFavourites />
        </TabsContent>
      </Tabs>
      <ErrorState className="flex flex-col items-center gap-2 w-full bg-tonal-50 rounded-lg px-4 py-4 sm:py-8 border border-tonal-100 mt-auto">
        <ErrorStateTitle>Have a cat picture you want to share with the world?</ErrorStateTitle>
        <Button asChild><Link to="/upload">Upload it <ArrowRight /></Link></Button>
      </ErrorState>
    </div>
  )
}
