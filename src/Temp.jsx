import { useMemo } from 'react';
import { useStore } from './store/store';
import { shallow } from 'zustand/shallow';

const Temp = ({ state }) => {
	/* 
	One way to filter just what you need from the store.
	using the useMemo hook.

  const tasks = useStore((store) => store.tasks);
	
	 const filtered = useMemo(
	 	() => tasks.filter((task) => task.state === state),
	 	[tasks, state]
	 	);
 */

	// An even better way to do it:
	const tasks = useStore(
		(store) => store.tasks.filter((task) => task.state === state),
		shallow
	);
	return <div>Temp</div>;
};

export default Temp;
