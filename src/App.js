import React from 'react'
import TodoList from './components/TodoList'
import GlobalStyle from './components/GlobalStyle'

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <TodoList />
    </div>
  );
}

export default App;
