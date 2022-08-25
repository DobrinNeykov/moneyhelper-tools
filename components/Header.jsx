import Link from "next/link";
import { useState, useEffect } from "react";
import classNames from "classnames";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(true);
  const [burgerOpen, setBurgerOpen] = useState(true);

  useEffect(() => {
    setSearchOpen(false);
    setBurgerOpen(false);
  }, []);

  const MenuLink = ({ href, title }) => {
    return (
      <li>
        <a
          href={href}
          className="flex items-center text-pink-800 first:border-t py-2"
        >
          <div>{title}</div>
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"
            />
          </svg>
        </a>
      </li>
    );
  };

  return (
    <div>
      <div className="flex bg-blue-800 space-x-2 py-2 px-4 shadow-bottom-gray">
        <button
          aria-label="Open menu"
          className="text-center text-white"
          onClick={() => setBurgerOpen((s) => !s)}
        >
          <div className="sr-only">Search</div>
          <div className="">
            <svg className="mx-auto" width="38" height="38" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </div>
          <div className="text-center text-sm">menu</div>
        </button>
        <div className="flex-grow flex items-center">
          <Link href="https://moneyhelper.org.uk/">
            <a className="flex items-center mx-auto text-xl md:text-3xl text-white">
              <svg width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 3h4v7.5c0 1.93 1.57 3.5 3.5 3.5H13v-4l7 6l-7 6v-4h-2.5C6.36 18 3 14.64 3 10.5V3Z"
                />
              </svg>
              <h1 className="font-bold">MoneyHelper</h1>
            </a>
          </Link>
        </div>
        <form
          className="hidden md:flex items-center"
          method="get"
          action="https://www.moneyhelper.org.uk/en/search-results.html"
        >
          {searchOpen && (
            <input
              type="text"
              id="q"
              name="q"
              autoFocus
              className="h-10 rounded-l p-2 w-64"
              required
              placeholder="How can we help you today?"
            />
          )}
          <button
            aria-label="Search MoneyHelper"
            className={classNames(
              "bg-pink-600 text-white rounded-r p-1 h-10 flex items-center",
              { "rounded-l": !searchOpen }
            )}
            onClick={(e) => {
              if (!searchOpen) {
                setSearchOpen(true);
                e.preventDefault();
              }
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
              />
            </svg>
          </button>
        </form>
      </div>
      {burgerOpen && (
        <div className="w-full sm:max-w-sm min-w-xl bg-white text-gray-900 border sm:absolute p-3">
          <ul className="divide-y">
            <li>
              <form
                className="flex items-center mb-4 md:hidden"
                method="get"
                action="https://www.moneyhelper.org.uk/en/search-results.html"
              >
                <input
                  type="text"
                  id="q"
                  name="q"
                  autoFocus
                  className="h-10 rounded-l p-2 border flex-grow"
                  required
                  placeholder="How can we help you today?"
                />
                <button
                  className={classNames(
                    "bg-pink-600 text-white rounded-r p-1 h-10 flex items-center"
                  )}
                  onClick={(e) => {
                    if (!searchOpen) {
                      setSearchOpen(true);
                      e.preventDefault();
                    }
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
                    />
                  </svg>
                </button>
              </form>
            </li>
            <MenuLink
              href="https://www.moneyhelper.org.uk/"
              title="MoneyHelper home"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/benefits"
              title="Benefits"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/everyday-money"
              title="Everyday money"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/family-and-care"
              title="Family & care"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/homes"
              title="Homes"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/money-troubles"
              title="Money troubles"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/pensions-and-retirement"
              title="Pensions & retirement"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/savings"
              title="Savings"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/en/work"
              title="Work"
            />
            <MenuLink
              href="https://www.moneyhelper.org.uk/cy/search-results"
              title="Cymraeg"
            />
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
