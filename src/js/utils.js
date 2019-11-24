export default {
  setInputError: function(input, inputDiv, messaggio) {
    var inp = input;
    var inpDiv = inputDiv;
    var mess = messaggio;

    if (!inp.classList.contains("is-danger")) {
      inp.classList.add("is-danger");

      var newP = document.createElement("p");
      newP.innerText = mess;

      newP.classList.add("wth_danger_text");
      newP.classList.add("has-text-danger");
      newP.classList.add("has-text-centered");

      inpDiv.insertAdjacentElement("afterend", newP);
    }
  },

  removeInputError: function(input, inputDiv) {
    var inp = input;
    var inpDivParent = inputDiv.parentNode;

    if (inp.classList.contains("is-danger")) {
      inp.classList.remove("is-danger");

      var error = inpDivParent.querySelector(".wth_danger_text");
      error.remove();
    }
  }
};
