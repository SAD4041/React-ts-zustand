// src/components/BrandInfo/BrandProfileEdit.tsx
import { useEffect, useState } from "react";
import { uploadBrandImage } from "@/services/brandService";

const BrandProfileEdit = ({ brandData, onSave }: any) => {
  const [form, setForm] = useState(brandData);

  useEffect(() => {
    setForm(brandData);
  }, [brandData]);

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (file: File, type: "logo" | "banner") => {
    const res = await uploadBrandImage(file, type);
    setForm((prev: any) => ({ ...prev, [`${type}Url`]: res.url }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">

      {/* عنوان بالای صفحه */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        مدیریت اطلاعات برند — {form.brandName}
      </h2>

      {/* کارت اطلاعات */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">

        {/* لوگو */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={form.logoUrl}
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

        {/* فیلدهای اطلاعاتی */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label>نام فروشگاه</label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label>نام برند (نمایشی)</label>
            <input
              value={form.brandName}
              onChange={(e) => handleChange("brandName", e.target.value)}
              className="input"
            />
          </div>

          <div className="sm:col-span-2">
            <label>درباره برند</label>
            <textarea
              value={form.about}
              onChange={(e) => handleChange("about", e.target.value)}
              className="input h-28"
            ></textarea>
          </div>

          <div>
            <label>شماره تماس</label>
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label>ایمیل</label>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="input"
            />
          </div>

          <div className="sm:col-span-2">
            <label>آدرس</label>
            <input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* بنر */}
        <div className="mt-6">
          <label>بنر برند</label>
          <img
            src={form.bannerUrl}
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

        {/* دکمه ذخیره */}
        <button
          onClick={() => onSave(form)}
          className="btn-primary w-full mt-6"
        >
          اعمال تغییرات
        </button>
      </div>
    </div>
  );
};

export default BrandProfileEdit;

