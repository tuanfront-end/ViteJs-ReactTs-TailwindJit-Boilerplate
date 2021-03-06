import ButtonPrimary from "components/Button/ButtonPrimary";
import { NavItemType } from "data/navigation";
import React from "react";
import { NavLink } from "react-router-dom";

export interface NavigationItemProps {
  item: NavItemType;
  index: number;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, index }) => {
  const _renderMegaMenuItem = (
    value: {
      title: string;
      items: NavItemType[];
    },
    index: number
  ) => {
    return (
      <div className="smm-span-2" key={index}>
        <aside className="widget widget_nav_menu">
          <h3 className="text-base font-medium mb-3">{value.title}</h3>
          <div className="menu-mega-menu-4th-container">
            <ul className="menu space-y-2 text-gray-700 dark:text-gray-300">
              {value.items.map((menu: NavItemType, index: number) => {
                return (
                  <li
                    key={String(index)}
                    className="menu-item menu-item-type-taxonomy menu-item-object-product_cat menu-item-7095"
                  >
                    <a
                      className="hover:text-secondary"
                      href={menu.link}
                      target={menu.targetBlank ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {menu.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    );
  };

  const _renderMegamenu = (megaMenu: NavItemType["megaMenu"]) => {
    return (
      <div className="sub-menu absolute px-2 z-50 left-0 top-full w-full capitalize text-base">
        <ul className="bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 text-gray-900 dark:text-gray-100 md:p-12 xl:p-20">
          <li>
            <div className="smm-mega-menu">
              <div className="grid grid-cols-6">
                {megaMenu?.menuCols.map(_renderMegaMenuItem)}
                {megaMenu?.lastCol && (
                  <div className="smm-span-4 smm-last col-span-2 col-end-7">
                    <aside className="widget widget_text">
                      <h3 className="text-base font-medium mb-2">
                        {megaMenu?.lastCol.title}
                      </h3>
                      <div className="textwidget text-gray-500 dark:text-gray-400">
                        <p className="mb-3">{megaMenu.lastCol.text}</p>
                        <ButtonPrimary
                          targetBlank={megaMenu?.lastCol.button.targetBlank}
                          href={megaMenu.lastCol.button.link}
                        >
                          <span>{megaMenu?.lastCol.button.name}</span>
                          <i className="ml-2 las la-arrow-right"></i>
                        </ButtonPrimary>
                      </div>
                    </aside>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const _renderMenuChild = (item: NavItemType, className = "top-full w-52") => {
    return (
      <div className={`sub-menu absolute px-2 z-50 ${className}`}>
        <div className="bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 py-1">
          {item.children?.map((i, index) => (
            <div
              key={i.link + index}
              className="relative menu-item-has-children text-gray-900 dark:text-gray-100 uppercase text-xs font-medium"
            >
              <NavLink
                exact
                strict
                to={i.link}
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 tracking-wider"
                activeClassName="text-secondary"
              >
                {i.name}
                {i.children && (
                  <i className="ml-1 las la-angle-down transform scale-75"></i>
                )}
              </NavLink>
              {i.children && _renderMenuChild(i, "left-full w-52 -top-1")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    const isMegamenu = item.isMegamenu;
    return (
      <div
        key={String(index) + item.link}
        className={`${
          isMegamenu ? "" : "relative"
        } menu-item-has-children py-6`}
      >
        <NavLink
          exact
          strict
          className="inline-flex items-center p-2 xl:px-3 uppercase font-medium text-xs xl:text-sm opacity-95 hover:opacity-100"
          to={item.link}
          activeClassName="font-semibold opacity-100"
        >
          {item.name}
          {(item.children || item.isMegamenu) && (
            <i className="ml-1 text-xs las la-angle-down transform scale-75"></i>
          )}
        </NavLink>
        {!isMegamenu && item.children && _renderMenuChild(item)}
        {isMegamenu && _renderMegamenu(item.megaMenu)}
      </div>
    );
  };

  return _renderItem(item, index);
};

export default NavigationItem;
