import './style.css';

// --- 1. Configuración y Tipos ---

// IMPORTANTE: Esta es tu URL correcta.
const API_BASE_URL = 'https://todoapi-franc-e5cxcmcdbqepfxea.mexicocentral-01.azurewebsites.net';

// Definimos el "Tipo" para nuestros datos
type TodoItem = {
  id: number;
  title: string;
  notes: string | null;
  isComplete: boolean;
  dueDate: string | null;
  priority: number;
  createdDate: string;
};

// --- 2. Referencias al HTML ---

const taskList = document.querySelector<HTMLUListElement>('#task-list');
const addTaskButton = document.querySelector<HTMLButtonElement>('#add-task-button');
const listContainer = document.querySelector<HTMLElement>('.list-container');
const emptyListMessage = document.querySelector<HTMLSpanElement>('#empty-list-message'); // <-- ¡AÑADE ESTA LÍNEA!

// La bandera global para detener la "carrera"
let isDeletingEmptyTask = false;

// --- 3. Funciones de API ---

/**
 * Obtiene TODAS las tareas de la API
 */
async function fetchTasks(): Promise<TodoItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/TodoItems`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
}

/**
 * Envía UNA tarea nueva a la API
 */
async function postNewTask(newTask: Partial<TodoItem>): Promise<TodoItem> {
  const response = await fetch(`${API_BASE_URL}/api/TodoItems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
}

/**
 * Envía una tarea ACTUALIZADA a la API (PUT)
 */
async function updateTask(taskId: number, updatedTask: TodoItem): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/TodoItems/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
}

/**
 * Envía una petición DELETE a la API para borrar una tarea
 */
async function deleteTask(taskId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/TodoItems/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
}

// --- 4. Funciones de Renderizado (UI) ---

/**
 * Esta función toma un objeto de tarea y lo convierte en HTML (un <li>)
 * y lo añade a la lista <ul>
 */
function renderTask(task: TodoItem) {
  if (!taskList) return;

  const listItem = document.createElement('li');
  listItem.className = 'task-item';
  listItem.dataset.taskId = task.id.toString();

  listItem.innerHTML = `
    <div class="checkbox-wrapper">
      <input type="checkbox" ${task.isComplete ? 'checked' : ''} />
    </div>
    <div class="task-details">
      <input type="text" class="task-title" value="${task.title}" />
      <span class="task-notes">${task.notes || ''}</span>
    </div>
  `;

  const checkbox = listItem.querySelector<HTMLInputElement>('input[type="checkbox"]');
  const titleInput = listItem.querySelector<HTMLInputElement>('.task-title');

  // Lógica del Checkbox (Completar Tarea)
  if (checkbox) {
    checkbox.addEventListener('change', async () => {
      if (checkbox.checked) {
        listItem.classList.add('task-completed');
      } else {
        listItem.classList.remove('task-completed');
      }
      
      task.isComplete = checkbox.checked;
      
      try {
        await updateTask(task.id, task);
        if (task.isComplete) {
          setTimeout(() => { listItem.remove(); toggleEmptyMessage();}, 2000);
        }
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        checkbox.checked = !task.isComplete;
        listItem.classList.remove('task-completed');
      }
    });
  }

  // Lógica del Input (Guardar, Borrar, Enter)
  if (titleInput) {
    
    // LÓGICA DE BLUR (PERDER EL FOCO)
    titleInput.addEventListener('blur', async () => {
      const newTitle = titleInput.value.trim();
      
      // CASO 1: (Descartar) Si el input está vacío, bórralo.
      if (newTitle === '') {
        // ¡Levantamos la bandera!
        isDeletingEmptyTask = true; 
        
        try {
          await deleteTask(task.id); // Borra de la API
          listItem.remove();        // Borra del HTML
          toggleEmptyMessage();
        } catch (error) {
          console.error('Error al borrar la tarea vacía:', error);
          listItem.remove();
          toggleEmptyMessage();
        }
        
        // ¡Bajamos la bandera DESPUÉS de que todo termine!
        // (Sin 'setTimeout')
        isDeletingEmptyTask = false; 
      } 
      // CASO 2: (Guardar) Si el título cambió, guárdalo.
      else if (newTitle !== task.title) {
        try {
          task.title = newTitle;
          await updateTask(task.id, task);
        } catch (error) {
          console.error('Error al actualizar el título:', error);
        }
      }
    });

    // LÓGICA DE "ENTER"
    titleInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        titleInput.blur(); // Fuerza el guardado/descarte
        handleAddTaskClick(); // Crea la siguiente tarea
      }
    });
  }

  taskList.appendChild(listItem);
}

function toggleEmptyMessage() {
  if (emptyListMessage && taskList) {
    if (taskList.children.length === 0) {
      emptyListMessage.style.display = 'block'; // Mostrar el mensaje
    } else {
      emptyListMessage.style.display = 'none';  // Ocultar el mensaje
    }
  }
}


/**
 * Función principal para cargar y mostrar todas las tareas
 */
async function loadAndDisplayTasks() {
  try {
    const tasks = await fetchTasks();
    if (taskList) {
      taskList.innerHTML = '';
    }
    tasks.forEach(task => {
      renderTask(task);
    });
    toggleEmptyMessage();
  } catch (error) {
    console.error('Falló al cargar las tareas:', error);
  }
}



// --- 5. Funcionalidad (Eventos) ---

/**
 * (Versión inteligente: previene crear duplicados vacíos)
 */
async function handleAddTaskClick() {
  // 1. Revisa si ya existe una tarea vacía
  const lastTaskItem = taskList?.lastElementChild;
  if (lastTaskItem) {
    const lastInput = lastTaskItem.querySelector<HTMLInputElement>('.task-title');
    if (lastInput && lastInput.value.trim() === '') {
      lastInput.focus();
      return; // Detiene la función aquí.
    }
  }

  // 2. Si no hay una tarea vacía, crea una nueva
  const newTaskData: Partial<TodoItem> = {
    title: "", // ¡VACÍO!
    notes: "",
    isComplete: false,
    priority: 0,
  };

  try {
    const createdTask = await postNewTask(newTaskData);
    renderTask(createdTask);
    toggleEmptyMessage();
    // 3. Poner el "foco" en el input de la nueva tarea
    const newRenderedTask = taskList?.querySelector(`[data-task-id="${createdTask.id}"] .task-title`) as HTMLInputElement;
    
    if (newRenderedTask) {
      newRenderedTask.focus();
      newRenderedTask.select();
    }
  } catch (error) {
    console.error('Falló al crear la tarea:', error);
  }
}

// --- 6. Ejecución (Conectar todo) ---

// 1. Conectar el botón "+"
if (addTaskButton) {
  addTaskButton.addEventListener('click', handleAddTaskClick);
}

// 2. Conectar el "clic en espacio vacío"
if (listContainer) {
  listContainer.addEventListener('click', (event) => {
    
    // --- ¡NUEVA COMPROBACIÓN! ---
    // Si la bandera está levantada, no hagas nada.
    if (isDeletingEmptyTask) {
      return; 
    }
    // ----------------------------

    if (event.target === listContainer) {
      handleAddTaskClick();
    }
  });
}

// 3. Cargar las tareas cuando la página abre
loadAndDisplayTasks();