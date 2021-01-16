import {useState, useEffect} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';

import TodoListItem from '../TodoListItem';
import Lang from '../Lang';
import translate from '../Lang/translate';
import {saveData, getData} from '../../services/database';

import './TodoList.scss';

// Estados de prioridad
const PRIORITY_OPTIONS = ['PRIORITY_0', 'PRIORITY_1', 'PRIORITY_2'];

// Idenficador de todoList en localStorage
const todoList_ID = 'TODOLIST_DB';

const TodoList = () => {
	// Lista de todos los todos
	const todoListDB = getData(todoList_ID);
	const defaultTodoList = todoListDB ? todoListDB : [];
	const [todoList, setTodoList] = useState(defaultTodoList);

	// Cargar idioma
	const language = useSelector(state => state.language);

	// Comprueba cambios en el campo Texto del todo nuevo
	const [todoText, setTodoText] = useState('');
	const handleChangeTodoText = (event) => {
		const inputValue = event && event.target && event.target.value ? event.target.value : '';
		setTodoText(inputValue);
	}

	// Comprueba cambios en el campo Prioridad del todo nuevo
	const [todoPriority, setTodoPriority] = useState(0);
	const handleChangeTodoPriority = (event) => {
		const inputValue = event && event.target && event.target.value ? event.target.value : '';
		setTodoPriority(inputValue);
	}

	// Validar error en el campo Texto
	const [textError, setTextError] = useState(false);

	// Añadir un nuevo todo
	const addTodo = (text, priority) => {
		return {
			id: +new Date(),
			text: text,
			completed: false,
			priority: priority,
		};
	};
	const handleAddTodo = (event) => {
		event.preventDefault();
		if(todoText !== ''){
			const todo = addTodo(todoText, todoPriority);
			setTodoList([...todoList, todo]);
			setTodoText('');
			setTextError(false);
		} else {
			setTextError(true);
		}
	}

	// Borrar un nuevo todo
	const deleteTodo = (id) => {
		const newTodoList = todoList.filter(todo => todo.id !== id);
		setTodoList(newTodoList);
	};

	// Completar un nuevo todo
	const completeTodo = (id) => {
		const todo = todoList.filter(todo => todo.id === id);
		const todoListWithout = todoList.filter(todo => todo.id !== id);
		if(todo[0].completed) {
			todo[0].completed = false;
			setTodoList([todo[0], ...todoListWithout]);
		} else {
			todo[0].completed = true;
			setTodoList([...todoListWithout, todo[0]]);
		}
	};

	// Reordenar todo en su posición final
	const reorderTodo = (result) => {
      if (!result.destination) return;
      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;
		const draggingTodo = todoList[sourceIndex];
		const todosNoDragging = todoList.filter((t,i) => i !== sourceIndex);
      setTodoList([
        ...todosNoDragging.slice(0, destinationIndex),
        draggingTodo,
        ...todosNoDragging.slice(destinationIndex)
		]);
		removeMarginToCompletedList();
	}

	// Funciones para arreglar bug de Drag&Drop
	const addMarginToCompletedList = () => {
		document.querySelector('.completed_todoList').style.marginTop = '62px';
	}
	const removeMarginToCompletedList = () => {
		document.querySelector('.completed_todoList').style.marginTop = '0';
	}

	// Actualizar el localStorage de todoList
	useEffect(() => {
		saveData(todoList_ID, todoList);
	 }, [todoList]);

	return (
		<>
			<form onSubmit={handleAddTodo} className="newTodoForm">
				<input
					type="text"
					name="todoText"
					id="todoText"
					value={todoText}
					placeholder={textError ? translate('TEXT_PLACEHOLDER_ERROR', language) : translate('TEXT_PLACEHOLDER', language)}
					className={textError ? 'error': ''}
					onChange={handleChangeTodoText}
				/>
				<select onChange={handleChangeTodoPriority}>
					{PRIORITY_OPTIONS.map((priority, id) => {
						return <option key={id} value={id}>{translate(priority, language)}</option>
					})}
				</select>
				<button><Lang text="GENERIC_ADD" /></button>
			</form>
			<DragDropContext onDragStart={addMarginToCompletedList} onDragEnd={reorderTodo}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{todoList.map((todoItem, i) => {
								const {id, text, completed, priority} = todoItem;
								if(!completed) {
									return (
										<Draggable key={id} draggableId={String(id)} index={i}>
											{(provided, snapshot) => (
												<div className="draggable_item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<TodoListItem
														key={id}
														id={id}
														text={text}
														completed={completed}
														priority={priority}
														priorityOptions={PRIORITY_OPTIONS}
														handleRemove={deleteTodo}
														handleComplete={completeTodo}
														isDragged={snapshot.isDragging}
													/>
												</div>
											)}
										</Draggable>
									);
								}
								return null;
							})}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<div className="completed_todoList">
				<h2><Lang text="GENERIC_COMPLETED" /></h2>
				{todoList.map((todoItem) => {
					const {id, text, completed, priority} = todoItem;
					if(completed) {
						return (
							<TodoListItem
								key={id}
								id={id}
								text={text}
								completed={completed}
								priority={priority}
								priorityOptions={PRIORITY_OPTIONS}
								handleRemove={deleteTodo}
								handleComplete={completeTodo}
							/>
						);
					}
					return null;
				})}
			</div>
		</>
	)
}

export default TodoList;