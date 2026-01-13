import ChallengeCard from "@/components/Custom/ChallangeCard";

export default function ExamplePage() {
  const profiles1 = [
    { id: 1, image: "https://i.pravatar.cc/150?img=1", fallback: "ش" },
    { id: 2, image: "https://i.pravatar.cc/150?img=2", fallback: "م" },
    { id: 3, image: "https://i.pravatar.cc/150?img=3", fallback: "ح" },
    { id: 4, image: "https://i.pravatar.cc/150?img=4", fallback: "ع" },
  ];

  const profiles2 = [
    { id: 4, image: "https://i.pravatar.cc/150?img=4", fallback: "ع" },
    { id: 5, image: "https://i.pravatar.cc/150?img=5", fallback: "س" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-8 p-4 sm:p-8 bg-gray-100">
      {/* کارت اول */}
      <div className="w-full max-w-md sm:max-w-2xl">
        <ChallengeCard
          title="چالش الگوریتم ۱"
          description="در این چالش شما باید بهترین راه‌حل الگوریتمی را برای مسئله داده‌شده ارائه دهید."
          startDate="۱۴۰۴/۱۰/۲۱ - ۲۳:۵۹"
          endDate="۱۴۰۴/۱۱/۲۲ - ۲۳:۵۹"
          profiles={profiles1}
          initialLikes={120}
          coverImage="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
          isPrivate = {true}
        />
      </div>

      {/* کارت دوم */}
      <div className="w-full max-w-md sm:max-w-2xl">
        <ChallengeCard
          title="چالش الگوریتم ۲"
          description="چالش دوم شامل مسائل پیچیده‌تر و چندمرحله‌ای است."
          startDate="۱۴۰۴/۱۱/۲۵ - ۱۰:۰۰"
          endDate="۱۴۰۴/۱۲/۰۵ - ۱۸:۰۰"
          profiles={profiles2}
          initialLikes={85}
          coverImage="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
        />
      </div>
    </div>
  );
}
