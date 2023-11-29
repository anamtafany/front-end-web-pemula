const dataBuku = [];
const EVENT_BARU = "event-input";

const formInput = document.getElementById("input-buku");
const inputId = document.getElementById("id");
const edit = document.getElementById("edit");
const submitInputBuku = document.getElementById("submit-buku");
const inputJudul = document.getElementById("input-judul-buku");
const inputPenulis = document.getElementById("input-penulis-buku");
const inputTahun = document.getElementById("input-tahun-buku");
const cekSelesai = document.getElementById("input-buku-cekSelesai");
const belumSelesaiDibaca = document.getElementById(
  "listBukuBelumSelesaiDibaca"
);
const selesaiDibaca = document.getElementById("listBukuSelesaiDibaca");
const UPDATE_DATA = "DATA_BUKU";
const STORAGE_KEY = "FORM_BUKU";
let isSearch = false;
const contenInput = document.querySelector(".content-input");
const h2Tambah = document.createElement("h2");
const buttonTambah = document.querySelector(".tambah");

const reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  isSearch = false;

  document.dispatchEvent(new Event(EVENT_BARU));
});

document.addEventListener("DOMContentLoaded", function () {
  if (cekStorage()) {
    ambilDataDariStorage();
  }

  h2Tambah.innerText = "Tambahkan Buku Baru";
  contenInput.appendChild(h2Tambah);
  contenInput.insertBefore(h2Tambah, contenInput.children[0]);
  document.dispatchEvent(new Event(EVENT_BARU));
  if (dataBuku == 0) {
    Swal.fire({
      title: "Belum Ada Data Buku!",
      text: "Silahkan tambahkan data buku.",
      icon: "info",
    });
  }
});

formInput.addEventListener("submit", function (event) {
  event.preventDefault();

  if (inputId.value) {
    const bukuIndex = dataBuku.findIndex((buku) => buku.id == inputId.value);

    dataBuku[bukuIndex].title = inputJudul.value;
    dataBuku[bukuIndex].author = inputPenulis.value;
    dataBuku[bukuIndex].year = Number(inputTahun.value);
    dataBuku[bukuIndex].isComplete = cekSelesai.checked;

    document.dispatchEvent(new Event(EVENT_BARU));
    formInput.reset();
    saveData();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Buku berhasil diedit",
      showConfirmButton: false,
      timer: 2500,
    });
    inputId.value = null;
  } else {
    const buku = {
      id: +new Date(),
      title: inputJudul.value,
      author: inputPenulis.value,
      year: Number(inputTahun.value),
      isComplete: cekSelesai.checked,
    };
    dataBuku.push(buku);

    document.dispatchEvent(new Event(EVENT_BARU));
    document.getElementById("input-buku").reset();
    saveData();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Anda berhasil menambah buku",
      showConfirmButton: false,
      timer: 2500,
    });
  }
  formInput.style.display = "none";
  tambah.innerText = "Tambah";
  h2Tambah.innerText = "Tambahkan Buku Baru";
  document.dispatchEvent(new Event(EVENT_BARU));
  console.log(dataBuku);
});

const formCari = document.getElementById("cari-buku");
const inputData = document.getElementById("cari-judul-buku");
formCari.addEventListener("submit", function (e) {
  e.preventDefault();

  isSearch = true;
  document.dispatchEvent(new Event(EVENT_BARU));
  formCari.reset();
  saveData();
});

document.addEventListener(EVENT_BARU, function () {
  belumSelesaiDibaca.innerHTML = "";

  selesaiDibaca.innerHTML = "";

  if (dataBuku.length > 0) {
    let bookSearch = dataBuku;
    if (isSearch) {
      bookSearch = dataBuku.filter(
        (book) =>
          book.title.toLowerCase().search(inputData.value.toLowerCase()) !=
            -1 ||
          book.author.toLowerCase().search(inputData.value.toLowerCase()) != -1
      );
    }

    if (bookSearch.length == 0) {
      Swal.fire({
        title: "Tidak Ada Buku!",
        text: "Buku yang anda cari tidak ditemukan",
        icon: "info",
      });
    } else {
      const bukuSelesaiDibaca = bookSearch.filter(
        (buku) => buku.isComplete == true
      );
      const bukuBelumSelesaiDibaca = bookSearch.filter(
        (buku) => buku.isComplete == false
      );

      if (bukuBelumSelesaiDibaca.length > 0) {
        bukuBelumSelesaiDibaca.forEach((buku) => {
          belum(buku);
        });
      }

      if (bukuSelesaiDibaca.length > 0) {
        bukuSelesaiDibaca.forEach((buku) => {
          sudah(buku);
        });
      }
    }
  }
  isSearch = false;
});

