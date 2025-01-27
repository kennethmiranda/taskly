import HeaderNav from "@/src/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Taskly",
  description: "Privacy Policy page",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 p-8 max-w-8xl mx-auto">
      <HeaderNav />
      <h2 className="text-2xl font-bold tracking-tight">Privacy Policy</h2>
      <div className="flex-grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <p className="text-muted-foreground">
          Here&apos;s a list of our privacy policy
        </p>
        <h3 className="text-xl font-semibold mt-5 mb-2">1. Introduction</h3>
        <p>
          These Website Standard Terms and Conditions written on this webpage
          shall manage your use of our website, Webiste Name accessible at
          Website.com.
        </p>
        <h3 className="text-xl font-semibold mt-5 mb-2">
          2. Intellectual Property Rights
        </h3>
        <p>
          Other than the content you own, under these Terms, Company Name and/or
          its licensors own all the intellectual property rights and materials
          contained in this Website.
        </p>
        <h3 className="text-xl font-semibold mt-5 mb-2">3. Restrictions</h3>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>publishing any Website material in any other media;</li>
          <li>
            selling, sublicensing and/or otherwise commercializing any Website
            material;
          </li>
          <li>publicly performing and/or showing any Website material;</li>
          <li>
            using this Website in any way that is or may be damaging to this
            Website;
          </li>
          <li>
            using this Website in any way that impacts user access to this
            Website;
          </li>
          <li>
            using this Website contrary to applicable laws and regulations, or
            in any way may cause harm to the Website, or to any person or
            business entity;
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-5 mb-2">4. Your Content</h3>
        <p>
          In these Website Standard Terms and Conditions, "Your Content" shall
          mean any audio, video text, images or other material you choose to
          display on this Website. By displaying Your Content, you grant Company
          Name a non-exclusive, worldwide irrevocable, sub licensable license to
          use, reproduce, adapt, publish, translate and distribute it in any and
          all media.
        </p>
        <h3 className="text-xl font-semibold mt-5 mb-2">5. No warranties</h3>
        <p>
          This Website is provided "as is," with all faults, and Company Name
          express no representations or warranties, of any kind related to this
          Website or the materials contained on this Website. Also, nothing
          contained on this Website shall be interpreted as advising you.
        </p>
      </div>
    </main>
  );
}
