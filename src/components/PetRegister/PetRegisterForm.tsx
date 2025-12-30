import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Textarea } from "../Custom/Textarea/Textarea";
import Stepper, { Step } from "../Custom/PetRegister/PetMultiStage";
import {
  getPetSpeciesService,
  registerPetService,
} from "@/services/petRegisterService";
import EditableAvatar from "../Custom/Avatar/EditableAvatar";
import { Input } from "../Custom/Input/Input";
import PetKindToggleGroup from "./PetKindToggleGroup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Custom/Select/Select";
import Toggle from "../Custom/Toggle/Toggle";
import { BabyIcon, Bird, Cat, Dog, Mars, Rabbit, Venus } from "lucide-react";
import IsAdultToggleGroup from "./IsAdultToggleGroup";
import { PetDatePicker } from "../Custom/PetDatePicker/PetDatePicker";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Button } from "../Custom/Button/Button";
import CustomToast from "../Custom/CustomToast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PETS_QUERY_KEY } from "@/queryKeys/pets";
import type { PetRegisterFormProps } from "@/types/PetRegister/multistageProps";



export default function PetRegisterForm({ closeModal }: PetRegisterFormProps) {
  const [genderDontKnow, setGenderDontKnow] = useState(false);
  const [weightDontKnow, setWeightDontKnow] = useState(false);
  const [birthDontKnow, setBirthDontKnow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(1);

  const [speciesList, setSpeciesList] = useState([
    { name: "پرشین", num: 1 },
    { name: "ژرمن", num: 2 },
  ]);

  const isMobile = useMobile();

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState<string>("");
  const [getSpeciesError, setGetSpeciesError] = useState(false);

  const KIND_MAP: Record<string, number> = {
    dog: 1,
    cat: 2,
    bird: 3,
    rabit: 4,
  };

  const GENDER_MAP: Record<string, number> = {
    male: 1,
    femal: 2,
    dontKnow: 3,
  };

  function petKindOnChange(name: string) {
    const kindId =
      name === "dog" ? 1 : name === "cat" ? 2 : name === "bird" ? 3 : 4;

    getPetSpeciesService(kindId)
      .then((loginResponse) => {
        if (loginResponse.statusCode === 200) {
          setSpeciesList(loginResponse.data!);
        }
      })
      .catch((error) => {
        const errorText = "خطای غیر منتظره";
        console.log(errorText);
        setGetSpeciesError(true);
        console.log(error?.response?.statusCode);
      });

    console.log(name);
  }

  const showToast = (message: string) => {
    CustomToast(message);
  };

  function navigateToDashboard() {
    queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEY });
    closeModal?.();
    navigate("/Dashboard/pets");
  }

  return (
    <Formik
      initialValues={{
        petKind: "",
        petName: "",
        gender: "male",
        species: "",
        birthDate: "",
        isAdult: "false",
        weight: 1,
        aboutPet: "",
        petprof: null,
      }}
      onSubmit={(values) => {
        const formData = new FormData();

        formData.append("name", values.petName);
        formData.append("kind", String(KIND_MAP[values.petKind]));
        formData.append("species", values.species);

        if (birthDontKnow) {
          formData.append("isAdult", values.isAdult);
        }
        if (values.aboutPet) {
          formData.append("aboutPet", values.aboutPet);
        }
        if (values.birthDate && !birthDontKnow) {
          formData.append("birthDate", values.birthDate);
        }

        if (values.petprof) {
          formData.append("petprof", values.petprof);
        }

        if (values.weight && !weightDontKnow) {
          formData.append("weight", String(values.weight));
        }

        formData.append(
          "gender",
          genderDontKnow
            ? String(GENDER_MAP["dontKnow"])
            : String(GENDER_MAP[values.gender])
        );

        registerPetService(formData)
          .then((res) => {
            console.log("SUCCESS", res);
            setRegisterSuccess(true);
          })
          .catch((err) => {
            console.error("ERROR", err);
            if (err) {
              setRegisterErrorMessage(
                err?.response?.data?.messages?.pet ??
                  "خطایی در ذخیره پت به وجود آمد لطفا دوباره تلاش کنید."
              );
            } else {
              setRegisterErrorMessage(
                "خطایی در ذخیره پت به وجود آمد لطفا دوباره تلاش کنید."
              );
            }
          });

        setSubmitted(true);
      }}
    >
      {({ submitForm, values }) => (
        <Form className="h-full">
          {submitted ? (
            <div className="w-full h-full flex flex-col items-center justify-center ">
              {registerSuccess && (
                <p className="text-lg mb-6">پت شما با موفقیت ثبت شد.</p>
              )}
              {registerErrorMessage && (
                <p className="text-lg mb-6">{registerErrorMessage}</p>
              )}
              <Button
                onClick={() => {
                  navigateToDashboard();
                }}
                type={"button"}
              >
                بازگشت به داشبورد
              </Button>
            </div>
          ) : (
            <Stepper
              canProceed={(step) => {
                if (step === 1 && !values.petName) {
                  showToast("لطفا نام پت خود را وارد کنید.");
                  return false;
                }

                if (step === 2) {
                  let valid = true;

                  if (!values.petKind) {
                    valid = false;
                    showToast("لطفا نوع پت را انتخاب کنید.");
                  }

                  if (!values.species) {
                    valid = false;
                    showToast(
                      "لطفا نژاد پت خود را انتخاب کنید (اگر نمیدانید گزینه آخر را انتخاب کنید)"
                    );
                  }

                  return valid;
                }

                return true;
              }}
              initialStep={1}
              onStepChange={(nextStep) => {
                setCurrentStep(nextStep);
              }}
              onFinalStepCompleted={() => {
                console.log("All steps completed!");

                submitForm();
              }}
              backButtonText="مرحله قبل"
              nextButtonText="مرحله بعد"
              className={isMobile ? "relative h-full" : "mb-20"}
              backButtonProps={{ className: "" }}
              stepContainerClassName="hidden"
            >
              <Step>
                <div className="h-110 md:h-120 flex justify-start flex-col items-center mb-[3vh] md:mb-[2vh]">
                  <p className="font-bold text-md mt-10">
                    نام و عکس پت خود رو وارد کنید
                  </p>
                  <EditableAvatar
                    name="petprof"
                    className="w-24 h-24 border-2 md:w-30 md:h-30 md:border-6 mt-4 border-white"
                  />
                  <div>
                    <p className="text-lg mb-1">نام</p>
                    <Input
                      name="petName"
                      classes={{ className: "text-lg h-10" }}
                    ></Input>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="overflow-y-auto">
                  <div className="h-110 md:h-120 flex justify-start flex-col items-center mb-[3vh] md:mb-[2vh] ">
                    <p className="font-bold text-lg  mt-10 md:mt-5">
                      نوع و نژاد پت شما چیه؟
                    </p>
                    {getSpeciesError && (
                      <div
                        className="bg-red-500/20 text-red-500 text-sm mt-4 rounded-lg w-full px-4 py-2"
                        dir="rtl"
                      >
                        <p>خطای در بارگیری نژاد ها رخ داد!</p>
                      </div>
                    )}
                    <div className="w-full md:mt-13">
                      <PetKindToggleGroup
                        onChange={petKindOnChange}
                        name="petKind"
                        items={[
                          { name: "dog", icon: Dog, value: "سگ" },
                          { name: "cat", icon: Cat, value: "گربه" },
                          { name: "bird", icon: Bird, value: "پرنده" },
                          { name: "rabit", icon: Rabbit, value: "جونده" },
                        ]}
                        className="grid-cols-2 grid grid-rows-2 mt-4 md:h-60"
                      />
                    </div>
                    <div className="w-[90%] mt-10 flex gap-5 justify-between items-center">
                      <p className="text-lg mb-0.5">نژاد</p>
                      <Select name="species">
                        <SelectTrigger className="w-full h-9">
                          <SelectValue placeholder="نژاد پت خود را انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {speciesList.map((item) => (
                              <SelectItem
                                key={item.num}
                                value={item.num.toString()}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="h-110 md:h-120 flex justify-start flex-col items-center mb-[3vh] md:mb-[2vh]">
                  <p className="font-bold text-lg mt-10">دختره یا پسر؟</p>
                  <div className="h-10 md:h-13 my-5">
                    <Toggle
                      text="نمیدونم"
                      checked={genderDontKnow}
                      onCheckedChange={setGenderDontKnow}
                      className="h-full"
                    />
                  </div>
                  <div className="w-full">
                    <PetKindToggleGroup
                      disable={genderDontKnow}
                      name="gender"
                      items={[
                        { name: "male", icon: Mars, value: "پسر" },
                        { name: "femal", icon: Venus, value: "دختر" },
                      ]}
                      className="grid-cols-2 grid"
                    />
                  </div>
                  <p className="font-bold text-lg mt-10">وزنش چقدره؟</p>
                  <div className="h-10 md:h-13 my-5">
                    <Toggle
                      text="نمیدونم"
                      checked={weightDontKnow}
                      onCheckedChange={setWeightDontKnow}
                      className=" h-full"
                    />
                  </div>
                  <div className="h-10">
                    <Input
                      name="weight"
                      disabled={weightDontKnow}
                      classes={{ className: "w-full px-8" }}
                    ></Input>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="h-110 md:h-120 flex justify-start flex-col items-center mb-[3vh] md:mb-[2vh]">
                  <p className="font-bold text-md mt-10">
                    چه تاریخی به دنیا اومده؟
                  </p>
                  <div className="h-10 md:h-13 my-5">
                    <Toggle
                      text="نمیدونم"
                      checked={birthDontKnow}
                      onCheckedChange={setBirthDontKnow}
                      className="h-full"
                    />
                  </div>
                  <div className="flex flex-1 justify-center w-[80%] mt-5 h-50">
                    {birthDontKnow ? (
                      <IsAdultToggleGroup
                        name="isAdult"
                        items={[
                          { name: "false", icon: BabyIcon, value: "نابالغ" },
                          { name: "true", icon: Dog, value: "بالغ" },
                        ]}
                        className="grid grid-cols-2 h-30"
                      />
                    ) : (
                      <PetDatePicker
                        from={10}
                        to={8}
                        relative={true}
                        name="birthDate"
                        smallFontSize="16px"
                        bigFontSize="26px"
                        classes={{
                          containerClassName: "w-20 mt-4",
                          textClassName: "text-xl",
                        }}
                      />
                    )}
                  </div>
                </div>
              </Step>

              <Step>
                <div className="h-110 md:h-120 flex justify-start flex-col items-center mb-[3vh] md:mb-[2vh]">
                  <p className="font-bold text-md mt-10">درباره پت بهم بگو</p>
                  <div className="w-full mt-10">
                    <Textarea
                      rows={9}
                      scrollbarBorderRadius="10px"
                      className="relative drop-shadow-lg py-3"
                      name="aboutPet"
                      placeholder="داروی مصرفی خاص، وضعیت واکسیناسیون، بیماری خاص..."
                    />
                  </div>
                </div>
              </Step>
            </Stepper>
          )}
        </Form>
      )}
    </Formik>
  );
}
