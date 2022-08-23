import Link from "next/link";
import { useState, useEffect } from "react";
import classNames from "classnames";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(true);

  useEffect(() => {
    setSearchOpen(false);
  }, []);

  return (
    <div className="flex flex-wrap bg-blue-800 space-x-2 py-2 px-4 shadow-bottom-gray">
      <button className="text-center text-white peer">
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
            <div className="font-bold">MoneyHelper</div>
          </a>
        </Link>
      </div>
      <form
        className="flex items-center"
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
      <div className="hidden peer-focus:block bg-white text-gray-900 border absolute">
        <ul>
          <li>
            <a href="https://www.moneyhelper.org.uk/">MoneyHelper home</a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/benefits">Benefits</a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/everyday-money">
              Everyday money
            </a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/family-and-care">
              Family & care
            </a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/homes">Homes</a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/money-troubles">
              Money troubles
            </a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/pensions-and-retirement">
              Pensions & retirement
            </a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/savings">Savings</a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/en/work">Work</a>
          </li>
          <li>
            <a href="https://www.moneyhelper.org.uk/cy/search-results">
              Cymraeg
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
