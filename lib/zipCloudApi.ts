"use server";

export type AddressResult = {
  prefecture: string;
  city: string;
  town: string;
};
export async function getAddress(
  zipCode: string
): Promise<AddressResult | null> {
  if (!zipCode || zipCode.length !== 7) {
    return null;
  }

  const APi_URL = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`;

  try {
    const response = await fetch(APi_URL);

    if (!response.ok) {
      console.error("Zip Api error: ${response.status}");
      return null;
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        prefecture: result.address1,
        city: result.address2,
        town: result.address3,
      };
    }
    return null;
  } catch (e) {
    console.error("Failed to fetch zip code data:", e);
    return null;
  }
}