function findObjectBuku(id) {
  for (const idObject in dataBuku) {
    if (dataBuku[idObject].id === id) {
      return idObject;
    }
  }
  return -1;
}

function tampilkanEditBuku(buku) {
  const index = findObjectBuku(id);
  inputId.value = buku.id;
  inputJudul.value = buku.title;
  inputPenulis.value = buku.author;
  inputTahun.value = buku.year;
  cekSelesai.checked = buku.isComplete;
}

function editBuku(id, statusBuku) {
  const index = findObjectBuku(id);

  if (index !== -1) {
    const buku = {
      id: inputId.value,
      title: inputJudul.value,
      author: inputPenulis.value,
      year: Number(inputTahun.value),
      isComplete: cekSelesai.checked,
    };

    buku.isComplete = statusBuku;
  } else {
    const buku = {
      id: +new Date(),
      title: inputJudul.value,
      author: inputPenulis.value,
      year: inputTahun.value,
      isComplete: cekSelesai.checked,
    };

    buku.isComplete = statusBuku;

    document.dispatchEvent(new Event(EVENT_BARU));
  }
}

function hapusData(bukuId) {
  const bukuTarget = findIndexBuku(bukuId);

  if (bukuTarget === -1) return;

  dataBuku.splice(bukuTarget, 1);
  document.dispatchEvent(new Event(EVENT_BARU));
  saveData();
}

function findIndexBuku(bukuId) {
  for (const index in dataBuku) {
    if (dataBuku[index].id === bukuId) {
      return index;
    }
  }

  return -1;
}

