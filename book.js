const form = [];
const EVENT_BARU = "event-input";

const formInput = document.getElementById("input-buku");
const inputId = document.getElementById("id");
const edit = document.getElementById("edit");
const submitInputBuku = document.getElementById("submit-buku");
const inputJudul = document.getElementById("input-judul-buku");
const inputPenulis = document.getElementById("input-penulis-buku");
const inputTahun = document.getElementById("input-tahun-buku");
const cekSelesai = document.getElementById("input-buku-cekSelesai");
const UPDATE_DATA = "DATA_BUKU";
const STORAGE_KEY = "FORM_BUKU";
let isSearch = false;
const contenInput = document.querySelector(".content-input");
const h2Tambah = document.createElement("h2");
h2Tambah.innerText = "Tambahkan Buku Baru";
contenInput.appendChild(h2Tambah);
contenInput.insertBefore(h2Tambah, contenInput.children[0]);

const buttonTambah = document.querySelector(".tambah");

// const buku = {
//   id: +new Date(),
//   judul: inputJudul.value,
//   penulis: inputPenulis.value,
//   tahun: inputTahun.value,
//   cekSelesai: cekSelesai.checked,
// };

const reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  isSearch = false;

  document.dispatchEvent(new Event(EVENT_BARU));
});

document.addEventListener("DOMContentLoaded", function () {
  if (cekStorage()) {
    ambilDataDariStorage();
  }
  document.dispatchEvent(new Event(EVENT_BARU));
  if (form == 0) {
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
    // const indexObject = findObjectBuku(id);
    const bukuIndex = form.findIndex((buku) => buku.id == inputId.value);

    form[bukuIndex].judul = inputJudul.value;
    form[bukuIndex].penulis = inputPenulis.value;
    form[bukuIndex].tahun = inputTahun.value;

    document.dispatchEvent(new Event(EVENT_BARU));
    // formInput.reset();
    saveData();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Anda berhasil mengedit buku",
      showConfirmButton: false,
      timer: 2500,
    });

    // temukan object index berdasarkan inputId.value
    // objectyangditemukan.judul = inputjudul.value
    // ganti object yangn ditemukan dengan nilai yang baru
    // simpan
    // alert

    console.log(form[bukuIndex]);
  } else {
    const buku = {
      id: +new Date(),
      judul: inputJudul.value,
      penulis: inputPenulis.value,
      tahun: inputTahun.value,
      cekSelesai: cekSelesai.checked,
    };
    form.push(buku);

    // ubahDataEdit();
    // tampilkanEditBuku(buku);

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

  // h2Tambah.innerText = "Tambahkan Buku Baru";
  document.dispatchEvent(new Event(EVENT_BARU));
});

const formCari = document.getElementById("cari-buku");
const inputData = document.getElementById("cari-judul-buku");
formCari.addEventListener("submit", function (e) {
  e.preventDefault();
  // const val = inputData.value;
  isSearch = true;
  document.dispatchEvent(new Event(EVENT_BARU));
  formCari.reset();
  saveData();
});

