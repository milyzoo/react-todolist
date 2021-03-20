import styled from 'styled-components';
import DeleteImg from '../images/delete.svg'
import EditImg from '../images/edit.svg'

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
const ModalWrapper = styled.div`
  z-index: 1;

  ${props => props.$modalIsOpen ? `display: block;` : `display: none;`}
`
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  width: 100%;
  max-width: 300px;
  height: 130px;
  background-color: #fff;
`
const CloseModalButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 3px;
    height: 15px;
    background-color: #000;
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 3px;
    height: 15px;
    background-color: #000;
  }
`
const ModalInfo = styled.div`
  display: flex;
  width: 100%;
`
const ModalContent = styled.input`
  margin-right: 15px;
  padding: 5px;
  width: calc(100% - 50px);
  border: transparent;
  border-bottom: 1px solid #000;
  outline: none;
  font-size: 20px;
`
const ModalDoneButton = styled.button`
  width: 80px;
  border: 1px solid #858585;
  border-radius: 20px;
  background-color: transparent;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {    
    background-color: #E3E3E3;
  }
`

export default function SingleTodoItem({ todo, handleDeleteTodo, handleToggleIsDone, modalIsOpen, handleModalClose, handelModalOpen }) {
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id)
  }

  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id)
  }

  const handleEditClick = () => {
    handelModalOpen()
  }

  const handleCloseEdit = () => {
    handleModalClose()
  }

  return (
    <TodoItem>
      <ModalWrapper $modalIsOpen={modalIsOpen}>
        <ModalBackground />
        <Modal>
          <CloseModalButton onClick={handleCloseEdit} />
          <ModalInfo>
            <ModalContent ></ModalContent>
            <ModalDoneButton>確定</ModalDoneButton>
          </ModalInfo>
        </Modal>
      </ModalWrapper>
      <TodoItemContent $data-todo-id={todo.id}>        
        <TodoItemText $isDone={todo.isDone} onClick={handleToggleClick}>
          <TodoCheckbox $isDone={todo.isDone} />
          <p>{todo.content}</p>          
        </TodoItemText>
      </TodoItemContent>
      <TodoButtonWrapper>
        <Button onClick={handleEditClick}><img src={EditImg} alt=""/></Button>
        <Button onClick={handleDeleteClick}><img src={DeleteImg} alt=""/></Button>
      </TodoButtonWrapper>
    </TodoItem>
  )
}