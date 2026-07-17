document.addEventListener("DOMContentLoaded", () => {
    
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle("active");
            hamburgerBtn.classList.toggle("open");
            hamburgerBtn.setAttribute("aria-expanded", isOpen);
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                navLinks.classList.remove("active");
                hamburgerBtn.classList.remove("open");
                hamburgerBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    const todoForm = document.getElementById("todo-form");
    if (todoForm) {
        let tasks = [
            { id: 1, text: "Review Basic Network Defenses Lab", completed: false },
            { id: 2, text: "Configure COS 106 HTML Structuring Panels", completed: true }
        ];

        const todoInput = document.getElementById("todo-input");
        const todoList = document.getElementById("todo-list");

        function renderTasks() {
            todoList.innerHTML = "";
            if (tasks.length === 0) {
                todoList.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#7f8c8d;">No academic tasks entry found.</td></tr>`;
                return;
            }

            tasks.forEach(task => {
                const tr = document.createElement("tr");
                tr.className = `task-item ${task.completed ? 'completed' : ''}`;
                tr.innerHTML = `
                    <td><input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" class="toggle-status"></td>
                    <td>${task.text}</td>
                    <td style="text-align: right;"><button class="btn-delete" data-id="${task.id}">Delete</button></td>
                `;
                todoList.appendChild(tr);
            });
        }

        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if (!text) return;
            tasks.push({ id: Date.now(), text: text, completed: false });
            todoInput.value = "";
            renderTasks();
        });

        todoList.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            if (!id) return;
            if (e.target.classList.contains("toggle-status")) {
                tasks = tasks.map(t => t.id === id ? { ...t, completed: e.target.checked } : t);
                renderTasks();
            } else if (e.target.classList.contains("btn-delete")) {
                tasks = tasks.filter(t => t.id !== id);
                renderTasks();
            }
        });

        renderTasks();
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        const errorMsg = document.getElementById("form-error-msg");
        const successMsg = document.getElementById("form-success-msg");

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById("fullName").value.trim();
            const emailAddress = document.getElementById("emailAddress").value.trim();
            const phoneNumber = document.getElementById("phoneNumber").value.trim();
            const message = document.getElementById("message").value.trim();

            errorMsg.classList.add("hidden");
            successMsg.classList.add("hidden");

            if (!fullName || !emailAddress || !phoneNumber || !message) {
                showError("Submission Error: All details must be provided.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailAddress)) {
                showError("Submission Error: Provide a structured format email identifier.");
                return;
            }

            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phoneNumber)) {
                showError("Submission Error: The phone configuration line can only carry numeric digits.");
                return;
            }

            successMsg.classList.remove("hidden");
            contactForm.reset();
        });

        function showError(text) {
            errorMsg.innerText = text;
            errorMsg.classList.remove("hidden");
        }
    }
});