import type { Metadata } from "next";
import Hero from "@/components/layouts/hero";
import Projects from "@/components/sections/projects";
import Profile from "@/components/sections/profile";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layouts/footer";
import SectionFlow from "@/components/animations/section-flow";
import { DICTS } from "@/lib/i18n";

// Versione italiana (default): i metadata vivono qui e non più nel layout,
// così `/en` può avere i suoi senza conflitti.
export const metadata: Metadata = {
  title: "SYS / 01 — Junior Web & Mobile App Developer",
  description:
    "Portfolio di un Junior Web & Mobile Developer, specializzato in React, Next.js, TypeScript e interfacce responsive.",
  // Sito non indicizzato per scelta: blocca anche mirror/deploys di anteprima.
  robots: { index: false, follow: false },
};

export default function Home() {
  const dict = DICTS.it;
  return (
    <main className="flex flex-1 flex-col">
      <Hero dict={dict.hero} />
      <Projects dict={dict.projects} locale="it" />
      <SectionFlow
        a={<Profile dict={dict.profile} />}
        b={<Contact dict={dict.contact} />}
      />
      <Footer dict={dict.footer} locale="it" />
    </main>
  );
}
