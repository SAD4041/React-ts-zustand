import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";
import { Textarea } from "@/components/Custom/Textarea/Textarea";

import { MultiStage } from "@/components/PetSitterSignup/MultiStage/MultiStage";
import { useDesktop, useMobile, useTablet } from "@/hooks/ResponsiveHooks";
import adjustInputDirection from "@/utils/adjustInputDirection";
import { Form, Formik } from "formik";
//import * as Yup from "yup";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Custom/Select/Select";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { PetDatePicker } from "@/components/Custom/PetDatePicker/PetDatePicker";
import { BabyIcon, Bird, Cat, Dog } from "lucide-react";
import IsAdultToggleGroup from "@/components/PetRegister/IsAdultToggleGroup";
import PetKindToggleGroup from "@/components/PetRegister/PetKindToggleGroup";

import Toggle from "@/components/Custom/Toggle/Toggle";
import { useState } from "react";
import * as Yup from "yup";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Custom/Tabs/Tabs";
import Address from "@/components/Custom/Address/Address";
import { LocationSelector } from "@/components/Custom/Province/LocationSelector";
import { Province } from "@/components/Custom/Province/Province";
import { City } from "@/components/Custom/Province/City";
import PetToggleGroup from "@/components/Booking/PetOwner/PetToggleGroup";
import ServiceToggleGroup from "@/components/Booking/PetOwner/ServiceToggleGroup";
import ToggleGroupField from "@/components/Booking/PetOwner/ToggleGroupField";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل معتبر نمی باشد")
    .required("ایمیل اجباری است"),
  password: Yup.string()
    .min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
    .required("رمز عبور اجباری است"),
  akhoond: Yup.string()
    .min(6, "پسورد باید حداقل 6 کاراکتر باشد یسبشس سبسی بشسب")
    .required("رمز عبور اجباری است"),
});

