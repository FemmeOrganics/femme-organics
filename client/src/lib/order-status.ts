export function getOrderStatusColors(status: string | undefined | null) {
    switch (status) {
      case "RECEIVED":
        return "bg-[#DCF1FF] text-[#009DFF] text-sm";
      case "PENDING":
        return "bg-[#FFF8DE] text-[#D97706] text-sm";
      case "CONFIRMED":
        return "bg-[#FFF8DE] text-[#D97706] text-xs font-light";
      case "COMPLETED":
        return "bg-[#ECFDF7] text-[#059661] text-sm";
      case "CANCELLED":
        return "bg-[#FEF2F2] text-[#DC2626] text-sm";
      case "DRAFT":
        return "bg-grey-200 text-grey-900 text-sm";
      default:
        return "bg-black-200 text-black-900 text-sm";
    }
  }


  export function getOrderPaymentStatusColors(status: string | undefined | null) {
    switch (status) {
      case "FULL":
        return "bg-[#ECFDF7] text-[#059661] text-xs font-light";
      case "NOT_PAID":
        return "bg-[#FEF2F2] text-[#DC2626] text-xs font-light";
      case "PARTIAL":
        return "bg-[#FFF8DE] text-[#D97706] text-xs font-light";
      default:
        return "bg-black-200 text-black-900 text-xs font-light";
    }
  }
