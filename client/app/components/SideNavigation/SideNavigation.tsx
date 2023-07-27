import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigation } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";

import styles from "./SideNavigation.module.css";

interface SideNavigationProps {
  expand: "left" | "right";
  children: ReactNode[];
}

const SideNavigation = ({ expand, children = [] }: SideNavigationProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <NavigationMenu.Root
      className={styles.root}
      orientation="vertical"
      data-hover-expand={true}
      data-expanded={expanded}
    >
      <div className={styles.wrapper} data-expand={expand}>
        <div className={styles.list}>
          {children.map((child, index) => (
            <NavigationMenu.Item key={index} className={styles.listItem}>
              {child}
            </NavigationMenu.Item>
          ))}
        </div>
        <NavigationMenu.Item asChild>
          <button className={styles.collapse} onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        </NavigationMenu.Item>
      </div>
    </NavigationMenu.Root>
  );
};

export const SideNavigationLink = ({ to, children }: RemixLinkProps) => {
  const { location } = useNavigation();
  const isActive = location?.pathname === to;

  return (
    <NavigationMenu.Link active={isActive} asChild>
      <Link to={to}>{children}</Link>
    </NavigationMenu.Link>
  );
};

export default SideNavigation;
