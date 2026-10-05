import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

/** Chrome for the learning hub itself. The apex landing page has its own. */
export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
