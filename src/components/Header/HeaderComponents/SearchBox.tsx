import { Formik, Form } from "formik";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values) => {
        const term = values.query.trim();
        if (term) {
          navigate(`/product-list?q=${encodeURIComponent(term)}`);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="relative">
          <Input
            name="query"
            placeholder="جست‌وجوی محصولات"
            icon={Search}
            iconClassName="right-3"
            containerClassName="relative"
            inputClassName="
              bg-background rounded-full py-2 px-10 text-xs pr-7
              focus:outline-none focus:ring-2 focus:ring-ring-primary-subtle
              w-50 md:w-48 lg:w-90
              text-foreground placeholder-muted-foreground
            "
          />
          <button
            type="submit"
            className="absolute inset-y-0 left-2 flex items-center px-2 text-muted-foreground hover:text-primary"
            aria-label="جستجو"
          >
            <Search className="w-4 h-4" />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBox;
