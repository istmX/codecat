"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { upgradeToPro } from "@/features/auth/actions/user-actions";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export function CatPay() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await upgradeToPro();
      if (res.success) {
        toast.success("Cat Pay Successful! You are now a PRO member.");
        router.refresh();
      }
    } catch (error) {
      toast.error("Cat Pay failed. Are you sure you gave us enough tuna?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 backdrop-blur-sm shadow-md transition-all hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
          <CreditCard className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Cat Pay Checkout</h3>
          <p className="text-sm text-muted-foreground">Dummy checkout to upgrade to PRO plan.</p>
        </div>
      </div>
      
      <div className="space-y-3 mt-2">
        <input 
          type="text" 
          placeholder="Card Number (Fake)"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="MM/YY"
            className="w-1/2 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input 
            type="text" 
            placeholder="CVC"
            className="w-1/2 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <Button 
        onClick={handleUpgrade}
        disabled={isLoading}
        className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold h-11"
      >
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Pay with Cat Pay ($10/mo)"}
      </Button>
    </div>
  );
}
