export default {
  setInputError: function(input, inputDiv, button, messaggio) {
    var inp = input;
    var inpDiv = inputDiv;
    var mess = messaggio;
    var but = button;

    if (!inp.classList.contains("is-danger")) {
      inp.classList.add("is-danger");
      but.classList.add("is-danger");

      var newP = document.createElement("p");
      newP.innerText = mess;

      newP.classList.add("wth_danger_text");
      newP.classList.add("has-text-danger");
      newP.classList.add("has-text-centered");

      inpDiv.insertAdjacentElement("afterend", newP);
    }
  },

  removeInputError: function(input, inputDiv, button) {
    var inp = input;
    var inpDivParent = inputDiv.parentNode;
    var but = button;

    if (inp.classList.contains("is-danger")) {
      inp.classList.remove("is-danger");
      but.classList.remove("is-danger");

      var error = inpDivParent.querySelector(".wth_danger_text");
      error.remove();
    }
  }
};
