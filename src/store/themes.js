import { create } from 'zustand';

const themes = (set) => ({
	background: {
		PLANNED: '#5ffbf1',
		ONGOING: '#C25EA4',
		DONE: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
	},
});

export const useThemes = create(themes);
