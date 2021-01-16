import {useSelector} from 'react-redux';

import translate from '../Lang/translate';
import './TodoListItem.scss';

const TodoListItem = (props) => {
  const {id, text, completed, priority, priorityOptions, handleRemove, handleComplete, isDragged} = props;
  const language = useSelector(state => state.language);
  return (
    <div id={id} className={`todo_listItem ${completed ? 'completed' : ''} ${isDragged ? 'dragged' : ''}`}>
      <input type="checkbox" id={`completed_${id}`} checked={completed} onChange={() => handleComplete(id)} />
      <label htmlFor={`completed_${id}`}>{text}</label>
      <span className={`priority_${priority}`}>{translate(priorityOptions[priority], language)}</span>
      <button onClick={() => handleRemove(id)}>×</button>
    </div>
  )
}

export default TodoListItem;