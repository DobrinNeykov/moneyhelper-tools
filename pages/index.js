import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MoneyHelper Tools</title>
        <meta name="description" content="MoneyHelper Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Content>
        <>
          <h1 className="text-4xl font-bold mb-12">
            Welcome to MoneyHelper Tools
          </h1>

          <ul className="space-y-8">
            <li>
              <h2 className="text-3xl font-bold mb-3">Stamp duty calculator</h2>
              <div>
                <Link href="/stamp-duty-calculator">
                  <a className="text-md text-gray-700 underline">Home page</a>
                </Link>
              </div>
              <div>
                <Link href="/embed/stamp-duty-calculator">
                  <a className="text-md text-gray-700 underline">
                    Embeddable tool
                  </a>
                </Link>
              </div>
            </li>
            <li>
              <h2 className="text-3xl font-bold mb-3">Compare accounts</h2>
              <div>
                <Link href="/compare-accounts">
                  <a className="text-md text-gray-700 underline">Home page</a>
                </Link>
              </div>
              <div>
                <Link href="/embed/compare-accounts">
                  <a className="text-md text-gray-700 underline">
                    Embeddable tool
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </>
      </Content>

      <Footer />
    </div>
  );
}
