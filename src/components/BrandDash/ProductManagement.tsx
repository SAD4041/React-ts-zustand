import { useEffect, useState, useRef } from "react";
import {
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "@/services/productService";

import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/productTypes";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input"; 
import { Label } from "../ui/label";
import { Textarea } from "../Custom/CustomTextArea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Edit2, Trash2, Grid, List, Search } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Formik, Form, Field } from "formik";
import { categoryLabels } from "@/data/productListingData";

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Refs for file inputs
  const addImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  const initialValues: CreateProductPayload = {
    name: "",
    brand: "",
    category: "",
    color: "",
    sex: "",
    model: "",
    sku: "",
    price: 0,
    stock: 0,
    description: "",
    images: [],
    imageFiles: [],
    imageFilePreviews: [],
    status: "active", // Default status for new products
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const appendImages = async (
    files: FileList | null,
    setFieldValue: (field: string, value: unknown) => void,
    values: CreateProductPayload
  ) => {
    if (!files || files.length === 0) return;
    const uploaded = await Promise.all(
      Array.from(files).map(async (file) => ({
        file,
        preview: await readFileAsDataUrl(file).catch(() => ""),
      }))
    );
    const valid = uploaded.filter((item) => item.preview);
    if (valid.length === 0) return;

    const nextImages = [...(values.images ?? []), ...valid.map((item) => item.preview)];
    const nextFiles = [...(values.imageFiles ?? []), ...valid.map((item) => item.file)];
    const nextFilePreviews = [
      ...(values.imageFilePreviews ?? []),
      ...valid.map((item) => item.preview),
    ];

    setFieldValue("images", nextImages);
    setFieldValue("imageFiles", nextFiles);
    setFieldValue("imageFilePreviews", nextFilePreviews);
  };

  const removeImageAt = (
    index: number,
    setFieldValue: (field: string, value: unknown) => void,
    values: CreateProductPayload
  ) => {
    const removedPreview = values.images?.[index];
    const nextImages = (values.images ?? []).filter((_, i) => i !== index);
    setFieldValue("images", nextImages);

    if (!removedPreview) return;

    const filePreviews = values.imageFilePreviews ?? [];
    const fileIndex = filePreviews.indexOf(removedPreview);
    if (fileIndex === -1) return;

    const nextFiles = (values.imageFiles ?? []).filter((_, i) => i !== fileIndex);
    const nextFilePreviews = filePreviews.filter((_, i) => i !== fileIndex);
    setFieldValue("imageFiles", nextFiles);
    setFieldValue("imageFilePreviews", nextFilePreviews);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsService();
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductService(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateProduct = async (
    id: string,
    payload: UpdateProductPayload
  ) => {
    const updated = await updateProductService(id, payload);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  const normalizeCategoryValue = (category: string) => {
    if (!category) return "";
    const match = Object.entries(categoryLabels).find(
      ([, label]) => label === category
    );
    return match ? match[0] : category;
  };

  // ✅ UPDATED: Now includes status
  const getEditInitialValues = (product: Product): CreateProductPayload => ({
    name: product.name ?? "",
    brand: product.brand ?? "",
    category: normalizeCategoryValue(product.category ?? ""),
    color: product.color ?? "",
    sex: product.sex ?? "",
    model: product.model ?? "",
    sku: product.sku ?? "",
    price: product.price ?? 0,
    stock: product.stock ?? 0,
    description: product.description ?? "",
    images: product.images ?? [],
    imageFiles: [],
    imageFilePreviews: [],
    status: product.status ?? "active", 
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = normalizedSearch
    ? products.filter((product) => {
        const fields = [
          product.name,
          product.category,
          categoryLabels[product.category],
          product.sku,
          product.brand,
          product.color,
          product.price,
          product.stock,
        ];
        return fields.some((field) =>
          String(field ?? "").toLowerCase().includes(normalizedSearch)
        );
      })
    : products;
    
  const categoryOptions = Object.entries(categoryLabels);
  const getCategoryLabel = (category: string) =>
    categoryLabels[category] ?? category;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 py-8 lg:px-8 py-10">
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="mb-4 flex items-center gap-3" dir="rtl">
          <img
            src="/avatar.png"
            className="w-10 h-10 rounded-full"
            alt="brand"
          />
          <div className="text-right">
            <div className="font-bold">نام برند</div>
            <div className="text-xs text-muted-foreground">
              مدیریت محصولات، موجودی و قیمت‌ها
            </div>
          </div>
        </div>

        {/* Action Bar: Add Product & Search */}
        <div className="flex flex-col mb-4 items-end justify-between">
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 ml-2" />
                افزودن محصول جدید
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>افزودن محصول جدید</DialogTitle>
                <DialogDescription>
                  اطلاعات محصول جدید را وارد کنید
                </DialogDescription>
              </DialogHeader>

              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { resetForm }) => {
                  const res = await createProductService(values);
                  setProducts((prev) => [res.product, ...prev]);
                  resetForm();
                  setIsDialogOpen(false);
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form id="create-product-form">
                    <Tabs defaultValue="details" className="w-full" dir="rtl">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">جزئیات</TabsTrigger>
                        <TabsTrigger value="images">تصاویر</TabsTrigger>
                        <TabsTrigger value="inventory">موجودی</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4 mt-4" dir="rtl">
                        <div className="space-y-2">
                          <Input name="brand" label="برند" placeholder="نام برند را وارد کنید" />
                        </div>
                        <div className="space-y-2">
                          <Input name="color" label="رنگ‌ها" placeholder="لیست رنگ‌ها را وارد کنید" />
                        </div>
                        <div className="space-y-2">
                          <Input name="name" label="نام محصول" placeholder="نام محصول را وارد کنید" forceRTL />
                        </div>
                        <div className="space-y-2">
                          <Label>دسته‌بندی</Label>
                          <Field
                            as="select"
                            name="category"
                            dir="rtl"
                            className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                          >
                            <option value="" disabled>دسته‌بندی</option>
                            {categoryOptions.map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="space-y-2">
                          <Label>جنسیت</Label>
                          <Field
                            as="select"
                            name="sex"
                            dir="rtl"
                            className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                          >
                            <option value="" disabled>جنسیت را انتخاب کنید</option>
                            <option value="male">مردانه</option>
                            <option value="female">زنانه</option>
                            <option value="unisex">یونیسکس</option>
                          </Field>
                        </div>
                        <div className="space-y-2">
                          <Label>استایل</Label>
                          <Field
                            as="select"
                            name="model"
                            dir="rtl"
                            className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                          >
                            <option value="" disabled>استایل را انتخاب کنید</option>
                            <option value="casual">کژوال</option>
                            <option value="formal">رسمی</option>
                            <option value="classic">کلاسیک</option>
                            <option value="street">استریت</option>
                          </Field>
                        </div>
                        <div className="space-y-2">
                          <Input name="sku" label="کد محصول (SKU)" placeholder="مثال: WD-001" forceRTL />
                        </div>
                        <div className="space-y-2">
                          <Input name="price" label="قیمت (تومان)" type="text" onlyNumbers />
                        </div>
                        <div className="space-y-2">
                          <Label>توضیحات</Label>
                          <Textarea name="description" placeholder="توضیحات محصول..." />
                        </div>
                      </TabsContent>

                      <TabsContent value="images" className="space-y-4 mt-4">
                        <div
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                          onClick={() => addImageInputRef.current?.click()}
                        >
                          <input
                            ref={addImageInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={async (event) => {
                              await appendImages(
                                event.currentTarget.files,
                                setFieldValue,
                                values
                              );
                              event.currentTarget.value = "";
                            }}
                          />
                          <p className="text-muted-foreground mb-4">
                            تصاویر محصول را بکشید و رها کنید
                          </p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={(e) => {
                                e.stopPropagation();
                                addImageInputRef.current?.click();
                            }}
                          >
                            انتخاب فایل
                          </Button>
                        </div>

                        {values.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {values.images.map((image, index) => (
                              <div key={`${image}-${index}`} className="relative overflow-hidden rounded-lg border border-border">
                                <img src={image} alt={`upload-${index}`} className="h-28 w-full object-cover" />
                                <button
                                  type="button"
                                  className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    removeImageAt(index, setFieldValue, values);
                                  }}
                                >
                                  حذف
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="inventory" className="space-y-4 mt-4" dir="rtl">
                        <div className="space-y-2">
                          <Input name="stock" label="تعداد موجودی" type="number" placeholder="۰" />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        انصراف
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        ذخیره محصول
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>

            <div className="relative w-64 sm:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.preventDefault();
                }}
                dir="rtl"
                placeholder="محصول خود را جستجو کنید"
                className="w-full rounded-full border border-input/60 bg-muted/60 py-2.5 pr-12 pl-4 text-sm text-foreground shadow-inner placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Edit Modal */}
        {editingProduct && (
          <Dialog
            open={isEditOpen}
            onOpenChange={(open) => {
              setIsEditOpen(open);
              if (!open) setEditingProduct(null);
            }}
          >
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>ویرایش محصول</DialogTitle>
                <DialogDescription>اطلاعات محصول را ویرایش کنید</DialogDescription>
              </DialogHeader>

              <Formik
                enableReinitialize
                initialValues={getEditInitialValues(editingProduct)}
                onSubmit={async (values) => {
                  await handleUpdateProduct(editingProduct.id, values);
                  setIsEditOpen(false);
                  setEditingProduct(null);
                }}
              >
                {({ setFieldValue, values }) => (
                  <Form id="edit-product-form">
                    <Tabs defaultValue="details" className="w-full" dir="rtl">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">جزئیات</TabsTrigger>
                        <TabsTrigger value="images">تصاویر</TabsTrigger>
                        <TabsTrigger value="inventory">موجودی</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="mt-4" dir="rtl">
                        <div className="space-y-4">
                          {/* Name - Full width */}
                          <div className="space-y-2">
                            <Input name="name" label="نام محصول" placeholder="نام محصول را وارد کنید" forceRTL />
                          </div>

                          {/* Responsive Grid for other fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Input name="brand" label="برند" placeholder="نام برند را وارد کنید" />
                            </div>
                            <div className="space-y-2">
                              <Input name="color" label="Color" placeholder="رنگ‌ها را وارد کنید" />
                            </div>
                            <div className="space-y-2">
                              <Label>دسته‌بندی</Label>
                              <Field
                                as="select"
                                name="category"
                                dir="rtl"
                                className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                              >
                                <option value="" disabled>دسته‌بندی</option>
                                {categoryOptions.map(([value, label]) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <div className="space-y-2">
                                <Label>جنسیت</Label>
                                <Field
                                    as="select"
                                    name="sex"
                                    dir="rtl"
                                    className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                                >
                                    <option value="" disabled>جنسیت را انتخاب کنید</option>
                                    <option value="male">مردانه</option>
                                    <option value="female">زنانه</option>
                                    <option value="unisex">یونیسکس</option>
                                </Field>
                            </div>

                            <div className="space-y-2">
                                <Label>استایل</Label>
                                <Field
                                    as="select"
                                    name="model"
                                    dir="rtl"
                                    className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                                >
                                    <option value="" disabled>استایل را انتخاب کنید</option>
                                    <option value="casual">کژوال</option>
                                    <option value="formal">رسمی</option>
                                    <option value="classic">کلاسیک</option>
                                    <option value="street">استریت</option>
                                </Field>
                            </div>

                            {/* ✅ NEW: Status Field (Responsive) */}
                            <div className="space-y-2">
                                <Label>وضعیت</Label>
                                <Field
                                    as="select"
                                    name="status"
                                    dir="rtl"
                                    className="w-full px-4 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition text-right"
                                >
                                    <option value="active">فعال</option>
                                    <option value="inactive">غیرفعال</option>
                                </Field>
                            </div>

                            <div className="space-y-2">
                              <Input name="sku" label="کد محصول (SKU)" placeholder="مثال: WD-001" forceRTL />
                            </div>

                            <div className="space-y-2">
                              <Input name="price" label="قیمت (تومان)" type="text" onlyNumbers />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>توضیحات</Label>
                            <Textarea name="description" placeholder="توضیحات محصول..." />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="images" className="space-y-4 mt-4">
                        <div
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                          onClick={() => editImageInputRef.current?.click()}
                        >
                          <input
                            ref={editImageInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={async (event) => {
                              await appendImages(
                                event.currentTarget.files,
                                setFieldValue,
                                values
                              );
                              event.currentTarget.value = "";
                            }}
                          />
                          <p className="text-muted-foreground mb-4">تصاویر محصول را بکشید و رها کنید</p>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                editImageInputRef.current?.click();
                            }}
                          >
                            انتخاب فایل
                          </Button>
                        </div>

                        {values.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {values.images.map((image, index) => (
                              <div key={`${image}-${index}`} className="relative overflow-hidden rounded-lg border border-border">
                                <img src={image} alt={`upload-${index}`} className="h-28 w-full object-cover" />
                                <button
                                  type="button"
                                  className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    removeImageAt(index, setFieldValue, values);
                                  }}
                                >
                                  حذف
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="inventory" className="space-y-4 mt-4" dir="rtl">
                        <div className="space-y-2">
                          <Input name="stock" label="تعداد موجودی" type="number" placeholder="۰" />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); setEditingProduct(null); }}>
                        انصراف
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        ذخیره تغییرات
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        )}

        {/* Product List Table */}
        {viewMode === "list" ? (
          <Card className="overflow-hidden">
            <Table className="max-auto" dir="rtl">
              <TableHeader>
                <TableRow>
                  <TableHead>محصول</TableHead>
                  <TableHead>دسته‌بندی</TableHead>
                  <TableHead>کد محصول</TableHead>
                  <TableHead>موجودی</TableHead>
                  <TableHead>قیمت</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="flex items-center gap-3">
                      <ImageWithFallback
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-12 h-12 rounded"
                      />
                      {product.name}
                    </TableCell>
                    <TableCell>{getCategoryLabel(product.category)}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.stock.toLocaleString("fa-IR")}</TableCell>
                    <TableCell>{product.price.toLocaleString("fa-IR")}</TableCell>
                    <TableCell>
                      <Badge className={product.status === "active" ? "bg-green-500 text-white rounded-full px-4" : "bg-red-500 text-white rounded-full px-4"}>
                        {product.status === "active" ? "فعال" : "غیرفعال"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(product)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {loading && <div className="p-4 text-center text-muted-foreground">در حال بارگذاری...</div>}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="p-4 space-y-3">
                <ImageWithFallback src={product.images?.[0] || "/placeholder.png"} alt={product.name} className="w-full h-40 object-cover rounded" />
                <div className="font-bold">{product.name}</div>
                <div className="text-sm text-muted-foreground">
                  {getCategoryLabel(product.category)}
                </div>
                <div className="flex justify-between items-center">
                  <span>{product.price.toLocaleString("fa-IR")} ت</span>
                  <Badge className={product.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                    {product.status === "active" ? "فعال" : "غیرفعال"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEditModal(product)}><Edit2 className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
