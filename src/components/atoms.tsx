import { atom, selector } from "recoil";

export interface IToDo {
  //toDo가 어떻게 생긴지를 알려줄 인터페이스
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; //3가지 옵션
}

//  toDos는 IToDo 객체로 이뤄진 배열이다
export const toDoState = atom<IToDo[]>({
  //toDoState는 toDo의 배열들.
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
