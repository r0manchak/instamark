import { h, render } from "preact";
import Main from "./components/main";
import './styles/popup.scss';

console.log('hello world!');
render(<Main />, document.querySelector("#root"));
