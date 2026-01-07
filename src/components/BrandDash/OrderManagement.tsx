import { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getOrdersService } from "@/services/orderService";
import type { Order, OrderStatus, OrderStats } from "@/types/orderType";
import { translateNumber } from "@/utils/translateNumber";

const STATUS_META: Record<
  OrderStatus,
  { label: string; className: string; badgeTone: string }
> = {
  processing: {
    label: "در حال پردازش",
    className: "bg-[#E91E63] hover:bg-[#D81B60]",
    badgeTone: "bg-[#E91E63] hover:bg-[#D81B60]",
  },
  shipped: {
    label: "در حال ارسال",
    className: "bg-[#FF8A65] hover:bg-[#FF7043]",
    badgeTone: "bg-[#FF8A65] hover:bg-[#FF7043]",
  },
  delivered: {
    label: "تحویل داده شده",
    className: "bg-[#4CAF50] hover:bg-[#43A047]",
    badgeTone: "bg-[#4CAF50] hover:bg-[#43A047]",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-[#EF5350] hover:bg-[#E53935]",
    badgeTone: "bg-[#EF5350] hover:bg-[#E53935]",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value || 0);

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | OrderStatus>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statsFromApi, setStatsFromApi] = useState<OrderStats | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { orders: fetchedOrders, stats } = await getOrdersService();
        if (!isMounted) return;
        setOrders(fetchedOrders);
        setStatsFromApi(stats ?? null);
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("خطا در دریافت سفارش‌ها");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const counts: Record<OrderStatus, number> = {
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      counts[order.status] += 1;
    });

    return [
      {
        label: "کل سفارشات",
        value:
          statsFromApi?.allorders?.toLocaleString("fa-IR") ??
          translateNumber(orders.length),
      },
      {
        label: STATUS_META.processing.label,
        value:
          statsFromApi?.inprocess?.toLocaleString("fa-IR") ??
          translateNumber(counts.processing),
      },
      {
        label: STATUS_META.shipped.label,
        value:
          statsFromApi?.onroute?.toLocaleString("fa-IR") ??
          translateNumber(counts.shipped),
      },
      {
        label: STATUS_META.delivered.label,
        value:
          statsFromApi?.delivered?.toLocaleString("fa-IR") ??
          translateNumber(counts.delivered),
      },
    ];
  }, [orders, statsFromApi]);

  const OrderDetailsDialog = ({ order }: { order: Order }) => {
    const statusMeta = STATUS_META[order.status];

    return (
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>جزئیات سفارش: {order.productName}</DialogTitle>
          <DialogDescription>
            اطلاعات کامل سفارش در این پنجره نمایش داده می‌شود
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4 text-right">
            <div>
              <p className="text-muted-foreground text-xs mb-1">نام سفارش</p>
              <p className="font-semibold text-sm">{order.productName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">تاریخ</p>
              <p className="font-semibold text-sm">{order.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">مبلغ</p>
              <p className="font-semibold text-sm">
                {formatCurrency(order.amount)} تومان
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">وضعیت</p>
              <Badge className={`${statusMeta.className} text-white border-0`}>
                {statusMeta.label}
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    );
  };

  return (
    <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
      {({ values }) => {
        const normalizedQuery =
          (values.search?.trim().toLowerCase() as string) ?? "";

        const filteredOrders = orders.filter((order) => {
          const matchesStatus =
            filterStatus === "all" || order.status === filterStatus;
          const matchesQuery =
            !normalizedQuery ||
            order.productName.toLowerCase().includes(normalizedQuery);

          return matchesStatus && matchesQuery;
        });

        return (
          <Form className="p-6 pb-24 md:pb-32 bg-gray-50/50 min-h-screen font-sans">
            {/* Reverted to original inner container max-width and spacing */}
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* Header Section */}
              <div className="flex justify-end items-center mb-8" dir="ltr">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h2 className="font-bold text-lg">نام برند</h2>
                    <p className="text-xs text-muted-foreground">
                      مشاهده و مدیریت سفارش‌های شما
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src="/avatar.png"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card
                    key={`${stat.label}-${index}`}
                    className="p-6 flex flex-col items-center justify-center shadow-sm border-gray-100"
                  >
                    <p className="text-gray-500 text-sm mb-3 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Search & Filter Card (Kept the new design inside the old container) */}
              <Card className="p-3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Status Filter */}
                  <div className="w-full md:w-48 order-2 md:order-1">
                    <Select
                      value={filterStatus}
                      onValueChange={(value) =>
                        setFilterStatus(value as OrderStatus | "all")
                      }
                    >
                      <SelectTrigger
                        className="w-full border-input bg-background focus:ring-0 text-right"
                        dir="rtl"
                      >
                        <SelectValue placeholder="وضعیت سفارش" />
                      </SelectTrigger>
                      <SelectContent dir="rtl">
                        <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                        <SelectItem value="processing">
                          {STATUS_META.processing.label}
                        </SelectItem>
                        <SelectItem value="shipped">
                          {STATUS_META.shipped.label}
                        </SelectItem>
                        <SelectItem value="delivered">
                          {STATUS_META.delivered.label}
                        </SelectItem>
                        <SelectItem value="cancelled">
                          {STATUS_META.cancelled.label}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full md:w-72 order-1 md:order-2">
                    <Field
                      name="search"
                      type="text"
                      dir="rtl"
                      placeholder="سفارش خود را جستجو کنید"
                      className="w-full rounded-full border border-input/60 bg-muted/60 py-2.5 pr-12 pl-4 text-sm text-foreground shadow-inner placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/30 text-right"
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

              {/* Orders Table */}
              <Card className="overflow-hidden shadow-sm border-gray-100">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="text-center font-bold text-gray-700 py-5">
                        جزئیات
                      </TableHead>
                      <TableHead className="text-center font-bold text-gray-700 py-5">
                        وضعیت سفارش
                      </TableHead>
                      <TableHead className="text-center font-bold text-gray-700 py-5">
                        مبلغ(تومان)
                      </TableHead>
                      <TableHead className="text-center font-bold text-gray-700 py-5">
                        تعداد
                      </TableHead>
                      <TableHead className="text-center font-bold text-gray-700 py-5">
                        تاریخ
                      </TableHead>
                      <TableHead className="text-center font-bold text-gray-700 py-5">
                        شماره سفارش
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell
                          className="text-center text-muted-foreground"
                          colSpan={6}
                        >
                          در حال دریافت اطلاعات...
                        </TableCell>
                      </TableRow>
                    )}

                    {error && !loading && (
                      <TableRow>
                        <TableCell
                          className="text-center text-red-500"
                          colSpan={6}
                        >
                          {error}
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading && !error && filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell
                          className="text-center text-muted-foreground"
                          colSpan={6}
                        >
                          سفارشی یافت نشد.
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading &&
                      !error &&
                      filteredOrders.map((order) => {
                        const statusMeta = STATUS_META[order.status];

                        return (
                          <TableRow
                            key={order.id}
                            className="hover:bg-gray-50/50"
                          >
                            <TableCell className="text-center">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Eye className="w-5 h-5" />
                                  </Button>
                                </DialogTrigger>
                                <OrderDetailsDialog order={order} />
                              </Dialog>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={`${statusMeta.badgeTone} text-white border-0 px-4 py-1.5 rounded-lg text-xs font-normal`}
                              >
                                {statusMeta.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center font-medium text-gray-700">
                              {formatCurrency(order.amount)}
                            </TableCell>
                            <TableCell className="text-center font-medium text-gray-700">
                              {order.items}
                            </TableCell>
                            <TableCell className="text-center text-gray-600 font-medium">
                              {order.date}
                            </TableCell>
                            <TableCell className="text-center font-medium text-gray-800">
                              {order.productName}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
