import { ads } from "@/lib/ads"

export default function AdRectangle() {
  if (!ads.enabled) {
    return null
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={ads.client}
      data-ad-slot="rectangle"
      data-ad-format="rectangle"
    />
  )
}
