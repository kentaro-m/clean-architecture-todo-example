import React, { useEffect, useState, useCallback } from 'react'
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, ListItemIcon, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TodoItemUseCase } from '../../usecase/todoItem/TodoItemUseCase'
import { TodoItem } from '../../domain/TodoItem'

interface TodoProps {
  useCase: TodoItemUseCase
}

export const Todo = ({ useCase }: TodoProps) => {
  const [todoItems, setTodoItems] = useState<TodoItem[] | null>(null)
  const [todoTitle, setTodoTitle] = useState<string>('')

  useEffect(() => {
    const todoListItems = useCase.findAll()
    setTodoItems(todoListItems)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value)
  }, [])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const ENTER_KEY_CODE = 13

    if (event.keyCode === ENTER_KEY_CODE) {

      const todoListItems = useCase.findAll()

      let id = 0

      if (todoListItems && todoListItems.length > 0) {
        todoListItems.sort((a, b) => {
          return b.id - a.id
        })

        id = todoListItems[0].id + 1
      }
    
      const todoItem = new TodoItem(id, todoTitle, false)
      useCase.create(todoItem)

      const updatedTodoListItems = useCase.findAll()
      setTodoItems(updatedTodoListItems)
      setTodoTitle('')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoTitle])

  const handleClick = useCallback((id: number) => () => {
    useCase.delete(id)

    const todoListItems = useCase.findAll()
    setTodoItems(todoListItems)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = useCallback((id: number) => () => {
    const todoItem = useCase.findByID(id)

    if (todoItem) {
      const updatedTodoItem = new TodoItem(todoItem.id, todoItem.title, !todoItem.isCompleted)
      useCase.update(updatedTodoItem)
      const updatedTodoListItems = useCase.findAll()
      setTodoItems(updatedTodoListItems)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <TextField
        id="standard-with-placeholder"
        label="Todo Item"
        placeholder="What needs to be done?"
        margin="normal"
        fullWidth
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={todoTitle}
      />
      <List component="nav">
        {
          todoItems &&
            todoItems.map((todoItem) => {
              return (
                <ListItem key={todoItem.id}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todoItem.isCompleted}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleToggle(todoItem.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={todoItem.title} />
                  <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={handleClick(todoItem.id)}>
                    <Delete />
                  </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
        }
      </List>
    </React.Fragment>
  )
}