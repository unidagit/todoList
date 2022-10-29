import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "../atoms";
import CategoryList from "./CategoryList";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 3rem;
  max-width: 30rem;
  margin: 10rem auto;
  border: 0.5px solid white;
  border-radius: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 50px;
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  // console.log(toDos);
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Container>
      <Title>오늘의 할일</Title>

      <CategoryList />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
