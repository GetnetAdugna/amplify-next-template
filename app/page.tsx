import "./../app/app.css";
import ToDoComponent from "./components/ToDoComponent";
// import { getFetchUserAttr } from '../utils/utils';
// import ToDoComponent from "./components/ToDoComponent";
// import { redirect } from "next/navigation";

export default async function App() {
  // const user = await getFetchUserAttr()
  // console.log("UserAuth:", user)
  // if (!user) {
  //   redirect("/signin")
  // }

  return (
    <main>
      <h1>Hello</h1>
      <ToDoComponent />
    </main>
  );
}
