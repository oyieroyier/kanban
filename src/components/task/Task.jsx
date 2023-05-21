import classNames from 'classnames';
import './Task.css';
import { useStore } from '../../store/store';
import { FcFullTrash } from 'react-icons/fc';

const Task = ({ title }) => {
	const task = useStore((store) =>
		store.tasks.find((task) => task.title === title)
	);

	const setDraggedtask = useStore((store) => store.setDraggedTask);

	const deleteTask = useStore((store) => store.deleteTask);

	return (
		<div
			className="task"
			draggable
			onDragStart={() => setDraggedtask(task.title)}
		>
			<div>{task.title}</div>
			<div className="bottom-wrapper">
				<div>
					'
					<FcFullTrash
						className="delete-btn"
						role="button"
						onClick={() => deleteTask(task.title)}
					/>
				</div>
				<div className={classNames('status', task.state)}>{task.state}</div>
			</div>
		</div>
	);
};

export default Task;
