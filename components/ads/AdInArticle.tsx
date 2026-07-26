import { ads } from "@/lib/ads"

export default function AdInArticle() {
  if (!ads.enabled) {
    return null
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client={ads.client}
      data-ad-slot="inarticle"
    />
  )
}