function hapusBuku(buku, statusBuku) {
  Swal.fire({
    title: "Yakin Hapus Buku?",
    text: "Data buku akan dihapus!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "darkgreen",
    cancelButtonColor: "darkred",
    confirmButtonText: "Ya, Hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      hapusData(buku.id);
      buku.isComplete = statusBuku;
      document.dispatchEvent(new Event(EVENT_BARU));
      saveData();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Buku berhasil dihapus",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  });
}

function belum(buku) {
  const article = document.createElement("article");

  const divBelumSelesai = document.getElementById("listBukuBelumSelesaiDibaca");
  divBelumSelesai.appendChild(article);

  article.setAttribute("class", "book_item");

  const h3 = document.createElement("h3");
  article.appendChild(h3);
  h3.innerText = buku.title;

  const pPenulis = document.createElement("p");
  article.appendChild(pPenulis);
  pPenulis.innerText = "Penulis: " + buku.author;

  const pTahun = document.createElement("p");
  article.appendChild(pTahun);

  pTahun.innerText = "Tahun: " + buku.year;

  const divAction = document.createElement("div");
  article.appendChild(divAction);
  divAction.setAttribute("class", "action");

  const buttonBelumSelesai = document.createElement("button");
  divAction.appendChild(buttonBelumSelesai);
  buttonBelumSelesai.setAttribute("class", "green");
  buttonBelumSelesai.setAttribute("id", `selesai`);
  buttonBelumSelesai.innerText = "Selesai Dibaca";
  buttonBelumSelesai.addEventListener("click", function () {
    Swal.fire({
      title: "Yakin Pindah Buku?",
      text: "Buku akan dipindah ke 'Buku Selesai Dibaca'!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "darkgreen",
      cancelButtonColor: "darkred",
      confirmButtonText: "Ya, Pindah!",
    }).then((result) => {
      if (result.isConfirmed) {
        buku.isComplete = true;
        document.dispatchEvent(new Event(EVENT_BARU));
        saveData();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Buku berhasil dipindah",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  });

  const buttonEdit = document.createElement("button");
  divAction.appendChild(buttonEdit);
  buttonEdit.setAttribute("class", "yellow");
  buttonEdit.setAttribute("id", "edit");
  buttonEdit.innerText = "Edit";

  buttonEdit.addEventListener("click", function () {
    Swal.fire({
      title: "Buku Mau Diedit?",
      text: "Data buku akan diedit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "darkgreen",
      cancelButtonColor: "darkred",
      confirmButtonText: "Ya, Edit!",
    }).then((result) => {
      if (result.isConfirmed) {
        editBuku(id, false);
        tampilkanEditBuku(buku);
        h2Tambah.innerText = "Edit Buku";
        formInput.style.display = "block";
        tambah.innerText = "Sembunyikan";
        buku.isComplete = false;
      }
    });
  });

  const buttonHapus = document.createElement("button");
  divAction.appendChild(buttonHapus);
  buttonHapus.setAttribute("class", "red");
  buttonHapus.setAttribute("id", "hapus");

  buttonHapus.innerText = "Hapus";

  buttonHapus.addEventListener("click", function () {
    hapusBuku(buku, true);
  });
}

function sudah(buku) {
  const article = document.createElement("article");

  const divBelumSelesai = document.getElementById("listBukuSelesaiDibaca");
  divBelumSelesai.appendChild(article);

  article.setAttribute("class", "book_item");
  const h3 = document.createElement("h3");
  article.appendChild(h3);
  h3.innerText = buku.title;

  const pPenulis = document.createElement("p");
  article.appendChild(pPenulis);
  pPenulis.innerText = "Penulis: " + buku.author;

  const pTahun = document.createElement("p");
  article.appendChild(pTahun);

  pTahun.innerText = "Tahun: " + buku.year;
  const divAction = document.createElement("div");
  article.appendChild(divAction);
  divAction.setAttribute("class", "action");

  const buttonBelumSelesai = document.createElement("button");
  divAction.appendChild(buttonBelumSelesai);
  buttonBelumSelesai.setAttribute("class", "green");
  buttonBelumSelesai.setAttribute("id", "belum-selesai");

  buttonBelumSelesai.innerText = "Belum Selesai";
  buttonBelumSelesai.addEventListener("click", function () {
    Swal.fire({
      title: "Yakin Pindah Buku?",
      text: "Buku akan dipindah ke 'Belum Selesai Dibaca'!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "darkgreen",
      cancelButtonColor: "darkred",
      confirmButtonText: "Ya, Pindah!",
    }).then((result) => {
      if (result.isConfirmed) {
        buku.isComplete = false;
        document.dispatchEvent(new Event(EVENT_BARU));
        saveData();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Buku berhasil dipindah",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  });

  const buttonEdit = document.createElement("button");
  divAction.appendChild(buttonEdit);
  buttonEdit.setAttribute("class", "yellow");
  buttonEdit.setAttribute("id", "edit");
  buttonEdit.innerText = "Edit";

  buttonEdit.addEventListener("click", function () {
    Swal.fire({
      title: "Buku Mau Diedit?",
      text: "Data buku akan diedit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "darkgreen",
      cancelButtonColor: "darkred",
      confirmButtonText: "Ya, Edit!",
    }).then((result) => {
      if (result.isConfirmed) {
        editBuku(id, true);
        tampilkanEditBuku(buku);
        h2Tambah.innerText = "Edit Buku";
        formInput.style.display = "block";
        tambah.innerText = "Sembunyikan";
      }
    });
    buku.isComplete = true;
  });

  const buttonHapus = document.createElement("button");
  divAction.appendChild(buttonHapus);
  buttonHapus.setAttribute("class", "red");
  buttonHapus.setAttribute("id", "hapus");

  buttonHapus.innerText = "Hapus";

  buttonHapus.addEventListener("click", function () {
    hapusBuku(buku, false);
  });
}

function saveData() {
  if (cekStorage()) {
    const parsed = JSON.stringify(dataBuku);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(UPDATE_DATA));
  }
}

function cekStorage() {
  if (typeof Storage === undefined) {
    alert("Broser Tidak Mendukung Local Storage");
    return false;
  }
  return true;
}

document.addEventListener(UPDATE_DATA, function () {});

function ambilDataDariStorage() {
  const dataDariStorage = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(dataDariStorage);

  if (data !== null) {
    for (const buku of data) {
      dataBuku.push(buku);
    }
  }
  document.dispatchEvent(new Event(EVENT_BARU));
}

const tambah = document.getElementById("tambah");
tambah.addEventListener("click", function () {
  if (tambah.innerText == "Tambah") {
    formInput.style.display = "block";
    tambah.innerText = "Sembunyikan";
  } else {
    formInput.style.display = "none";
    tambah.innerText = "Tambah";
  }
});
