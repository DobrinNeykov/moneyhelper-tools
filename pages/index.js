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
          <h1 className="text-4xl font-bold mb-3">
            Welcome to MoneyHelper Tools!
          </h1>
          <ul className="">
            <li>
              <Link href="/stamp-duty-calculator">
                <a className="text-lg text-gray-700 underline">
                  Stamp Duty Calculator
                </a>
              </Link>
            </li>
            <li>
              <Link
                href="/compare-accounts"
                className="text-lg text-gray-700 underline"
              >
                <a className="text-lg text-gray-700 underline">
                  Compare Accounts
                </a>
              </Link>
            </li>
          </ul>
        </>
      </Content>

      <Footer />
    </div>
  );
}
