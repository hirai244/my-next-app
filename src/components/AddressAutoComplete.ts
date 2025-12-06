"use client";

import { getAddress } from "@/lib/zipCloudApi";
import { JobCreateValues } from "@/src/schema/job";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export function useAddressAutoComplete(form: UseFormReturn<JobCreateValues>) {
  const zipCode = form.watch("zipCode");
  const { setValue, trigger } = form;

  useEffect(() => {
    if (zipCode.length === 7) {
      const LookUpping = async () => {
        const address = await getAddress(zipCode);
        if (address) {
          setValue("prefecture", address.prefecture, { shouldValidate: true });
          setValue("city", address.city, { shouldValidate: true });
          setValue("addressLine1", address.town, { shouldValidate: true });
          trigger(["prefecture", "city", "addressLine1"]);
        } else {
          setValue("prefecture", "", { shouldValidate: true });
          setValue("city", "", { shouldValidate: true });
          setValue("addressLine1", "", { shouldValidate: true });
        }
      };
      LookUpping();
    }
  }, [zipCode, setValue, trigger]);
}
