"use client";

import { getAddress } from "@/lib/zipCloudApi";
import { JobCreateValues } from "@/schema/job";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export function AddressAutoComplete(form: UseFormReturn<JobCreateValues>) {
  const zipCode = form.watch("zipCode");
  const { setValue, trigger } = form;

  useEffect(() => {
    if (zipCode.length === 7) {
      const Lookupping = async () => {
        const address = await getAddress(zipCode);
        if (address) {
          setValue("prefecture", address.prefecture, { shouldValidate: true });
          setValue("city", address.city, { shouldValidate: true });
          setValue("addressLine1", address.town, { shouldValidate: true });
          trigger(["prefecture", "city", "addressLine1"]);
        } else {
          setValue("prefecture", "", { shouldValidate: true });
          setValue("city", "", { shouldValidate: true });
        }
      };
      Lookupping();
    }
  }, [zipCode, setValue, trigger]);
}
