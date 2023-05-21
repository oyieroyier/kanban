import { shallow } from 'zustand/shallow';
import { useStore } from '../../store/store';
import Task from '../task/Task';
import './Column.css';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const Column = ({ state }) => {
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);

	const addTask = useStore((store) => store.addTask);

	const tasks = useStore((store) =>
		store.tasks.filter((task) => task.state === state, shallow)
	);

	const draggedTask = useStore((store) => store.draggedTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const moveTask = useStore((store) => store.moveTask);

	return (
		<div
			className="column"
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				setDraggedTask(null);
				moveTask(draggedTask, state);
			}}
		>
			<div className="title-wrapper">
				<p>{state}</p>
				<button
					onClick={() => {
						setOpen(true);
					}}
				>
					<FaPlus />
				</button>
			</div>
			{tasks.map((task) => (
				<Task title={task.title} key={task.title} />
			))}
			{open && (
				<div className="modal">
					<h4>{tasks.state}</h4>
					<div className="modal-content">
						<input
							type="text"
							onChange={(e) => setText(e.target.value)}
							value={text}
						/>
						<button
							onClick={() => {
								addTask(text, state);
								setText('');
								setOpen(false);
							}}
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Column;
