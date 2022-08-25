import { Accessibility, MAPS, Gov, Lang, W3C } from "./Icons";

const Footer = () => {
  const FooterLink = ({ href, title }) => {
    return (
      <li className="text-white md:first:pl-0 md:pl-2 md:pr-2 underline">
        <a href={href}>{title}</a>
      </li>
    );
  };

  return (
    <div className="mt-8">
      <div className="block md:flex border-t border-slate-400 md:bg-gradient-to-r md:from-white md:via-white md:to-gray-100">
        <div className="container mx-auto px-10 md:flex">
          <div className="py-8 w-full md:w-1/2 space-y-12">
            <div>{Gov}</div>
            <div className="space-y-4 text-md">
              <div>MoneyHelper is provided by:</div>
              {MAPS}
            </div>
          </div>
          <div className="py-8 w-full md:w-1/2 md:flex md:items-center px-4 bg-gray-100">
            <div className="flex flex-col lg:flex-row items-center gap-8 mx-auto">
              <div>{W3C}</div>
              <div>{Lang}</div>
              <a
                className="flex items-center space-x-2 text-pink-800 underline"
                href="https://www.moneyhelper.org.uk/en/contact-us/report-accessibility-problem"
              >
                {Accessibility}
                <div>Report an accessibility problem</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-sm">
        <div className="container mx-auto p-10 space-y-3">
          <div className="text-white">
            © {new Date().getFullYear()} Money and Pensions Service, 120
            Holborn, London EC1N 2TD. All rights reserved.
          </div>
          <div>
            <ul className="md:flex md:divide-x">
              <FooterLink
                href="https://www.moneyhelper.org.uk/en/about-us/terms-and-conditions"
                title="Terms &amp; conditions"
              />
              <FooterLink
                href="https://www.moneyhelper.org.uk/en/about-us/privacy-notice"
                title="Privacy notice"
              />
              <FooterLink
                href="https://www.moneyhelper.org.uk/en/about-us/accessibility"
                title="Accessibility"
              />
              <FooterLink
                href="https://www.moneyhelper.org.uk/en/sitemap"
                title="Sitemap"
              />
              <FooterLink
                href="https://www.moneyhelper.org.uk/en/about-us/cookie-policy"
                title="Cookies"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
