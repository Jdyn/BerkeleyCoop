/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { AnchorHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { DetailedHTMLProps, ReactNode } from 'react';
import { Link, LinkProps, useMatches } from 'react-router-dom';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import useDimensions from 'react-cool-dimensions';
import styles from './SideNavigation.module.css';

interface SideNavigationProps {
	expand: 'left' | 'right';
	children: ReactNode;
	style?: React.CSSProperties;
	current?: string;
}

const navMap: Record<string, number> = {
	'/': 0,
	'/events': 1,
	'/chats': 2
};

function SideNavigation({ style, expand, children, current }: SideNavigationProps) {
	const [expanded, setExpanded] = useState(true);
	const matches = useMatches();
	const [value, setValue] = useState<string | undefined>(undefined);
	const { observe, width } = useDimensions();

	useEffect(() => {
		if (matches && matches.length > 0) {
			const index = navMap[matches[1].pathname];
			setValue(index.toString());
		}
	}, [matches]);

	return (
		<NavigationMenu.Root
			className={styles.root}
			style={style}
			orientation="vertical"
			data-hover-expand
			data-expanded={expanded}
			value={value}
			onValueChange={(newValue) => {
				setValue(() => {
					if (newValue) return newValue;
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
						{expanded && expand === 'left' ? (
							<ArrowLongRightIcon width="24px" />
						) : expanded && expand === 'right' ? (
							<ArrowLongLeftIcon width="24px" />
						) : expand === 'left' ? (
							<ArrowLongLeftIcon width="24px" />
						) : (
							<ArrowLongRightIcon width="24px" />
						)}
						<span>{expanded ? 'Collapse' : 'Expand'}</span>
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
					<NavigationMenu.Indicator className={styles.indicator} style={{ width: width - 20 }} />
				</NavigationMenu.List>
			</div>
		</NavigationMenu.Root>
	);
}

SideNavigation.defaultProps = {
	current: undefined,
	style: ''
};

export const SideNavigationLink = forwardRef<
	HTMLButtonElement,
	DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps, HTMLAnchorElement>
>(({ children, to, onClick }, ref) => (
	<NavigationMenu.Trigger ref={ref} asChild>
		<Link onClick={onClick} id={to.toString()} className={clsx(styles.listItem)} to={to}>
			{children}
		</Link>
	</NavigationMenu.Trigger>
));

export default SideNavigation;
