import { useFormik, FormikProvider } from "formik";
import { uploadProfileImage, uploadBannerImage } from "@/services/brandUpload";
import type { BrandFormValues, BrandProfileEditProps } from "@/types/brandProfileTypes";
import { ValidationSchema } from "@/schemas/brandValidationSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/Custom/CustomTextArea";
import { resolveImageUrl } from "@/utils/imageUrl";

const preloadImage = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Image failed to load"));
    img.src = src;
  });

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
    const fieldName = `${type}Url` as "logoUrl" | "bannerUrl";
    const prevUrl = formik.values[fieldName];
    const previewUrl = URL.createObjectURL(file);
    let shouldRevokePreview = false;

    formik.setFieldValue(fieldName, previewUrl);

    try {
      const res =
        type === "logo"
          ? await uploadProfileImage(file)
          : await uploadBannerImage(file);

      const nextUrl =
        type === "logo" ? res.logo ?? res.url : res.baner ?? res.banner ?? res.url;
      const resolvedUrl = resolveImageUrl(nextUrl);

      if (resolvedUrl) {
        try {
          await preloadImage(resolvedUrl);
          formik.setFieldValue(fieldName, resolvedUrl);
          shouldRevokePreview = true;
        } catch (loadError) {
          console.warn("Uploaded image URL failed to load, keeping preview.", loadError);
        }
      }
    } catch (err) {
      formik.setFieldValue(fieldName, prevUrl);
      shouldRevokePreview = true;
      console.error(`Image upload failed for ${type}`, err);
    } finally {
      if (shouldRevokePreview) {
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto rtl px-4 sm:px-6 lg:px-0 pt-6 sm:pt-8">

        {/* --- Top Profile Header --- */}
        <div className="flex flex-row justify-start items-center sm:items-start mb-4 sm:mb-6 gap-4 mx-2 sm:mx-0 ">
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

          <div className="flex flex-col items-start text-right">
            <h3 className="font-extrabold text-foreground text-xl">
              {formik.values.brand || "نام برند"}
            </h3>
            <p className="text-muted-foreground text-sm mt-0.5">
              مدیریت اطلاعات برند
            </p>
          </div>
        </div>

        {/* --- Card --- */}
        <div className="bg-card rounded-[11px] border border-border p-5 sm:p-8 shadow-lg mx-2 sm:mx-0">
          <div className="flex justify-between items-center mb-6 sm:mb-10">
            <h2 className="text-2xl font-bold text-foreground">اطلاعات برند</h2>
          </div>

          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-6 sm:mb-8">

                {/* Logo */}
                <div className="flex flex-col items-center">
                  <label className="font-bold mb-4 text-foreground text-xl">لوگو برند</label>

                  <div className="mb-4 sm:mb-6">
                    {formik.values.logoUrl ? (
                      <img
                        src={formik.values.logoUrl}
                        // alt="Logo"
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-muted flex items-center justify-center text-muted-foreground border border-border">
                        <span className="text-4xl">📷</span>
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer">
                    <span className="inline-flex w-full sm:w-auto justify-center bg-secondary hover:bg-secondary/90 text-card-text px-10 py-2 rounded-[30px] text-base font-medium transition-colors">
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

                  <div className="w-full h-32 sm:h-40 rounded-[11px] bg-muted overflow-hidden mb-4 flex items-center justify-center border border-border">
                    {formik.values.bannerUrl ? (
                      <img
                        src={formik.values.bannerUrl}
                        // alt="Banner"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                        <span className="text-4xl">🖼️</span>
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer">
                    <span className="inline-flex w-full sm:w-auto justify-center bg-secondary hover:bg-secondary/90 text-card-text px-12 py-2 rounded-[30px] text-base font-medium transition-colors">
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

              <div className="border-t border-border my-8 sm:my-10"></div>
              <div className="space-y-6 sm:space-y-8">

                {/* Brand Name */}
                <Input
                  label="نام برند"
                  name="brand"
                  placeholder="نام کامل برند یا فروشگاه"
                  inputClassName="h-14 rounded-[11px] bg-muted border-border"
                  forceRTL
                />

                {/* Description */}
                <Textarea
                  label="درباره برند"
                  name="description"
                  rows={5}
                  placeholder="توضیحاتی درباره فعالیت‌ها و محصولات برند شما"
                  className="rounded-[11px] bg-muted border-border resize-y"
                />

                {/* Mobile + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <Input
                    label="تلفن تماس"
                    name="mobile"
                    placeholder="09xxxxxxxxx"
                    inputClassName="h-14 rounded-[11px] bg-muted border-border"
                    forceRTL
                  />

                  <Input
                    label="ایمیل"
                    name="email"
                    type="email"
                    placeholder="example@domain.com"
                    inputClassName="h-14 rounded-[11px] bg-muted border-border"
                    forceRTL
                  />
                </div>

                {/* Address */}
                <Textarea
                  label="آدرس"
                  name="address"
                  rows={3}
                  placeholder="آدرس کامل فیزیکی برند/فروشگاه"
                  className="rounded-[11px] bg-muted border-border resize-y"
                />
              </div>

              {/* Submit */}
              <div className="mt-10 sm:mt-12 flex justify-center sm:justify-start" dir="ltr">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-card-text px-8 py-3 rounded-[30px] font-bold text-lg transition-colors sm:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default BrandProfileEdit;
