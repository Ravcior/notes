// DOM
const DOM = {
   // Formularz
   addForm: document.querySelector('#addForm'),
   // Lista notek
   list: document.querySelector('#list'),
   // Usuwanie notatek
   deleteBtns: list.querySelectorAll('.btn'),
   // Sortowanie
   sortBtn: document.querySelector('#state'),
   // Wyszukiwanie
   searchBtn: document.querySelector('#search')
};

let notes = [];

// Wyświetlanie notatek

function filtrAndCreateNotes() {
   const allNotes = notes;
   notes = notes.filter(searchNotes);

   function searchNotes(note) {
      if (note.title.toUpperCase().includes(DOM.searchBtn.value.toUpperCase())) return true;
   }
   createNotes();
   notes = allNotes;
}

sortNotes();
function createNotes() {
   DOM.list.innerHTML = notes.map(prepareHTML).join('');

   DOM.deleteBtns = list.querySelectorAll('.btn');
   DOM.deleteBtns.forEach(addRemoval);
}

function prepareHTML(note) {
   const time = new Date(note.dateID);
   const importance = whichPriority(note.priority);

   if (note.title != undefined)
      note = `<div class="card ${importance} mb-3" >
   <div class="card-header">
   <h5>${note.title}</h5>
   <button type="button" class="btn btn-danger btn-sm" id="${note.dateID}">Delete</button>
   </div>
   <div class="card-body">
   ${note.content}
   </div>
   <div class="card-footer">Data dodania: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${time.getDay()}.${time.getMonth() +
         1}.${time.getFullYear()}</div>
   </div>`;
   return note;
}

function whichPriority(priority) {
   if (priority == 1) {
      return 'text-white bg-danger';
   } else if (priority == 2) {
      return 'text-white bg-primary';
   } else if (priority == 3) {
      return 'bg-light';
   }
}

// Dodawanie

DOM.addForm.addEventListener('submit', add);

function add(event) {
   event.preventDefault();
   if (document.querySelector('#title').value != '') {
      notes.unshift({
         title: document.querySelector('#title').value,
         content: document.querySelector('#content').value,
         priority: document.querySelector('#importance').value,
         dateID: new Date().getTime()
      });

      sortNotes();
   } else {
      alert('Wypełnij pole title');
   }
}

// Usuwanie

function addRemoval(btn) {
   btn.addEventListener('click', remove);

   function remove() {
      const noteToRemoveID = btn.id;
      const noteToRemove = notes.filter(noteWithID, noteToRemoveID);
      const removalNoteIndex = notes.indexOf(noteToRemove[0]);
      notes.splice(removalNoteIndex, 1);
      sortNotes();
   }

   function noteWithID(note) {
      return note.dateID == this;
   }
}

// Wyszukiwanie

DOM.searchBtn.addEventListener('input', sortNotes);

// Sortowanie

DOM.sortBtn.addEventListener('change', sortNotes);

function sortNotes() {
   switch (DOM.sortBtn.value) {
      case '1':
         notes.sort(compareDate).reverse();
         break;
      case '2':
         notes.sort(compareDate);
         break;
      case '4':
         notes.sort(compareImportance);
         break;
      case '5':
         notes.sort(compareImportance).reverse();
         break;
   }

   function compareDate(a, b) {
      return a.dateID - b.dateID;
   }

   function compareImportance(a, b) {
      return a.priority - b.priority;
   }

   filtrAndCreateNotes();
}
