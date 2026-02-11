import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const TabsVariantContext = React.createContext(false);

type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & {
  number?: number;
};

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    isPetsitter?: boolean;
  }
>(({ isPetsitter = false, ...props }, ref) => (
  <TabsVariantContext.Provider value={isPetsitter}>
    <TabsPrimitive.Root ref={ref} {...props} />
  </TabsVariantContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <>
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-none  rtl [scrollbar-width:none] [-ms-overflow-style:none]">
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          "inline-flex h-9 items-end justify-start rounded-lg text-muted-foreground bg-none rtl gap-2 ",
          className
        )}
        {...props}
      />
    </div>

    <div className="h-0.5 -mt-0.5 bg-black/30"></div>
  </>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, number, ...props }, ref) => {
  const isPetsitter = React.useContext(TabsVariantContext);

  const activeText = isPetsitter
    ? "data-[state=active]:text-secondary"
    : "data-[state=active]:text-primary";

  const hoverText = isPetsitter
    ? "group-hover:text-secondary"
    : "group-hover:text-primary";

  const focusText = isPetsitter
    ? "group-focus-visible:text-secondary"
    : "group-focus-visible:text-primary";

  const hoverBg = isPetsitter
    ? "group-hover:bg-secondary"
    : "group-hover:bg-primary";

  const focusBg = isPetsitter
    ? "group-focus-visible:bg-secondary"
    : "group-focus-visible:bg-primary";

  const activeBg = isPetsitter
    ? "group-data-[state=active]:bg-secondary"
    : "group-data-[state=active]:bg-primary";

  const numberText = "text-white";

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "hover:cursor-pointer group inline-flex flex-col items-center h-full justify-between whitespace-nowrap rounded-md pl-6 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 text-black",
        activeText,
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2 rtl:flex-row-reverse h-full">
        {typeof number === "number" && (
          <span
            className={cn(
              "flex items-center justify-center h-[60%] aspect-square rounded-full text-xs transition-all bg-black/40 font-bold",
              numberText,
              hoverBg,
              focusBg,
              activeBg
            )}
          >
            {number}
          </span>
        )}

        <span className={cn(hoverText, focusText)}>{children}</span>
      </span>

      <span
        className={cn(
          "h-0.5 w-full opacity-0",
          hoverBg,
          focusBg,
          activeBg,
          "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=active]:opacity-100"
        )}
      />
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
