"use client";

import { useEffect, useRef } from "react";
import type { Bill } from "@/lib/types";
import { useAdmin } from "./Store";
import { Receipt } from "./receipt";

/** Print an existing bill: no questions asked — it goes straight to the print dialog on the paper chosen in
    Settings → Printing (3 inch thermal roll unless changed). */
export default function PrintModal({ bill, onClose }: { bill: Bill | null; onClose: () => void }) {
  const { s, print, printFormat } = useAdmin();
  const done = useRef<string | null>(null);
  useEffect(() => {
    if (!bill) {
      done.current = null;
      return;
    }
    if (done.current === bill.id) return; // once per click, even if the page re-renders meanwhile
    done.current = bill.id;
    print(<Receipt b={bill} shop={s.settings.shopName} details={s.settings} fmt={printFormat} showLoyalty={s.loyaltyEarn.display.receiptSummary} />);
    onClose();
  }, [bill, print, s.settings, s.loyaltyEarn.display.receiptSummary, printFormat, onClose]);
  return null;
}
