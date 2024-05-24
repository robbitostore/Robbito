import React from "react";
import Layout from "../../components/Layout";
import Section1 from "../../components/Home/Section1";
import Section3 from "../../components/Home/Section3";
import Section2 from "../../components/Home/Section2";
import Section4 from "../../components/Home/Section4";
import Section5 from "../../components/Home/Section5";
import Section6 from "../../components/Home/Section6";
// import Section7 from "../../components/Home/Section7";
import Section8 from "../../components/Home/Section8";

export default function Home() {
  return (
    <Layout>
      <div className="w-full min-h-screen  relative overflow-x-hidden">
        <section className="w-full h-[80vh] overflow-hidden sm:h-[90vh]">
          <Section1 />
        </section>
        {/* Section2 */}
        <section>
          <Section2 />
        </section>
        {/* section3 */}
        <section className="w-full px-4 mt-6">
          <Section3 />
        </section>
        {/* Section4 */}
        <section>
          <Section4 />
        </section>
        {/* Section5 */}
        <section>
          <Section5 />
        </section>
        {/* Section6 */}
        <section>
          <Section6 />
        </section>
        {/* Section7 */}
        {/* <section>
          <Section7 />
        </section> */}
        {/* Section8 */}
        <section>
          <Section8 />
        </section>
      </div>
    </Layout>
  );
}
