import React from 'react';
import { Todo } from './Todo'
import { TodoItemUseCase } from '../../usecase/todoItem/TodoItemUseCase'
import { Container, AppBar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bar: {
      padding: theme.spacing(1.5, 0),
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  }),
);


interface AppProps {
  useCase: TodoItemUseCase
}

const App = ({ useCase }: AppProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
      <Typography variant="h6" className={classes.title}>
        Todo App
      </Typography>
      </AppBar>
      <Container maxWidth="sm">
        <Todo useCase={useCase} />
      </Container>
    </div>
  );
}

export default App;
