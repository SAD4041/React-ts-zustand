import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values) => {
        if (values.query.trim()) {
          console.log("has been searched", values.query);
        }
      }}
    >
      <Form>
        <Input
          name="query"
          placeholder="جست‌وجوی محصولات"
          icon={Search}
          iconClassName="right-3"
          containerClassName="relative"
          inputClassName="
            bg-background rounded-full py-2 px-10 text-xs pr-7
            focus:outline-none focus:ring-2 focus:ring-ring-primary-subtle
            w-60 md:w-48 lg:w-90
            text-foreground placeholder-muted-foreground
          "
        />
      </Form>
    </Formik>
  );
};

export default SearchBox;
