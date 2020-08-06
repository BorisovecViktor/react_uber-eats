import React from "react";

import MenuDish from "./MenuDish";

interface Props {
  menuSection: Section;
  currency: string;
}

const MenuSection: React.FC<Props> = ({ menuSection, currency }) => {
  return (
    <div className="menu__section">
      <h2 className="menu__title">{menuSection.title}</h2>
      <div className="menu__container">
        {menuSection.itemUuids.map(uuid => (
          <MenuDish
            key={uuid}
            uuid={uuid}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
