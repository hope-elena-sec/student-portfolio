document.addEventListener('DOMContentLoaded', () => {
    
  // ==========================================
// 1. RESPONSIVE NAVIGATION MENU CONTROL
// ==========================================
const eclipseBtn = document.getElementById('eclipseBtn');
const navMenu = document.getElementById('navMenu');

if (eclipseBtn && navMenu) {
    // Toggle the mobile navigation dropdown when clicking the ⋮ button
    eclipseBtn.addEventListener('click', (event) => {
        navMenu.classList.toggle('show');
        event.stopPropagation(); // Prevents the event from instantly triggering the document click handler
    });

    // Close the dropdown cleanly if the user clicks anywhere else on the page
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !eclipseBtn.contains(event.target)) {
            navMenu.classList.remove('show');
        }
    });
}

// ==========================================
// 2. INTERACTIVE ACADEMIC PLANNER CODE
// ==========================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Safe initialization context wrapper for matching active pages
if (addTaskBtn && taskInput && taskList) {
    // Core tracking Array for Tasks objects
    let academicTasks = [];

    // Core Render Function using DOM manipulation
    const renderTasks = () => {
        taskList.innerHTML = '';
        
        academicTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="done-btn" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Add Task functionality execution
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a valid task description!");
            return;
        }
        
        academicTasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    };

    // Event Handling
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Exposing specific action handlers globally for modern scope visibility inside the dynamically drawn DOM string layout
    window.toggleTask = (index) => {
        academicTasks[index].completed = !academicTasks[index].completed;
        renderTasks();
    };

    window.deleteTask = (index) => {
        academicTasks.splice(index, 1);
        renderTasks();
    };
}

// ==========================================
// 3. CONTACT FORM JAVASCRIPT VALIDATION
// ==========================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Halt transmission baseline logic
        
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        formFeedback.className = "feedback-msg";
        formFeedback.style.display = "none";

        if (!fullName || !email || !phone || !message) {
            showFeedback("Error: All form fields must be accurately completed.", "error-mode");
            return;
        }

        // Requirement check 2: Email structural validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback("Error: Please provide a valid email format.", "error-mode");
            return;
        }

        // Requirement check 3: Phone constraints validation (digits only)
        const digitsRegex = /^\d+$/;
        if (!digitsRegex.test(phone)) {
            showFeedback("Error: Phone structure requires numbers/digits only.", "error-mode");
            return;
        }

        // Passed all constraints validation successfully
        showFeedback("Success! Your form has been validated and submitted seamlessly.", "success-mode");
        contactForm.reset();
    });

    const showFeedback = (msg, cssClass) => {
        formFeedback.innerText = msg;
        formFeedback.classList.add(cssClass);
    };
}