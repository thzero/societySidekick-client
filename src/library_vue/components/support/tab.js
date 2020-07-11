class TabSupport {
	constructor() {
		this.currentTab = 0;
		this.tabs = [];
	}

	add(index, icon, label, enabled) {
		this.tabs.push({ index: index, icon: icon, label: label, enabled: enabled });
	}

	changeTab(val) {
		// this.logger.debug('currentTab', this.currentTab)
		// this.logger.debug('val', val)
		this.currentTab = val;
	}

	get tabsEnabled() {
		const iterator = [];
		for (const tab of this.tabs) {
			if (!tab.enabled)
				continue;
			iterator.push(tab);
		}
		return iterator;
	}
}

export default TabSupport;
