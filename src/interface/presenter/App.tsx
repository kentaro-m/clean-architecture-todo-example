import React, { useState, useCallback, useEffect } from 'react';
import { Todo, Header, Layout } from './components'
import { TodoItemUseCase } from '../../usecase/TodoItemUseCase'
import { TodoItem } from '../../domain/TodoItem'
import { Container } from '@material-ui/core'

interface AppProps {
  useCase: TodoItemUseCase
}

const App = ({ useCase }: AppProps) => {
  const [todoItems, setTodoItems] = useState<TodoItem[] | null>(null)
  const [todoTitle, setTodoTitle] = useState<string>('')

  useEffect(() => {
    const todoListItems = useCase.findAll()
    setTodoItems(todoListItems)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value)
  }, [])

  const handleAddKeyDown = useCallback((event: React.KeyboardEvent) => {
    const ENTER_KEY_CODE = 13

    if (event.keyCode === ENTER_KEY_CODE) {
      const todoListItems = useCase.create(todoTitle)
      setTodoItems(todoListItems)
      setTodoTitle('')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoTitle])

  const handleDeleteClick = useCallback((id: number) => () => {
    const todoListItems = useCase.delete(id)
    setTodoItems(todoListItems)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCompleteClick = useCallback((id: number) => () => {
    const todoListItems = useCase.update(id)
    setTodoItems(todoListItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <Header />
      <Container maxWidth="sm">
        <Todo
          todoItems={todoItems}
          todoTitle={todoTitle}
          onInputChange={handleInputChange}
          onAddKeyDown={handleAddKeyDown}
          onCompleteClick={handleCompleteClick}
          onDeleteClick={handleDeleteClick}
        />
      </Container>
    </Layout>
  );
}

export default App;
