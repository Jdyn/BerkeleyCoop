import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import type { DetailedHTMLProps, ReactNode } from "react";
import { forwardRef, useState } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./SideNavigation.module.css";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import useDimensions from "react-cool-dimensions";

interface SideNavigationProps {
  expand: "left" | "right";
  children: ReactNode;
  style?: React.CSSProperties;
  current?: string;
}

const SideNavigation = ({ style, expand, children, current }: SideNavigationProps) => {
  const [expanded, setExpanded] = useState(true);
  const [value, setValue] = useState<string | undefined>(undefined);
  const { observe, width } = useDimensions();

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
      <div className={styles.wrapper} data-expand={expand} ref={observe}>
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
        <NavigationMenu.List className={styles.list}>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <NavigationMenu.Item
                  key={index}
                  value={`${index}`}
                  asChild
                  className={clsx(value === index.toString() && styles.active)}
                >
                  <NavigationMenu.Link asChild>{child}</NavigationMenu.Link>
                </NavigationMenu.Item>
              ))
            : children}
          <NavigationMenu.Indicator className={styles.indicator} style={{ width: width - 20 }}>
            {/* <ChevronRightIcon width="24px" /> */}
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
      </div>
    </NavigationMenu.Root>
  );
};

export const SideNavigationLink = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps, HTMLAnchorElement>
>(({ children, to, onClick }, ref) => {
  return (
    <NavigationMenu.Trigger ref={ref} asChild>
      <Link onClick={onClick} id={to.toString()} className={clsx(styles.listItem)} to={to}>
        {children}
      </Link>
    </NavigationMenu.Trigger>
  );
});

export default SideNavigation;
