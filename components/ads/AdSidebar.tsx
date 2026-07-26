
import { ads } from "@/lib/ads"

export default function AdSidebar() {
  if (!ads.enabled) {
    return null
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={ads.client}
      data-ad-slot="sidebar"
      data-ad-format="vertical"
    />
  )
}
