import _ from "lodash";

function component() {
  const element = document.createElement('div');

  element.innerHTML = "CIAO";

  return element;
}

document.body.appendChild(component());