import styled from 'styled-components';
import clearImg from '../images/clear.svg'
import DeleteImg from '../images/delete.svg'
import EditImg from '../images/edit.svg'
import { useState, useRef } from 'react';

const TodoListWrapper = styled.div`
  margin: 100px auto 0 auto;
  width: 100%;
  max-width: 550px;
  background-color: #fff;
  box-shadow: 0 0 50px rgba(135, 135, 135, 0.1);
`
const FilterWrapper = styled.div`
  display: flex;
`
const FilterButton = styled.div`
  width: calc(100% / 3);
  line-height: 50px;
  text-align: center;
  color: #555555;
  background-color: #F9F9F9;
  transition: 0.3s;
  cursor: pointer;

  & + & {
    border-left: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
  }

  &:hover {
    background-color: #ffffff;
  }
`
const TodoItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 45px;
  height: 75px;
  font-size: 15px;
  color: #858585;
`
const UncompletedCount = styled.span`
  margin-right: 5px;
`
const ClearButton = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #E1E1E1;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #F9F9F9;
  }

  img {
    margin-right: 5px;
    width: 15px;
    height: 15px;
  }
`
const TodoItemWrapper = styled.div`
  max-height: 260px;
  overflow-y: auto;

  &::-webkit-scrollbar {
  width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #E3E3E3;
    border-radius: 20px;
  }
`
const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 45px;
  transition: 0.3s;

  &:hover {
    background-color: #F6F6F6;
  }
  &:hover Button{
    opacity: 1;
  }
`
const TodoItemContent = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 52px);
  height: 100%;
  color: #555555;
`
const TodoItemText = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 0.3s;

  input {
    margin-right: 15px;
  }

  ${props => props.$isDone && `
    text-decoration: line-through;
    color: #E1E1E1;
  `}
`
const TodoCheckbox = styled.div`
  position: relative;
  margin-right: 20px;
  height: 10px;
  width: 10px;
  border: 1px solid #BBBBBB;
  border-radius: 50%;
  transition: 0.3s;

  &::before {
    content: "";
    position: absolute;
    left: 0.5px;
    bottom: 4px;
    transform: rotate(-50deg);
    width: 15px;
    height: 2px;
    background-color: #858585;
    opacity: 0;
    transition: 0.3s;
  }
  &::after {
    content: "";
    position: absolute;
    left: -2px;
    bottom: 2px;
    transform: rotate(45deg);
    width: 7px;
    height: 2px;
    background-color: #858585;
    opacity: 0;
    transition: 0.3s;
  }
  ${props => props.$isDone && `
    border: 1px solid transparent;

    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
    }
  `}
`
const TodoButtonWrapper = styled.div`
  display: flex;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  outline: none;
  border: transparent;
  background-color: transparent;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }

  & + & {
    margin-left: 20px;
  }
`
const TodoItemInputField = styled.div`
  display: flex;
  border-top: 1px solid #ECECEC;
`
const TodoItemTextField = styled.input`
  padding: 0 25px;
  width: calc(100% - 60px);
  border: transparent;
  outline: none;
  font-size: 20px;
  color: #555555;

  ::placeholder {
    font-size: 20px;
    color: #DCDCDC;
  }
`
const AddButton = styled.button`
  width: 60px;
  height: 60px;
  border: transparent;
  border-left: 1px solid #ECECEC;
  background-color: transparent;
  color: #555555;
  font-family: 'Microsoft JhengHei';
  font-size: 30px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #F9F9F9;
  }
`

function SingleTodoItem({ todo, handleDeleteTodo, handleToggleIsDone }) {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id)
  }

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id)
  }

  return (
    <TodoItem>
      <TodoItemContent $data-todo-id={todo.id}>        
        <TodoItemText $isDone={todo.isDone} onClick={handleToggleClick}>
          <TodoCheckbox $isDone={todo.isDone} />
          <p>{todo.content}</p>          
        </TodoItemText>
      </TodoItemContent>
      <TodoButtonWrapper>
        <Button><img src={EditImg} alt=""/></Button>
        <Button onClick={handleDeleteClick}><img src={DeleteImg} alt=""/></Button>
      </TodoButtonWrapper>
    </TodoItem>
  )
}

export default function TodoList() {
  const [todos, setTodos] = useState([
    {id: 1, content: 'test content', isDone: true}, // 內建第一筆資料
    {id: 2, content: '未完成', isDone: false} // 內建第二筆資料
  ])
  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('all');
  const [counter, setCounter] = useState('0');
  let id = useRef(3) // 已經有內建 id: 2，所以初始值要從 3 開始

  function SendTodoContent(e) {
    if (!value) return // 未輸入文字就不能送出
    setTodos([
      {
        id: id.current,
        content: value
      }, ...todos
    ])
    setValue('')  // 做完就清空 setValue
    id.current++
  }
  const handleButtonClick = (e) => SendTodoContent(e)
  const handleInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      SendTodoContent()
    }
  }
  
  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)) 
    // filter 只會留下符合條件的東西，而 todo.id 一定等於 id，這代表不會留下任何東西，即可達成刪除功能
  }

  const handleToggleIsDone = id => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo // 如果這個 todo 不是要修改的 todo id 就回傳原本的 todo

      // 進入這一行就代表是要修改的 todo.id
      // 回傳原本的東西（...todo）+ 要修改的屬性（isDone: !todo.isDone）
      return {
        ...todo,
        isDone: !todo.isDone
      } 
    }))
  }

  const filterAllTodo = () => setFilter('all');
  const filterUncompeletedTodo = () => setFilter('uncomplete');
  const filterDoneTodo = () => setFilter('done');

  const clearDoneTodo = () => {
    setTodos(
      todos.filter(todo => todo.isDone !== true)
    ) 
  };

  return (
    <TodoListWrapper>
      <FilterWrapper>
        <FilterButton onClick={filterAllTodo}>全部</FilterButton>
        <FilterButton onClick={filterUncompeletedTodo}>未完成</FilterButton>
        <FilterButton onClick={filterDoneTodo}>已完成</FilterButton>
      </FilterWrapper>
      <TodoItemInfo>
        <p><UncompletedCount>{counter}</UncompletedCount>個未完成</p>
        <ClearButton onClick={clearDoneTodo}><img src={clearImg} alt=""/>移除已完成事項</ClearButton>
      </TodoItemInfo>
      <TodoItemWrapper>
        {
          todos.filter(todo => {
            if (filter === 'all') return todo
            if (filter === 'uncomplete') return !todo.isDone
            return todo.isDone
          }).map(todo => (
            <SingleTodoItem 
              key={todo.id} 
              todo={todo} 
              handleDeleteTodo={handleDeleteTodo} 
              handleToggleIsDone={handleToggleIsDone}
            />
          ))
        }
      </TodoItemWrapper>
      <TodoItemInputField>
        <TodoItemTextField type="text" placeholder="Add something to do here?" value={value} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
        <AddButton onClick={handleButtonClick}>+</AddButton>
      </TodoItemInputField>
    </TodoListWrapper>
  );
}
