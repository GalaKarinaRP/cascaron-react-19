import React from "react";
import { FaGenderless } from "react-icons/fa";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../css/sidebarContent.css";
import {
  MdChevronRight,
  MdDevices,
  MdInventory,
  MdPeople,
  MdStorefront,
} from "react-icons/md";
export const Content = ({ isMobileOrTablet }) => {

  console.log(isMobileOrTablet);
  
  const { routes = [], profileId } = useSelector((state) => state.auth);

  const getIcon = (path) => {
    switch (path) {
      case "vinculacion-documentos":
        return <MdPeople className="text-gray-600" size={20} />;
      case "gestion-documentos":
        return <MdInventory className="text-gray-600" size={20} />;
      default:
        return <MdChevronRight className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="sidebarContent">
      <Menu>
        {routes.length > 0 &&
          routes.map((route, index) => (
            <MenuItem key={`${route.path}-${index}`}>
              <NavLink
                className={({ isActive }) =>
                  "nav-item nav-link" + (isActive ? " active" : "")
                }
                to={`/${route.path}`}
              >
                {getIcon(route.path)}
                  <span className="ms-4">{route.label}</span>
               
              </NavLink>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
