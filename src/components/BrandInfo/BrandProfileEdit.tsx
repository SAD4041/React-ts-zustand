// src/components/BrandInfo/BrandProfileEdit.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { uploadBrandImage } from "@/services/brandService";
import { Input, Textarea } from "@/components/ui/Input";

// Define form values interface
interface BrandFormValues {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  logo: string;
  banner: string;
}

// Validation schema
const validationSchema = Yup.object({
  maket_name: Yup.string().required("نام فروشگاه الزامی است"),
  description: Yup.string().max(500, "حداکثر 500 کاراکتر مجاز است").required("درباره فروشگاه الزامی است"),
  mobile: Yup.string()
    .matches(/^09\d{9}$/, "شماره تلفن باید معتبر و با 09 شروع شود")
    .required("شماره تماس الزامی است"),
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
});

interface BrandProfileEditProps {
  brandData: BrandFormValues;
  onSave: (values: BrandFormValues) => Promise<void>;
}

const BrandProfileEdit = ({ brandData, onSave }: BrandProfileEditProps) => {
  const formik = useFormik<BrandFormValues>({
    initialValues: {
      maket_name: brandData?.maket_name || "",
      description: brandData?.description || "",
      mobile: brandData?.mobile || "",
      email: brandData?.email || "",
      address: brandData?.address || "",
      logo: brandData?.logo || "/placeholder-logo.png", // ⚠️ placeholder
      banner: brandData?.banner || "/placeholder-banner.png", // ⚠️ placeholder
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleImageUpload = async (file: File, type: "logo" | "banner") => {
    try {
      const res = await uploadBrandImage(file, type);
      formik.setFieldValue(type, res.url || res.data?.url || res); // fallback برای انواع ریسپانس
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-2xl shadow">
      {/* عنوان بالای صفحه */}
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
        مدیریت اطلاعات برند — {formik.values.maket_name}
      </h2>

      {/* فرم */}
      <form onSubmit={formik.handleSubmit}>
        {/* کارت اطلاعات */}
        <div className="bg-muted/30 p-6 rounded-xl shadow-sm border border-border">
          {/* لوگو */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={formik.values.logo || "/placeholder-logo.png"}
              alt="لوگوی برند"
              className="w-28 h-28 rounded-full object-cover border-2 border-border"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0], "logo");
                }
              }}
            />
          </div>

          {/* فیلدهای اطلاعاتی */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="نام فروشگاه"
              name="maket_name"
              value={formik.values.maket_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.maket_name && formik.errors.maket_name ? formik.errors.maket_name : undefined}
            />

            <div className="sm:col-span-2">
              <Textarea
                label="درباره فروشگاه"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && formik.errors.description ? formik.errors.description : undefined}
                className="h-28"
              />
            </div>

            <Input
              label="شماره تماس"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : undefined}
            />

            <Input
              label="ایمیل"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
            />

            <div className="sm:col-span-2">
              <Input
                label="آدرس"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && formik.errors.address ? formik.errors.address : undefined}
              />
            </div>
          </div>

          {/* بنر */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-2">بنر فروشگاه</label>
            <img
              src={formik.values.banner || "/placeholder-banner.png"}
              alt="بنر فروشگاه"
              className="w-full rounded-xl mt-2 object-cover h-40 border border-border"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-3 text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0], "banner");
                }
              }}
            />
          </div>

          {/* دکمه ذخیره */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full mt-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:opacity-50 transition"
          >
            {formik.isSubmitting ? "در حال ذخیره..." : "اعمال تغییرات"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandProfileEdit;