import Head from "next/head";
import Hero from "./hero";
import Navbar from "./navbar";
import SectionTitle from "./sectionTitle";
import { Element } from "react-scroll";

import { benefitOne, benefitTwo } from "./data";
import Video from "./video";
import Benefits from "./benefits";
import Footer from "./footer";
import Testimonials from "./testimonials";
import Cta from "./cta";
import Faq from "./faq";
import PopupWidget from "./popupWidget";
import Pricing from "./pricing";
import Integrations from "./integrations";

//import dynamic from "next/dynamic";

// const Video = dynamic(() => import("../components/video"));

// const Benefits = dynamic(() => import("../components/benefits"));
// const Footer = dynamic(() => import("../components/footer"));
// const Testimonials = dynamic(() => import("../components/testimonials"));
// const Cta = dynamic(() => import("../components/cta"));
// const Faq = dynamic(() => import("../components/faq"));

// const PopupWidget = dynamic(() => import("../components/popupWidget"));

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta
          name="description"
          content="Quiz App "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <Element name="features">
        <SectionTitle
          pretitle="Nextly Benefits"
          title=" Why should you use this landing page">
          Nextly is a free landing page & marketing website template for startups
          and indie projects. Its built with Next.js & TailwindCSS. And its
          completely open-source.
        </SectionTitle>

        <Benefits data={benefitOne} />
      </Element>
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to fullfil your needs">
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        do not forget to add one. Just like this.
      </SectionTitle>
      <Video />
      <Element name="pricing">
        <SectionTitle
          pretitle="Pricing"
          title="Most Affordable Pricing">
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate. So,
          do not forget to add one. Just like this.
        </SectionTitle>
        <Pricing />
      </Element>
      <Element name="integrations">
        <SectionTitle
          pretitle="Integrations"
          title="Native Integration with External Providers via SMTP Credentials & API">
          Connect SendMails with unlimited external SMTP services such as Amazon SES, Mandrill, Mailgun and SparkPost to send email via their SMTP servers.
        </SectionTitle>
        <Integrations />
      </Element>
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said">
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials />

      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
      <PopupWidget />
    </>
  );
}