function Test() {
  const isDesktop = useDesktop();
  const isMobile = useMobile();
  const isTablet = useTablet();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={{
          email: "",
          akhoond: "2",
          password: "he",
          love: false,
        }}
        //validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form values:", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6 border rounded flex flex-col gap-4 items-center w-200">
            <Select name="akhoond">
              <SelectTrigger className="w-30">
                <SelectValue placeholder="روز" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"1"}>1</SelectItem>
                  <SelectItem value={"2"}>2</SelectItem>
                  <SelectItem value={"3"}>3</SelectItem>
                  <SelectItem value={"4"}>4</SelectItem>
                  <SelectItem value={"5"}>5</SelectItem>
                  <SelectItem value={"6"}>6</SelectItem>
                  <SelectItem value={"7"}>7</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <PetToggleGroup
              name="doost"
              values={["nigga", "what"]}
              titles={["oh wow", "crazy"]}
            />
            <ServiceToggleGroup
              name="doost2"
              values={["nigga", "what"]}
              titles={["oh wow", "crazy"]}
            />

            <div className="mt-5 w-50">
              <Input
                name="email"
                shadow={true}
                classes={{
                  className: "h-20",
                  inputClassName: "!text-[20px]",
                  errorClassName: "px-5",
                }}
                type="email"
                placeholder="ایمیل"
              />
            </div>

            <div className="w-35">
              <DatePicker className="h-15 !text-[35px]" name="akhoond2" />
            </div>

            <div className="mt-5 w-50">
              <Input
                name="password"
                shadow={true}
                classes={{
                  className: "h-20",
                  errorClassName: "px-5",
                  inputClassName: "!text-[45px]",
                }}
                onChangeWrappers={[adjustInputDirection]}
                type="password"
                placeholder="ایمیل"
              />
            </div>

            <LocationSelector>
              <Province />
              <City />
            </LocationSelector>
            <Address />

            <PetDatePicker
              from={10}
              to={8}
              relative={true}
              name="niceone"
              smallFontSize="20px"
              bigFontSize="30px"
            />

            <Checkbox
              name="love"
              classes={{ textClassName: "text-[17px]" }}
              text={"آقا عشق"}
            />

            <Checkbox
              name="love2"
              classes={{ textClassName: "text-[17px]" }}
              text={"آقا عشق"}
            />

            <Checkbox
              name="love3"
              classes={{
                className: "mt-5",
                backGroundClassName: "!border-5",
                textClassName: "text-[17px]",
              }}
              size="30px"
              text={"آقا عشق"}
            />

            <Checkbox
              name="love4"
              classes={{
                className: "mt-5 bg-red-500",
                backGroundClassName: "!border-5",
                textClassName: "text-[17px] font-bold",
              }}
              size="15px"
              text={"آقا عشق"}
            />

            <div className="px-5 w-full">
              <Textarea
                rows={6}
                scrollbarBorderRadius="10px"
                className="relative drop-shadow-lg py-3"
                name="betterakhoond"
              />
            </div>

            <Button
              type="submit"
              size={"giant"}
              variant={"outline"}
              shadow={false}
              boxShadow={true}
              bold={true}
              isLoading={isSubmitting}
              className="mb-3"
            >
              ورود
            </Button>
          </Form>
        )}
      </Formik>

      {isDesktop && <p> desktop mode</p>}
      {isMobile && <p> mobile mode</p>}
      {isTablet && <p> tablet mode</p>}

      <Button shadow={true} size={"giant"} bold={true}>
        ورود
      </Button>

      <br />
      <br />

      <Button isLoading={true} shadow={true} size={"giant"} bold={true}>
        ورود
      </Button>

      <br />
      <br />

      <Button
        isLoading={true}
        loadingClassName="!size-8"
        shadow={true}
        size={"giant"}
        bold={true}
      >
        ورود
      </Button>

      <br />
      <br />
      <br />
      <br />

      <Button variant={"link"} shadow={false} bold={true}>
        فراموشی رمز عبور
      </Button>

      <MultiStage>
        <MultiStage.Header>
          <MultiStage.StageHeader index={0}>
            بررسی اطلاعات
          </MultiStage.StageHeader>
          <MultiStage.StageHeader index={1}>مدارک</MultiStage.StageHeader>
          <MultiStage.StageHeader index={2}>بیوگرافی</MultiStage.StageHeader>
        </MultiStage.Header>

        <MultiStage.StageHolder>
          <MultiStage.Stage index={0}>
            <p>Account form goes here</p>
          </MultiStage.Stage>

          <MultiStage.Stage index={1}>
            <p>Profile form goes here</p>
          </MultiStage.Stage>
        </MultiStage.StageHolder>
      </MultiStage>

      <Formik
        initialValues={{ isAdult: "false", petKind: "dog" }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <IsAdultToggleGroup
            name="isAdult"
            items={[
              { name: "false", icon: BabyIcon, value: "جوجه" },
              { name: "true", icon: Dog, value: "بالغ" },
            ]}
          />

          <PetKindToggleGroup
            name="petKind"
            items={[
              { name: "dog", icon: Dog, value: "سگ" },
              { name: "cat", icon: Cat, value: "گربه" },
              { name: "bird", icon: Bird, value: "پرنده" },
            ]}
          />
        </Form>
      </Formik>

      {/* FIXED: Removed the extra broken MultiStage.StageHolder */}

      <Toggle
        className="mb-10"
        text="نمیدونم"
        checked={isChecked}
        onCheckedChange={() => setIsChecked((checked) => !checked)}
      />

      {isChecked && <p>salllaaam</p>}

      <div className="flex w-200 flex-col gap-6">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account" number={3}>
              رزرو های فعال
            </TabsTrigger>
            <TabsTrigger value="password" number={1}>
              رزرو های گذشته
            </TabsTrigger>
            <TabsTrigger value="salam">رزرو های گذشته</TabsTrigger>
          </TabsList>
          <TabsContent value="account">salam</TabsContent>
          <TabsContent value="password">naaaaa</TabsContent>
          <TabsContent value="salam">naaaaa</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Test;
