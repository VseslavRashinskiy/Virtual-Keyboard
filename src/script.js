const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        textarea: null,
        header: null,
        string: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.main.classList.add('keyboard');

        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.textarea = document.createElement('textarea');
        this.elements.textarea.classList.add('textarea');

        this.elements.string = document.createElement('p');
        this.elements.string.textContent = "To change the language, press: shift + alt.";

        this.elements.header = document.createElement('h2');
        this.elements.header.textContent = "The keyboard is created in the Windows operating system.";
        
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.textarea);
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.main.appendChild(this.elements.string);
        this.elements.main.appendChild(this.elements.header);
        document.body.appendChild(this.elements.main);

        this.elements.textarea.addEventListener("focus", () => {
            this.open(this.elements.textarea.value, currentValue => {
                this.elements.textarea.value = currentValue;
            });
        });
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "del",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "shiftL", "\\", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "▲", "shift", 
            "ctrl", "win", "alt", "space", "alt", "ctrl", "◄", "▼", "►",
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "del", "enter", "shift"].indexOf(key) !== -1;
            const temp = document.createElement('div');

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            keyElement.setAttribute("id", key);

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    keyElement.addEventListener("click", () => {
                        const arr = this.elements.textarea.value.split('');
                        const position = this.elements.textarea.selectionStart;
                        if(position === 0) return;
                        arr.splice(position - 1, 1);
                        this.elements.textarea.value = arr.join('');
                        this.elements.textarea.selectionStart = this.elements.textarea.selectionEnd;
                        this.elements.textarea.selectionStart = position - 1;
                    });

                    break;

                case "del":
                    keyElement.classList.add("keyboard__key--del");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    keyElement.addEventListener("click", () => {
                        const arr = this.elements.textarea.value.split('');
                        const position = this.elements.textarea.selectionStart;
                        arr.splice(position, 1);
                        this.elements.textarea.value = arr.join('');
                        this.elements.textarea.selectionStart = this.elements.textarea.selectionEnd;
                        this.elements.textarea.selectionStart = position;
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    keyElement.addEventListener("click", () => {
                        this.toggleCapsLock();
                    });

                    break;

                case "shiftL":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.textContent = "shift";   
                        keyElement.appendChild(temp);

                        keyElement.addEventListener("mousedown", () => {
                            this.toggleCapsLock();
                        });
    
                        keyElement.addEventListener("mouseup", () => {
                            this.toggleCapsLock();
                        });
                        break;

                case "shift":
                        keyElement.classList.add("keyboard__key--shift");
                        keyElement.textContent = "shift";
                        keyElement.appendChild(temp);

                        keyElement.addEventListener("mousedown", () => {
                        this.toggleCapsLock();
                         });

                    keyElement.addEventListener("mouseup", () => {
                        this.toggleCapsLock();
                    });
                     break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this.triggerEvent("oninput");
                    });

                    break;
    
                case "tab":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "   ";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "win":
                    keyElement.classList.add("keyboard__key--win");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    break;

                case "alt":
                    keyElement.classList.add("keyboard__key--alt");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    break;

                case "ctrl":
                    keyElement.classList.add("keyboard__key--ctrl");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.appendChild(temp);

                    break;

                case "▲":
                    keyElement.classList.add("keyboard__key--ArrowUp");
                    keyElement.textContent = key.toLowerCase();
                    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▲";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "◄":
                    keyElement.classList.add("keyboard__key--ArrowLeft");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "◄";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "▼":
                    keyElement.classList.add("keyboard__key--ArrowDown");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▼";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "►":
                    keyElement.classList.add("keyboard__key--ArrowRight");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "►";
                        this.triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this.triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this.triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this.elements.keys.forEach((key) => {
            const copyKey = key; 
            if (copyKey.childElementCount === 0) {
                copyKey.textContent = this.properties.capsLock ? copyKey.textContent.toUpperCase() : copyKey.textContent.toLowerCase();
            }
        })
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },
};

window.addEventListener("DOMContentLoaded", () => {
    Keyboard.init();
});
