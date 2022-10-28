import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector } from "../atoms";
import CategoryList from "./CategoryList";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0 2rem;
  max-width: 30rem;
  margin: 10rem auto;

  hr {
    margin: 2rem auto;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  // console.log(toDos);
  const toDos = useRecoilValue(toDoSelector);

  return (
    <Container>
      <Title>To Dos</Title>
      <hr />
      <CategoryList />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
