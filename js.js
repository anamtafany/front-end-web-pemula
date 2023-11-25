document.addEventListener("DOMContentLoaded", function () {
  const submitInput = document.getElementById("inputBook");

  submitInput.addEventListener("submit", function (event) {
    event.preventDefault();

    formInput();
    document.getElementById("inputBook").reset();
  });

  function formInput() {
    const inputJudul = document.getElementById("inputBookTitle").value;
    const inputPenulis = document.getElementById("inputBookAuthor").value;
    const inputTahun = document.getElementById("inputBookYear").value;
    const cekSelesai = document.getElementById("inputBookIsComplete").Checked;

    const generatedID = generatedId();
    const inputObject = generateInputObject(
      generatedID,
      inputJudul,
      inputPenulis,
      inputTahun,
      false
    );
    form.push(inputObject);

    document.dispatchEvent(new Event(EVENT_BARU));
  }

  function generatedId() {
    return +new Date();
  }

  function generateInputObject(id, judul, penulis, tahun, Selesai) {
    return {
      id,
      judul,
      penulis,
      tahun,
      Selesai,
    };
  }

  const form = [];
  const EVENT_BARU = "event-input";

  document.addEventListener(EVENT_BARU, function () {
    console.log(form);
    // tampilanBelumSelesai();

    const belumSelesaiDibaca = document.getElementById(
      "incompleteBookshelfList"
    );
    belumSelesaiDibaca.innerHTML = "";

    // const selesaiDibaca = document.getElementById("completeBookshelfList");
    // selesaiDibaca.innerHTML = "";

    for (const formValue of form) {
      const formElement = belumSelesai(formValue);
      if (!formValue.tidakSelesai) {
        belumSelesaiDibaca.append(formElement);
      }
    }
  });

  function belumSelesai(inputObject) {
    const article = document.createElement("article");

    const divBelumSelesai = document.getElementById("incompleteBookshelfList");
    divBelumSelesai.appendChild(article);

    article.setAttribute("class", "book_item");

    const h3 = document.createElement("h3");
    article.appendChild(h3);
    h3.innerText = inputObject.judul;

    const pPenulis = document.createElement("p");
    article.appendChild(pPenulis);
    pPenulis.innerText = inputObject.penulis;

    const pTahun = document.createElement("p");
    article.appendChild(pTahun);

    pTahun.innerText = inputObject.tahun;

    const divAction = document.createElement("div");
    article.appendChild(divAction);
    divAction.setAttribute("class", "action");

    const buttonBelumSelesai = document.createElement("button");
    divAction.appendChild(buttonBelumSelesai);
    buttonBelumSelesai.setAttribute("class", "green");
    buttonBelumSelesai.setAttribute("id", "selesai");

    buttonBelumSelesai.innerText = "Selesai Dibaca";

    const buttonHapus = document.createElement("button");
    divAction.appendChild(buttonHapus);
    buttonHapus.setAttribute("class", "red");

    buttonHapus.innerText = "Hapus Buku";

    if (inputObject.tidakSelesai) {
      const selesaiDibaca = document.getElementById("selesai");

      selesaiDibaca.addEventListener("click", function () {
        pindahSelesaiDibaca(inputObject.id);
      });
    }

    function pindahSelesaiDibaca(inputId) {
      inpuTarget = findInput(inputId);

      if (inpuTarget == null) return;

      inpuTarget.tidakSelesai = true;

      document.dispatchEvent(new Event(EVENT_BARU));
    }

    function findInput(inputId) {
      for (const inputItem of inputObject) {
        if (inputItem.id === inputId) {
          return inputItem;
        }
      }
      return null;
    }
  }
});
