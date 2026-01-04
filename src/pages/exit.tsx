import { useState } from "react";
import ExitModal from "@/components/ExitComponent/exitComponent";

function ExitCom() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <ExitModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={() => setIsOpen(false)}
      />
    </div>
  );
}

export default ExitCom;
