import React, { useState, useCallback, useEffect } from 'react'
import { Todo, Header, Layout } from '../../view'
import { TodoItemUseCase } from '../../usecase/TodoItemUseCase'
import { TodoItem } from '../../domain/TodoItem'
import { Container } from '@material-ui/core'

interface AppProps {
  useCase: TodoItemUseCase
}

const App = ({ useCase }: AppProps): JSX.Element => {
  const [todoItems, setTodoItems] = useState<TodoItem[] | null>(null)
  const [todoTitle, setTodoTitle] = useState<string>('')

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const todoListItems = await useCase.findAll()
        setTodoItems(todoListItems)
      } catch (error) {
        // TODO: Add codes to handle errors
        console.log(error)
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value)
    },
    []
  )

  const handleAddKeyDown = useCallback(
    async (event: React.KeyboardEvent) => {
      const ENTER_KEY_CODE = 13

      if (event.keyCode === ENTER_KEY_CODE) {
        try {
          const todoListItems = await useCase.create(todoTitle)
          setTodoItems(todoListItems)
          setTodoTitle('')
        } catch (error) {
          // TODO: Add codes to handle errors
          console.log(error)
        }
      }
    },
    [todoTitle] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const handleDeleteClick = useCallback(
    (id: number) => async (): Promise<void> => {
      try {
        const todoListItems = await useCase.delete(id)
        setTodoItems(todoListItems)
      } catch (error) {
        // TODO: Add codes to handle errors
        console.log(error)
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const handleCompleteClick = useCallback(
    (id: number) => async (): Promise<void> => {
      try {
        const todoListItems = await useCase.update(id)
        setTodoItems(todoListItems)
      } catch (error) {
        // TODO: Add codes to handle errors
        console.log(error)
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

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
  )
}

export default App
