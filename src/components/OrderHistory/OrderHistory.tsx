"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Clock, CheckCircle, XCircle, Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

import { translateNumber } from "@/utils/translateNumber";
import type { OrderHistoryData, OrderDetailsType } from "@/types/orderTypes";

// 🔵 NEW — گرفتن جزئیات سفارش از سرویس Mock یا API
import { getOrderDetails } from "@/services/orderService.api.mock";

// 🔵 NEW — مدال
import { OrderDetailsModal } from "@/components/OrderHistory/OrderDetailsModal";

// 🔵 NEW — اسپینر هنگام لود جزئیات
import { Spinner } from "@/components/ui/Spinner";

// 🔵 NEW — تابع نگاشت وضعیت به رنگ Badge
import { getOrderStatusVariant } from "@/components/ui/getOrderStatusVariant";

export function OrderHistory({ data }: { data: OrderHistoryData }) {
  const [activeTab, setActiveTab] = useState<string>("current");

  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const userData = {
    fullName: "نام کاربر",
    profileUrl: "/images/sample-user.jpg",
  };

  const openOrderModal = async (order: any) => {
    try {
      setIsModalOpen(true);
      setSelectedOrder(null);
      setLoadingDetails(true);

      const details = await getOrderDetails(order.id);

      setSelectedOrder(details);
    } catch (err) {
      console.error("Error loading order details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderOrderList = (orders: OrderHistoryData["current"]) => (
    <div className="grid gap-2">
      {orders.map((order) => (
        <Card key={order.id} className="p-5 sm:p-6 space-y-2 shadow-md">
          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground text-right leading-tight">شماره سفارش</span>
            <span className="font-bold text-sm text-left leading-tight">{order.id}</span>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground text-right leading-tight">وضعیت</span>
            <Badge className="text-white border-0 vazir text-xs" variant={getOrderStatusVariant(order.status)}>
              {order.status}
            </Badge>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground text-right leading-tight">مبلغ</span>
            <span className="font-bold text-sm text-left leading-tight">{translateNumber(order.amount)} تومان</span>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground text-right leading-tight">تعداد اقلام</span>
            <span className="text-sm text-left leading-tight">{translateNumber(order.items)}</span>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground text-right leading-tight">تاریخ</span>
            <span className="text-sm text-left leading-tight">{translateNumber(order.date)}</span>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="vazir w-full"
              onClick={() => openOrderModal(order)}
            >
              مشاهده جزئیات
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderOrderTable = (orders: OrderHistoryData["current"]) => (
    <Card className="overflow-hidden rounded-[5px]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right vazir font-medium text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 whitespace-nowrap">جزئیات</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 whitespace-nowrap">وضعیت</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 whitespace-nowrap">مبلغ</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 whitespace-nowrap hidden md:table-cell">تعداد اقلام</TableHead>
              <TableHead className="text-right vazir text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 whitespace-nowrap hidden md:table-cell">تاریخ</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 whitespace-nowrap">شماره سفارش</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="vazir hover:bg-muted/30">

                <TableCell className="text-right text-xs md:text-sm py-2 md:py-3 px-3 md:px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="vazir"
                    onClick={() => openOrderModal(order)}
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>

                <TableCell className="text-right text-xs md:text-sm py-2 md:py-3 px-3 md:px-4">
                  {/* 🔹 اینجا تغییر دادیم: رنگ Badge بر اساس وضعیت */}
                  <Badge
                    className="text-white border-0 vazir"
                    variant={getOrderStatusVariant(order.status)}
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right text-xs md:text-sm font-bold py-2 md:py-3 px-3 md:px-4">
                  {translateNumber(order.amount)} تومان
                </TableCell>

                <TableCell className="text-right text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 hidden md:table-cell">
                  {translateNumber(order.items)}
                </TableCell>

                <TableCell className="text-right text-foreground text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 hidden md:table-cell">
                  {translateNumber(order.date)}
                </TableCell>

                <TableCell className="text-right text-xs md:text-sm font-bold py-2 md:py-3 px-3 md:px-4 whitespace-nowrap">
                  {order.id}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  return (
    <>
      <div className="container mx-auto px-5 md:px-6 py-4 md:py-6 space-y-6 md:space-y-8 rtl vazir">

        {/* هدر */}
        <div className="max-w-5xl mx-auto flex flex-row justify-start items-center sm:items-start gap-3 md:gap-4 mb-4 md:mb-6 rtl">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border overflow-hidden shrink-0">
            {userData?.profileUrl ? (
              <img
                src={userData.profileUrl}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                USER
              </div>
            )}
          </div>

          <div className="flex flex-col items-start text-right flex-1 min-w-0">
            <h3 className="font-extrabold text-foreground text-lg md:text-xl truncate">
              {userData?.fullName || "نام کاربر"}
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm truncate mt-0.5">سفارش های شما در فروشگاه</p>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-order-current/60 flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">سفارش های جاری</p>
                <p className="text-xl md:text-2xl font-bold">{translateNumber(data.current.length)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-order-complete/60 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">سفارش های تحویل شده</p>
                <p className="text-xl md:text-2xl font-bold">{translateNumber(data.past.length)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-order-cancel/60 flex items-center justify-center">
                <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">سفارش های لغو شده</p>
                <p className="text-xl md:text-2xl font-bold">{translateNumber(data.cancelled.length)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mx-auto w-full max-w-md flex justify-center rounded-xl-50 bg-muted p-1 vazir">
              <TabsTrigger value="current" className="flex-1 px-2 md:px-3 py-2 text-xs md:text-sm font-medium">سفارش های جاری</TabsTrigger>
              <TabsTrigger value="past" className="flex-1 px-2 md:px-3 py-2 text-xs md:text-sm font-medium">سفارش های گذشته</TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-1 px-2 md:px-3 py-2 text-xs md:text-sm font-medium">سفارش های لغو شده</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-4 md:mt-6">
              {data.current.length > 0 ? (
                <>
                  <div className="md:hidden">{renderOrderList(data.current)}</div>
                  <div className="hidden md:block">{renderOrderTable(data.current)}</div>
                </>
              ) : (
                <Card className="py-12 text-center text-muted-foreground vazir">سفارش فعالی وجود ندارد.</Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-4 md:mt-6">
              {data.past.length > 0 ? (
                <>
                  <div className="md:hidden">{renderOrderList(data.past)}</div>
                  <div className="hidden md:block">{renderOrderTable(data.past)}</div>
                </>
              ) : (
                <Card className="py-12 text-center text-muted-foreground vazir">سفارش تحویل شده ای وجود ندارد.</Card>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-4 md:mt-6">
              {data.cancelled.length > 0 ? (
                <>
                  <div className="md:hidden">{renderOrderList(data.cancelled)}</div>
                  <div className="hidden md:block">{renderOrderTable(data.cancelled)}</div>
                </>
              ) : (
                <Card className="py-12 text-center text-muted-foreground vazir">سفارش لغو شده ای وجود ندارد.</Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* مدال */}
      {isModalOpen && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={
            loadingDetails
              ? { id: "", orderDate: "", totalPrice: "", details: [] }
              : (selectedOrder as OrderDetailsType)
          }
        />
      )}

      {/* اسپینر هنگام لود */}
      {isModalOpen && loadingDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <Spinner />
        </div>
      )}
    </>
  );
}

