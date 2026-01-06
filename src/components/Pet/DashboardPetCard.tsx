import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../Custom/Button/Button";
import { Cat, Eye, Mars, Trash, Venus } from "lucide-react";
import { FaMale } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import petProfile from "@/assets/images/pet-temp.jpg";
import petDefault from "@/assets/images/pet-profile-bg.png";
import petBgPatter from "@/assets/images/paw-pattern-bg.png";
import { useMobile } from "@/hooks/ResponsiveHooks";
import defaultProfile from "@/assets/images/pet-default-profile.png";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { deletePetService } from "@/services/Pet/deletePetService";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { PETS_QUERY_KEY } from "@/queryKeys/pets";
import MessageDialog from "../Custom/MessageDialog/MessageDialog";
import type { Pet, PetBasicData } from "@/types/Pet/pet";

export default function DashboardPetCard({ pet }: { pet: PetBasicData }) {
  const isMobile = useMobile();
  const [openDelete, setOpenDelete] = React.useState(false);

  const queryClient = useQueryClient();
  const deletePetMutation = useMutation({
    mutationFn: (petId: number) => deletePetService(petId),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEY });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  return (
    <>
      <MessageDialog
        open={openDelete}
        setOpen={() => {
          setOpenDelete(!openDelete);
        }}
        header="حذف پت"
        confirm={() => {
          deletePetMutation.mutate(pet.id);
        }}
      >
        <span className="leading-7">
          آیا مطمئن هستید که می‌خواهید{" "}
          <span
            dir="auto"
            style={{ unicodeBidi: "isolate" }}
            className="font-semibold"
          >
            {pet.name}
          </span> {" "}
          را حذف کنید؟
        </span>
      </MessageDialog>

      <Card className="rounded-lg border-none rtl h-80 w-full pb-1">
        <CardHeader className="p-0 flex h-2/5">
          <CardTitle
            className="h-full md:h-25 rounded-t-lg bg-cover "
            style={{ backgroundImage: `url(${petBgPatter})` }}
          ></CardTitle>
          <div className="h-fit w-fit flex justify-center items-center self-center">
            <Avatar className=" -mt-[60%] md:-mt-[55%] w-20 h-20  md:w-25 md:h-25">
              <AvatarImage src={pet.pictureLink} className="object-cover" />

              <AvatarFallback className="bg-gray-100 flex w-full h-full items-center justify-center ">
                {pet.name.slice(0, 3).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <div className="flex flex-col justify-between h-3/5">
          <CardContent className="px-3 mb-0 pb-2 mt-2">
            <div className="flex justify-between">
              <p className="text-sm md:text-lg font-bold">{pet.name}</p>
              {pet.gender === "نر" ? (
                <Mars size={isMobile ? 20 : 32} />
              ) : pet.gender == "ماده" ? (
                <Venus size={isMobile ? 20 : 32} />
              ) : (
                <Cat size={isMobile ? 20 : 32} />
              )}
            </div>
            <p className="text-xs md:text-sm mt-2">
              {pet.kind} {pet.species}
            </p>
            <p className="text-xs md:text-sm">
              {pet.age ? pet.age : pet.isAdult ? "بالغ" : "نابالغ"}
            </p>
          </CardContent>
          {isMobile ? (
            <CardFooter className="flex flex-col md:mt-5 px-3 pb-2 justify-end">
              <Button className="shadow-none drop-shadow-none w-full h-9 text-xs">
                <Eye />
                مشاهده
              </Button>
              <Button
                variant={"outline"}
                className="shadow-none drop-shadow-none w-full h-9 text-xs mt-1"
                onClick={() => setOpenDelete(true)}
              >
                <Trash />
                حذف
              </Button>
            </CardFooter>
          ) : (
            <CardFooter className="flex justify-center items-center gap-2 mt-1 md:mt-5">
              <Button
                variant={"outline"}
                className="shadow-none drop-shadow-none"
                onClick={() => setOpenDelete(true)}
              >
                <Trash />
                حذف
              </Button>
              <Button className="shadow-none drop-shadow-none">
                <Eye />
                مشاهده
              </Button>
            </CardFooter>
          )}
        </div>
      </Card>
    </>
  );
}
