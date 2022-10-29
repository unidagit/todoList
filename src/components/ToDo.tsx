import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo } from "../atoms";
import { toDoState } from "../atoms";

const ToDoLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* background-color: blue; */
  padding: 0 0 0 0.5em;
  margin: 1rem 0;
`;

const ToDoText = styled.span`
  display: inline-block;
  max-width: 30rem;
`;

const ButtonBox = styled.div``;

const Button = styled.button`
  width: 4em;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 0.5rem;
  border: none;
  background-color: #fd87f3;
  margin: 5px 0 5px 5px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    // console.log(event.currentTarget.name);
    // event.currentTarget.name;  event를 통해서 버튼의 name을 받아올수 있다
    setToDos((oldToDos) => {
      //setToDos를 사용하면 값을 즉시 변경하거나 or 현재값(oldToDos)을 인자로 주는 함수를 만들 수 있다
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //findIndex안에서는 조건을 만족하는 todo의 index를 찾아줄것이다
      //toDo의 id와 props에서 오는 id가 같은지 비교하면된다
      console.log(targetIndex);
      // const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any }; //클릭된 버튼의 카테고리를 가져야한다
      // console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const findIndex = oldToDos.findIndex((todo) => todo.id === id);
      return [
        ...oldToDos.slice(0, findIndex),
        ...oldToDos.slice(findIndex + 1),
      ];
    });
  };

  return (
    <ToDoLi>
      <ToDoText>{text}</ToDoText>
      {/* 카테고리가 DOING이 아니면 Doing 버튼을 보여준다. && 둘다 true이여야 함 */}
      <ButtonBox>
        {category !== Categories.DOING && (
          <Button name={Categories.DOING + ""} onClick={onClick}>
            Doing
          </Button>
        )}
        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO + ""} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE + ""} onClick={onClick}>
            Done
          </Button>
        )}

        <Button name={Categories.DELETE} onClick={deleteClick}>
          Delete
        </Button>
      </ButtonBox>
    </ToDoLi>
  );
}

export default ToDo;
