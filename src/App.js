import {
  atom,
  atomFamily,
  selector,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";

export const Todos = atomFamily({
  key: "Todos",
  default: undefined,
});

export const TodoIds = atom({
  key: "TodoIds",
  default: [],
});

export const UpdateSingleTodo = selector({
  key: "UpdateTodoById",
  get: () => undefined, // Không dùng đến, nhưng buộc p có
  set: ({ set }, newTodo) => set(Todos(newTodo.id), newTodo),
});

const Button = () => {
  const items = [
    { id: 1, content: "foo" },
    { id: 2, content: "bar" },
  ];

  const onClick = useRecoilCallback(({ set }) => () => {
    items.forEach((item) => set(UpdateSingleTodo, item));
    set(
      TodoIds,
      items.map((item) => item.id)
    );
  });

  return <button onClick={onClick}>Load</button>;
};

const Todo = ({ id }) => {
  const item = useRecoilValue(Todos(id));
  return (
    <div>
      <p>{item.id}</p>
      <p>{item.content}</p>
    </div>
  );
};

const TodoList = () => {
  // ở đây m biết sẵn danh sách ID rồi đúng k? Lấy ra từ query client...
  const ids = useRecoilValue(TodoIds);
  console.log({ ids });

  return (
    <div>
      {ids.map((id) => (
        <Todo id={id} key={id} />
      ))}
    </div>
  );
};

function App() {
  return (
    <div>
      <Button />
      <TodoList />
    </div>
  );
}

export default App;
