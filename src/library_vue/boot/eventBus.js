import Vue from 'vue';

const EventBus = new Vue();

export default async ({
	Vue
}) => {
	Vue.prototype.$EventBus = EventBus;
};
