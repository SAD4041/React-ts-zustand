import { useFormik } from "formik";
import { uploadBrandImage } from "@/services/brandService";
import type { BrandFormValues, BrandProfileEditProps } from "@/types/brandProfileTypes";
import { ValidationSchema } from "@/schemas/brandValidationSchema";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/Custom/CustomTextArea";

const BrandProfileEdit = ({ brandData, onSave }: BrandProfileEditProps) => {
  const formik = useFormik<BrandFormValues>({
    initialValues: brandData,
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleImageUpload = async (file: File, type: "logo" | "banner") => {
    try {
      const res = await uploadBrandImage(file, type);
      formik.setFieldValue(`${type}Url`, res.url);
    } catch (err) {
      console.error(`آپلود ${type} ناموفق بود`, err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto rtl">

        {/* --- Top Profile Header --- */}
        <div className="flex justify-start items-start mb-6 gap-4">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden shrink-0">
            {formik.values.logoUrl ? (
              <img
                src={formik.values.logoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-semibold">
                LOGO
              </div>
            )}
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-extrabold text-foreground text-xl">
              {formik.values.maket_name || "نام برند"}
            </h3>
            <p className="text-muted-foreground text-sm mt-0.5">
              مدیریت اطلاعات برند
            </p>
          </div>
        </div>

        {/* --- Card --- */}
        <div className="bg-card rounded-lg border border-border p-8 shadow-md">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">اطلاعات برند</h2>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">

              {/* Logo */}
              <div className="flex flex-col items-center">
                <label className="font-bold mb-4 text-foreground text-xl">لوگو برند</label>

                <div className="mb-6">
                  {formik.values.logoUrl ? (
                    <img
                      src={formik.values.logoUrl}
                      alt="Logo"
                      className="w-40 h-40 rounded-full object-cover shadow-lg border border-border"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center text-muted-foreground border border-border">
                      <span className="text-4xl">📷</span>
                    </div>
                  )}
                </div>

                <label className="cursor-pointer">
                  <span className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-2 rounded-full text-base font-medium transition-colors shadow-lg">
                    تغییر لوگو برند
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && handleImageUpload(e.target.files[0], "logo")
                    }
                  />
                </label>
              </div>

              {/* Banner */}
              <div className="flex flex-col items-center">
                <label className="font-bold mb-4 text-foreground text-xl">بنر برند</label>

                <div className="w-full h-40 rounded-xl bg-muted overflow-hidden mb-4 flex items-center justify-center border border-border">
                  {formik.values.bannerUrl ? (
                    <img
                      src={formik.values.bannerUrl}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      <span className="text-4xl">🖼️</span>
                    </div>
                  )}
                </div>

                <label className="cursor-pointer">
                  <span className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-2 rounded-full text-base font-medium transition-colors shadow-lg">
                    آپلود بنر
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && handleImageUpload(e.target.files[0], "banner")
                    }
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-border my-10"></div>
            <div className="space-y-8">

              {/* Brand Name */}
              <Input
                label="نام برند"
                name="maket_name"
                placeholder="نام کامل برند یا فروشگاه"
                className="h-14 rounded-xl bg-muted border-border"
              />

              {/* Description */}
              <Textarea
                label="درباره برند"
                name="description"
                rows={5}
                placeholder="توضیحاتی درباره فعالیت‌ها و محصولات برند شما"
                className="rounded-xl bg-muted border-border resize-none"
              />

              {/* Mobile + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                  label="تلفن تماس"
                  name="mobile"
                  placeholder="09xxxxxxxxx"
                  className="h-14 rounded-xl bg-muted border-border"
                />

                <Input
                  label="ایمیل"
                  name="email"
                  type="email"
                  placeholder="example@domain.com"
                  className="h-14 rounded-xl bg-muted border-border"
                />
              </div>

              {/* Address */}
              <Textarea
                label="آدرس"
                name="address"
                rows={3}
                placeholder="آدرس کامل فیزیکی برند/فروشگاه"
                className="rounded-xl bg-muted border-border resize-none"
              />
            </div>

            {/* Submit */}
            <div className="mt-12 flex justify-start" dir="ltr">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-secondary hover:bg-secondary/90 text-primary-foreground px-8 py-3 rounded-xl font-bold text-lg transition-colors shadow-xl min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formik.isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandProfileEdit;
