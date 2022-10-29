import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState, USERTODOLIST_KEY } from "../atoms";

const TodoForm = styled.form`
  display: flex;
  align-items: center;
  margin: 20px 0;
  background-color: white;
  border-radius: 5rem;
  height: 30px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0.8rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  border: none;
  background-color: transparent;
  color: #ff94f6;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    color: #fa10e6;
  }
`;

interface IForm {
  //form의 인터페이스
  toDo: string;
}

function CreateToDo() {
  const toDosSave = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  localStorage.setItem(USERTODOLIST_KEY, JSON.stringify(toDosSave));
  return (
    <TodoForm onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "할일을 써주세요",
        })}
        placeholder="Write a to do"
      />
      <Button>Add</Button>
    </TodoForm>
  );
}

export default CreateToDo;