document.addEventListener(EVENT_BARU, function () {
  const belumSelesaiDibaca = document.getElementById(
    "listBukuBelumSelesaiDibaca"
  );
  belumSelesaiDibaca.innerHTML = "";

  const selesaiDibaca = document.getElementById("listBukuSelesaiDibaca");
  selesaiDibaca.innerHTML = "";

  // for (const bukuItem of form) {
  //   const bukuElement = belum(bukuItem);
  //   if (!bukuItem.cekSelesai) belumSelesaiDibaca.append(bukuElement);
  //   else selesaiDibaca.append(bukuElement);
  // }

  if (form.length > 0) {
    let bookSearch = form;
    if (isSearch) {
      bookSearch = form.filter(
        (book) =>
          book.judul.toLowerCase().search(inputData.value.toLowerCase()) !=
            -1 ||
          book.penulis.toLowerCase().search(inputData.value.toLowerCase()) != -1
      );
    }

    const bukuSelesaiDibaca = bookSearch.filter(
      (buku) => buku.cekSelesai == true
    );
    const bukuBelumSelesaiDibaca = bookSearch.filter(
      (buku) => buku.cekSelesai == false
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
  isSearch = false;
});

function findObjectBuku(id) {
  for (const idObject in form) {
    if (form[idObject].id === id) {
      return idObject;
    }
  }
  return -1;
}

function tampilkanEditBuku(buku) {
  const index = findObjectBuku(id);
  inputId.value = buku.id;
  inputJudul.value = buku.judul;
  inputPenulis.value = buku.penulis;
  inputTahun.value = buku.tahun;
  cekSelesai.checked = buku.cekSelesai;
}

function editBuku(id, statusBuku) {
  const index = findObjectBuku(id);

  if (index !== -1) {
    const buku = {
      id: inputId.value,
      judul: inputJudul.value,
      penulis: inputPenulis.value,
      tahun: inputTahun.value,
      cekSelesai: cekSelesai.checked,
    };

    buku.cekSelesai = statusBuku;
    // formInput.push(buku);
    console.log("Data buku berhasil diedit");

    // document.dispatchEvent(new Event(EVENT_BARU));
  } else {
    const buku = {
      id: +new Date(),
      judul: inputJudul.value,
      penulis: inputPenulis.value,
      tahun: inputTahun.value,
      cekSelesai: cekSelesai.checked,
    };
    // buku.judul = inputJudul.value;
    // buku.penulis = inputPenulis.value;
    // buku.tahun = inputTahun.value;
    buku.cekSelesai = statusBuku;

    console.log("Data buku tidak ditemukan");
    // formInput.push(buku);
    document.dispatchEvent(new Event(EVENT_BARU));
  }
}

// function ubahDataEdit() {
//   if (
//     inputJudul.value !== buku.judul ||
//     inputPenulis.value !== buku.penulis ||
//     inputTahun.value !== buku.tahun ||
//     cekSelesai.checked !== buku.cekSelesai
//   ) {
//     buku.judul = inputJudul.value;
//     buku.penulis = inputPenulis.value;
//     buku.tahun = inputTahun.value;
//     buku.cekSelesai = cekSelesai.checked;
//     console.log("berhasil diperbarui", buku);
//   } else {
//     alert("data sama tidak ada perubahan");
//   }
// }

function hapusData(bukuId) {
  const bukuTarget = findIndexBuku(bukuId);

  if (bukuTarget === -1) return;

  form.splice(bukuTarget, 1);
  document.dispatchEvent(new Event(EVENT_BARU));
  saveData();
}

function findIndexBuku(bukuId) {
  for (const index in form) {
    if (form[index].id === bukuId) {
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
      buku.cekSelesai = statusBuku;
      document.dispatchEvent(new Event(EVENT_BARU));
      saveData();
      Swal.fire({
        title: "Berhasil!",
        text: "Buku berhasil dihapus.",
        icon: "success",
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
  h3.innerText = buku.judul;

  const pPenulis = document.createElement("p");
  article.appendChild(pPenulis);
  pPenulis.innerText = "Penulis: " + buku.penulis;

  const pTahun = document.createElement("p");
  article.appendChild(pTahun);

  pTahun.innerText = "Tahun: " + buku.tahun;

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
        buku.cekSelesai = true;
        document.dispatchEvent(new Event(EVENT_BARU));
        saveData();
        Swal.fire({
          title: "Berhasil!",
          text: "Buku berhasil dipindah.",
          icon: "success",
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
      }
    });

    // console.log(buku);
    // inputId.value = buku.id;
    // inputJudul.value = buku.judul;
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
  h3.innerText = buku.judul;

  const pPenulis = document.createElement("p");
  article.appendChild(pPenulis);
  pPenulis.innerText = "Penulis: " + buku.penulis;

  const pTahun = document.createElement("p");
  article.appendChild(pTahun);

  pTahun.innerText = "Tahun: " + buku.tahun;
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
        buku.cekSelesai = false;
        document.dispatchEvent(new Event(EVENT_BARU));
        saveData();
        Swal.fire({
          title: "Berhasil!",
          text: "Buku berhasil dipindah.",
          icon: "success",
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

    // console.log(buku);
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
    const parsed = JSON.stringify(form);
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

document.addEventListener(UPDATE_DATA, function () {
  // console.log(localStorage.getItem(STORAGE_KEY));
});

function ambilDataDariStorage() {
  const dataDariStorage = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(dataDariStorage);

  if (data !== null) {
    for (const buku of data) {
      form.push(buku);
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
