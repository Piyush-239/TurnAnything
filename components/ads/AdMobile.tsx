import { ads } from "@/lib/ads"

export default function AdMobile() {
  if (!ads.enabled) {
    return null
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "inline-block", width: "320px", height: "100px" }}
      data-ad-client={ads.client}
      data-ad-slot="mobile"
    />
  )
}
