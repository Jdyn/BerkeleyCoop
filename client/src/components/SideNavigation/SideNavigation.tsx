import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { DetailedHTMLProps, ReactNode } from "react";
import { forwardRef, useState } from "react";
import { Link, LinkProps, useMatches } from "react-router-dom";
import styles from "./SideNavigation.module.css";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

interface SideNavigationProps {
  expand: "left" | "right";
  children: ReactNode;
  style?: React.CSSProperties;
	current?: string;
}

const SideNavigation = ({ style, expand, children, current }: SideNavigationProps) => {
  const [expanded, setExpanded] = useState(true);
  const [value, setValue] = useState<string | undefined>(undefined);
	console.log(current)
  return (
    <NavigationMenu.Root
      className={styles.root}
      style={style}
      orientation="vertical"
      data-hover-expand={true}
      data-expanded={expanded}
      value={value}
      onValueChange={(value) => {
        setValue(() => {
          if (value) return value;

          return current;
        });
      }}
    >
      <NavigationMenu.List className={styles.wrapper} data-expand={expand}>
        <NavigationMenu.Item asChild>
          <button
            className={styles.collapse}
            onClick={() => setExpanded((prev) => !prev)}
            type="button"
          >
            {expanded && expand === "left" ? (
              <ArrowLongRightIcon width="24px" />
            ) : expanded && expand === "right" ? (
              <ArrowLongLeftIcon width="24px" />
            ) : expand === "left" ? (
              <ArrowLongLeftIcon width="24px" />
            ) : (
              <ArrowLongRightIcon width="24px" />
            )}
            <span>{expanded ? "Collapse" : "Expand"}</span>
          </button>
        </NavigationMenu.Item>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <NavigationMenu.Item
                key={index}
                value={`${index}`}
                // onClick={() => setCurrent(`${index}`)}
								asChild
                className={clsx(value === index.toString() && styles.active)}
              >
                <NavigationMenu.Link asChild>{child}</NavigationMenu.Link>
              </NavigationMenu.Item>
            ))
          : children}
        <NavigationMenu.Indicator className={styles.indicator}>
          {/* <ChevronRightIcon width="24px" /> */}
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export const SideNavigationLink = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps, HTMLAnchorElement>
>(({ children, to, onClick }, ref) => {
  const match = useMatches();
  const isActive = match.length > 1 && match[1].pathname === to;
  return (
    <NavigationMenu.Trigger ref={ref} asChild>
      <Link onClick={onClick} id={to.toString()} className={clsx(styles.listItem)} to={to}>
        {children}
      </Link>
    </NavigationMenu.Trigger>
  );
});

export default SideNavigation;
