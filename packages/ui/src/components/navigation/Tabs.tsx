import {
	Tabs as BaseTabs,
	type TabListProps,
	type TabsRootProps,
} from "@heroui/react";
import type React from "react";

const TabsRoot = BaseTabs;

const TabList: React.FC<TabListProps> = (props) => {
	return (
		<TabsRoot.ListContainer>
			<TabsRoot.List {...props}>{props.children}</TabsRoot.List>
		</TabsRoot.ListContainer>
	);
};

const TabsImpl: React.FC<TabsRootProps> = (props) => {
	return <TabsRoot {...props}>{props.children}</TabsRoot>;
};

const Tabs = Object.assign(TabsImpl, {
	displayName: "Tabs",
	Icon: TabsRoot.Indicator,
	List: TabList,
	Panel: TabsRoot.Panel,
	Separator: TabsRoot.Separator,
	Tab: TabsRoot.Tab,
});

export { Tabs };
