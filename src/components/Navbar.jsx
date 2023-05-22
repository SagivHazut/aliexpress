import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import logonobackground from "../image/logonobackground.png";
function navNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const [isToggled, setIsToggled] = useState(() =>
    JSON.parse(localStorage.getItem("isToggled"))
  );
  const [isToggled1, setIsToggled1] = useState(() =>
    JSON.parse(localStorage.getItem("isToggled1"))
  );
  const [isToggled2, setIsToggled2] = useState(() =>
    JSON.parse(localStorage.getItem("isToggled2"))
  );
  const [isToggled3, setIsToggled3] = useState(() =>
    JSON.parse(localStorage.getItem("isToggled3"))
  );
  const [isToggled4, setIsToggled4] = useState(() =>
    JSON.parse(localStorage.getItem("isToggled4"))
  );
  const [isToggled5, setIsToggled5] = useState(() =>
    JSON.parse(localStorage.getItem("isToggled5"))
  );

  useEffect(() => {
    localStorage.setItem("isToggled", JSON.stringify(isToggled));
    localStorage.setItem("isToggled1", JSON.stringify(isToggled1));
    localStorage.setItem("isToggled2", JSON.stringify(isToggled2));
  }, [isToggled, isToggled1, isToggled2]);

  const handleToggle = () => {
    setIsToggled(true);
    setIsToggled1(false);
    setIsToggled2(false);
    setIsToggled3(false);
    setIsToggled4(false);
    setIsToggled5(false);
  };
  const handleToggle1 = () => {
    setIsToggled(false);
    setIsToggled1(true);
    setIsToggled2(false);
    setIsToggled3(false);
    setIsToggled4(false);
    setIsToggled5(false);
  };
  const handleToggle2 = () => {
    setIsToggled(false);
    setIsToggled1(false);
    setIsToggled2(true);
    setIsToggled3(false);
    setIsToggled4(false);
    setIsToggled5(false);
  };
  const handleToggle3 = () => {
    setIsToggled(false);
    setIsToggled1(false);
    setIsToggled2(false);
    setIsToggled3(true);
    setIsToggled4(false);
    setIsToggled5(false);
  };
  const handleToggle4 = () => {
    setIsToggled(false);
    setIsToggled1(false);
    setIsToggled2(false);
    setIsToggled3(false);
    setIsToggled4(true);
    setIsToggled5(false);
  };
  const handleToggle5 = () => {
    setIsToggled(false);
    setIsToggled1(false);
    setIsToggled2(false);
    setIsToggled3(false);
    setIsToggled4(false);
    setIsToggled5(true);
  };

  const navigation = [
    {
      name: "Hot Deals",
      href: "/",
      onClick: handleToggle,
      current: isToggled,
    },
    {
      name: "Higher Commission",
      href: "/HigherCommission",
      onClick: handleToggle1,
      current: isToggled1,
    },
    {
      name: "Featured Products",
      href: "/Featured",
      onClick: handleToggle3,
      current: isToggled3,
    },
    {
      name: "Our Recommendation",
      href: "/Recommendation",
      onClick: handleToggle4,
      current: isToggled4,
    },
    {
      name: "Campaign Banner",
      href: "/CampaignBanner",
      onClick: handleToggle5,
      current: isToggled5,
    },
  ];
  return (
    <>
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-1 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logonobackground}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-12 w-19 lg:block"
                      src={logonobackground}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-10 sm:block">
                    <div className="flex space-x-9">
                      {navigation.map((item) => (
                        <NavLink
                          onClick={() => item.onClick()}
                          key={item.name}
                          to={item.href}
                          className={navNames(
                            item.current
                              ? "bg-gray-600 text-white"
                              : "text-gray-100 hover:bg-gray-100 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={navNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};