import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useMobile } from "@/hooks/ResponsiveHooks";

export default function LoadingPetCard() {
  const isMobile = useMobile();

  return (
    <Card className="rounded-lg border-none rtl h-80 w-full pb-1">
      <CardHeader className="p-0 h-2/5 relative">
        <CardTitle className="h-full md:h-25 rounded-t-lg bg-cover">
          <Skeleton className="h-full w-full rounded-none" />
        </CardTitle>

        <div className="h-fit w-fit flex justify-center items-center self-center">
          <Skeleton className="-mt-[60%] md:-mt-[55%] w-20 h-20 md:w-25 md:h-25 rounded-full" />
        </div>
      </CardHeader>

      <div className="flex flex-col justify-between h-3/5">
        <CardContent className="px-3 mb-0 pb-2 pt-5">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 md:h-6 w-28 md:w-36 rounded-md" />
            <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </div>

          <Skeleton className="h-4 w-32 md:w-40 rounded-lg mt-3" />

          <Skeleton className="h-4 w-20 md:w-24 rounded-lg mt-2" />
        </CardContent>

        {isMobile ? (
          <CardFooter className="flex flex-col px-3 pb-2 gap-2">
            <Skeleton className="h-9 w-full rounded-full" />
            <Skeleton className="h-9 w-full rounded-full" />
          </CardFooter>
        ) : (
          <CardFooter className="flex justify-center items-center gap-2 px-3 pb-2">
            <Skeleton className="h-9 w-full rounded-full" />
            <Skeleton className="h-9 w-full rounded-full" />
          </CardFooter>
        )}
      </div>
    </Card>
  );
}
