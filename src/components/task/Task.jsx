import classNames from 'classnames';
import './Task.css';
import { useStore } from '../../store/store';
import { FcFullTrash } from 'react-icons/fc';
import loading from '../../assets/Hourglass.gif';

const Task = ({ title }) => {
	const task = useStore((store) =>
		store.tasks.find((task) => task.title === title)
	);


	const setDraggedTask = useStore((store) => store.setDraggedTask);

	const deleteTask = useStore((store) => store.deleteTask);

	return (
		<div
			className="task"
			draggable
			onDragStart={() => setDraggedTask(task.title)}
			onTouchStart={() => setDraggedTask(task.title)}
		>
			<div
				className="task-title"
				style={{
					textDecoration: task.state === 'DONE' ? 'line-through' : 'none',
				}}
			>
				{task.title}
			</div>
			<div className="bottom-wrapper">
				<div>
					<FcFullTrash
						className="delete-btn"
						role="button"
						onClick={() => deleteTask(task.title)}
					/>
				</div>
				<div className={classNames('status', task.state)}>
					{task.state === 'PLANNED' ? (
						`📆`
					) : task.state === 'ONGOING' ? (
						<img src={loading} alt="loading-gif" />
					) : (
						`✅`
					)}
				</div>
			</div>
		</div>
	);
};

export default Task;
