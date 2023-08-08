/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { AnchorHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import type { DetailedHTMLProps, ReactNode } from 'react';
import { Link, LinkProps, matchPath, useLocation } from 'react-router-dom';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import useDimensions from 'react-cool-dimensions';
import styles from './SideNavigation.module.css';

interface SideNavigationProps {
	expand: 'left' | 'right';
	children: ReactNode;
	style?: React.CSSProperties;
}

const navMap: Record<string, number> = {
	'/*': 0,
	'/events/*': 1,
	'/chats/*': 2
};

function SideNavigation({ style, expand, children }: SideNavigationProps) {
	const [expanded, setExpanded] = useState(true);
	const [value, setValue] = useState<string | undefined>(undefined);
	const { observe, width } = useDimensions();
	const location = useLocation();
	const [current, setCurrent] = useState<string | undefined>(undefined);

	useEffect(() => {
			Object.keys(navMap).forEach((key) => {
				const match = matchPath({ path: key, end: false,  caseSensitive: false}, location.pathname);
				if (match) {
					const index = navMap[key].toString()
					setValue(index);
					setCurrent(index);
				}
			});
	}, [location.pathname]);

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
						style={{ justifyContent: expand === 'right' ? 'flex-end' : 'flex-start' }}
						type="button"
						title="collapse side menu"
					>
						{expanded && expand === 'left' ? (
							<ArrowLongRightIcon width="30px" />
						) : expanded && expand === 'right' ? (
							<ArrowLongLeftIcon width="30px" />
						) : expand === 'left' ? (
							<ArrowLongLeftIcon width="30px" />
						) : (
							<ArrowLongRightIcon width="30px" />
						)}
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
