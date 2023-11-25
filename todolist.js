const inputBook = [];

function hapusTampilan() {
  const divBelumSelesai = document.getElementById("incompleteBookshelfList");
  while (divBelumSelesai.firstChild) {
    divBelumSelesai.removeChild(divBelumSelesai.firstChild);
  }
}

function inputValue(input) {}

function tampilanBelumSelesai() {
  hapusTampilan();
  for (let index = 0; index < inputBook.length; index++) {
    const input = inputBook[index];

    const article = document.createElement("article");

    const divBelumSelesai = document.getElementById("incompleteBookshelfList");
    divBelumSelesai.appendChild(article);

    article.setAttribute("class", "book_item");

    const h3 = document.createElement("h3");
    article.appendChild(h3);
    h3.textContent = input;

    const pPenulis = document.createElement("p");
    article.appendChild(pPenulis);
    pPenulis.textContent = input;

    const pTahun = document.createElement("p");
    article.appendChild(pTahun);

    pTahun.textContent = input;

    const divAction = document.createElement("div");
    article.appendChild(divAction);
    divAction.setAttribute("class", "action");

    const buttonBelumSelesai = document.createElement("button");
    divAction.appendChild(buttonBelumSelesai);
    buttonBelumSelesai.setAttribute("class", "green");

    buttonBelumSelesai.innerText = "Selesai Dibaca";

    const buttonHapus = document.createElement("button");
    divAction.appendChild(buttonHapus);
    buttonHapus.setAttribute("class", "red");

    buttonHapus.innerText = "Hapus Buku";

    const searchBook = document
      .getElementById("searchBook")
      .value.toLowerCase();
    if (input.toLowerCase().includes(searchBook)) {
      tampilanBelumSelesai();
    }
  }
}



document.getElementById("inputBook").onsubmit = function (even) {
  even.preventDefault();

  const title = document.getElementById("inputBookTitle").value;
  inputBook.push(title);

  const author = document.getElementById("inputBookAuthor").value;
  inputBook.push(author);

  const year = document.getElementById("inputBookYear").value;
  inputBook.push(year);
  document.getElementById("inputBook").reset();

  console.info(inputBook);
  tampilanBelumSelesai();
};

// const searchBook = document.getElementById("searchBook");

// searchBook.onkeyup = function () {
//   tampilanBelumSelesai();
// };

// searchBook.onkeydown = function () {
//   tampilanBelumSelesai();
// };
