import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  // Let sharing crawlers read public metadata; page access still requires a session.
  return { rules: { userAgent: "*", allow: "/" } };
}
