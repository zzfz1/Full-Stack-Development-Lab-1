async function getAlbums() {
  let albums = await fetch("/api/albums");
  albums = await albums.json();
  const table = document.getElementById("album-table").querySelector("tbody");
  table.innerHTML = "";
  albums.forEach((album) => {
    const row = table.insertRow();
    row.dataset.id = album._id;
    row.insertCell().innerText = album.title;
    row.insertCell().innerText = album.artist;
    row.insertCell().innerText = album.year;
    const actionsCell = row.insertCell();
    const detailsButton = document.createElement("button");
    detailsButton.innerText = "Details";
    detailsButton.classList.add("btn-details", "mx-2", "btn", "btn-secondary");
    detailsButton.addEventListener("click", async () => {
      const detailsTable = document.getElementById("details-table");
      if (detailsTable.getAttribute("hidden"))
        detailsTable.removeAttribute("hidden");
      detailsTable.querySelector("#details-id").textContent = album._id;
      detailsTable.querySelector("#details-title").textContent = album.title;
      detailsTable.querySelector("#details-artist").textContent = album.artist;
      detailsTable.querySelector("#details-year").textContent = album.year;
    });
    actionsCell.appendChild(detailsButton);
    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.classList.add("btn-update", "mx-2", "btn", "btn-secondary");
    actionsCell.appendChild(updateButton);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("btn-delete", "mx-2", "btn", "btn-secondary");
    deleteButton.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this album?")) {
        try {
          await fetch(`/api/albums/${album._id}`, {
            method: "DELETE",
          });
          row.remove();
        } catch (err) {
          console.error(err.message);
        }
      }
    });
    actionsCell.appendChild(deleteButton);
  });
}

window.addEventListener("load", () => {
  getAlbums();
});

const tableBody = document.getElementById("album-table").querySelector("tbody");
tableBody.addEventListener("click", async (event) => {
  const target = event.target;

  if (target.classList.contains("btn-update")) {
    const row = target.parentNode.parentNode;
    const cells = row.querySelectorAll("td:not(:last-child)");

    cells.forEach((cell) => {
      const text = cell.innerHTML.trim();
      cell.innerHTML = `<input type="text" value="${text}">`;
    });

    // Replace Update button with Save button
    const updateBtn = row.querySelector(".btn-update");
    updateBtn.classList.remove("btn-update");
    updateBtn.classList.add("btn-save");
    updateBtn.textContent = "Save";
    return;
  }
  if (target.classList.contains("btn-save")) {
    const row = target.parentNode.parentNode;
    const cells = row.querySelectorAll("td:not(:last-child)");

    // Replace input elements with new cell contents
    cells.forEach((cell) => {
      const text = cell.querySelector("input").value;
      cell.innerHTML = "";
      cell.textContent = text;
    });

    // Replace Save button with Update button
    const saveBtn = row.querySelector(".btn-save");
    saveBtn.classList.remove("btn-save");
    saveBtn.classList.add("btn-update");
    saveBtn.textContent = "Update";

    // Send PUT request to update album data
    const title = cells[0].textContent.trim();
    const artist = cells[1].textContent.trim();
    const year = cells[2].textContent.trim();

    try {
      const message = await fetch(`/api/albums/${row.dataset.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, artist, year }),
      });
      console.log(await message.json());
    } catch (error) {
      console.error(error);
    }
    await getAlbums();
  }
});

const form = document.getElementById("new-album-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const year = document.getElementById("year").value.trim();
  try {
    const response = await fetch("/api/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, artist, year }),
    });
    if (!response.ok) {
      throw new Error("Failed to create album");
    }
    await getAlbums();
    document.getElementById("title").value = "";
    document.getElementById("artist").value = "";
    document.getElementById("year").value = "";
  } catch (err) {
    console.error(err.message);
  }
});
