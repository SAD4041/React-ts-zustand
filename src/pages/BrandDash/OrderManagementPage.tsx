// src/pages/Landing.tsx
// import { useNavigate } from "react-router-dom"; // 👈 حذف شد
import { OrderManagement } from "@/components/BrandDash/OrderManagement";

function OrderManagementPage() {
    // const Navigate = useNavigate(); // 👈 حذف شد

    return (
        <div className="w-full">
            <OrderManagement />
        </div>
    );
}

export default OrderManagementPage;
