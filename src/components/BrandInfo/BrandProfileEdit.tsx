// src/components/BrandInfo/BrandProfileEdit.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadBrandImage } from "@/services/brandService";

interface BrandFormValues {
  maket_name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  logoUrl: string;
  bannerUrl: string;
}

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
      logoUrl: brandData?.logoUrl || "/placeholder-logo.png",
      bannerUrl: brandData?.bannerUrl || "/placeholder-banner.png",
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
      formik.setFieldValue(`${type}Url`, res.url);
    } catch (err) {
      console.error(`آپلود ${type} ناموفق بود:`, err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        مدیریت اطلاعات برند — {formik.values.maket_name}
      </h2>

      {/* ✅ فرم اضافه شد */}
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <img
              src={formik.values.logoUrl}
              className="w-28 h-28 rounded-full object-cover"
            />
            <input
              type="file"
              className="mt-3"
              onChange={(e) =>
                e.target.files &&
                handleImageUpload(e.target.files[0], "logo")
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label>نام فروشگاه</label>
              <input
                name="maket_name"
                value={formik.values.maket_name}
                onChange={formik.handleChange}
                className="input"
              />
              {formik.touched.maket_name && formik.errors.maket_name && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.maket_name}</div>
              )}
            </div>

            <div>
              <label>نام برند (نمایشی)</label>
              <input
                name="maket_name"
                value={formik.values.maket_name}
                onChange={formik.handleChange}
                className="input"
              />
              {formik.touched.maket_name && formik.errors.maket_name && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.maket_name}</div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label>درباره برند</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="input h-28"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
              )}
            </div>

            <div>
              <label>شماره تماس</label>
              <input
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                className="input"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.mobile}</div>
              )}
            </div>

            <div>
              <label>ایمیل</label>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="input"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label>آدرس</label>
              <input
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="input"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.address}</div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label>بنر برند</label>
            <img
              src={formik.values.bannerUrl}
              className="w-full rounded-xl mt-2 object-cover h-40"
            />
            <input
              type="file"
              className="mt-3"
              onChange={(e) =>
                e.target.files &&
                handleImageUpload(e.target.files[0], "banner")
              }
            />
          </div>

          {/* ✅ تغییر: دکمه submit شد */}
          <button
            type="submit"
            className="btn-primary w-full mt-6"
          >
            اعمال تغییرات
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandProfileEdit;