import clsx from "clsx";

type Tab = "shipments" | "notifications";

interface Props {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export default function SettingsTabs({ activeTab, onChange }: Props) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-md rounded-full bg-gray-200 p-1">
      <button
        onClick={() => onChange("shipments")}
        className={clsx(
          "w-1/2 rounded-full py-2 text-sm font-medium transition",
          activeTab === "shipments"
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500"
        )}
      >
        ارسال‌ها
      </button>

      <button
        onClick={() => onChange("notifications")}
        className={clsx(
          "w-1/2 rounded-full py-2 text-sm font-medium transition",
          activeTab === "notifications"
            ? "bg-white text-gray-900 shadow"
            : "text-gray-500"
        )}
      >
        اعلان‌ها
      </button>
    </div>
  );
}
