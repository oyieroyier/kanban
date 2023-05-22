import { shallow } from 'zustand/shallow';
import { useStore } from '../../store/store';
import { useThemes } from '../../store/themes';
import Task from '../task/Task';
import './Column.css';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import classNames from 'classnames';

const Column = ({ state }) => {
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);
	const [drop, setDrop] = useState(false);

	const backgroundColor = useThemes((theme) => theme.background);

	const addTask = useStore((store) => store.addTask);

	const tasks = useStore((store) =>
		store.tasks.filter((task) => task.state === state, shallow)
	);

	const draggedTask = useStore((store) => store.draggedTask);
	const setDraggedTask = useStore((store) => store.setDraggedTask);
	const moveTask = useStore((store) => store.moveTask);

	return (
		<div
			className={classNames('column', { drop: drop })}
			style={{
				background:
					state === 'PLANNED'
						? backgroundColor.PLANNED
						: state === 'ONGOING'
						? backgroundColor.ONGOING
						: backgroundColor.DONE,
			}}
			onDragOver={(e) => {
				setDrop(true);
				e.preventDefault();
			}}
			onTouchMove={(e) => {
				setDrop(true);
				e.preventDefault();
			}}
			onDragLeave={(e) => {
				setDrop(false);
				e.preventDefault();
			}}
			// onTouchCancel={(e) => {
			// 	setDrop(false);
			// 	e.preventDefault();
			// }}
			onDrop={(e) => {
				setDrop(false);
				setDraggedTask(null);
				moveTask(draggedTask, state);
			}}
			onTouchEnd={(e) => {
				setDrop(false);
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
					<div className="modal-content">
						<div className="modal-content-top">
							<p>Add a new task</p>
							<button onClick={() => setOpen(false)}>❌</button>
						</div>
						<form onSubmit={(e) => e.preventDefault()}>
							<textarea
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
								Add Task
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Column;
