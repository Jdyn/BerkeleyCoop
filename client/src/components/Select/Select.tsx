import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import * as SelectPrimative from "@radix-ui/react-select";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import styles from './Select.module.css'

const Select = ({children}: PropsWithChildren) => (
  <SelectPrimative.Root>
    <SelectPrimative.Trigger className={styles.trigger} aria-label="Food">
      <SelectPrimative.Value placeholder="Select a fruit…" />
      <SelectPrimative.Icon className={styles.icon}>
        <ChevronDownIcon />
      </SelectPrimative.Icon>
    </SelectPrimative.Trigger>
    <SelectPrimative.Portal>
      <SelectPrimative.Content className={styles.content}>
        <SelectPrimative.ScrollUpButton className={styles.scrollButton}>
          <ChevronUpIcon />
        </SelectPrimative.ScrollUpButton>
        <SelectPrimative.Viewport className={styles.viewport}>
          {children}
        </SelectPrimative.Viewport>
        <SelectPrimative.ScrollDownButton className={styles.scrollButton}>
          <ChevronDownIcon />
        </SelectPrimative.ScrollDownButton>
      </SelectPrimative.Content>
    </SelectPrimative.Portal>
  </SelectPrimative.Root>
);

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectPrimative.SelectItemProps & React.RefAttributes<HTMLDivElement>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimative.Item className={clsx(styles.item, className)} {...props} ref={forwardedRef}>
      <SelectPrimative.ItemText>{children}</SelectPrimative.ItemText>
      <SelectPrimative.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon width="18px" />
      </SelectPrimative.ItemIndicator>
    </SelectPrimative.Item>
  );
});

export default Select;
