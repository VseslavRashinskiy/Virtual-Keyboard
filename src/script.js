const textarea = document.querySelector("textarea");

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
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
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.textarea = document.createElement('textarea');
        this.elements.textarea.classList.add('textarea');

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.textarea);
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        textarea.addEventListener("focus", () => {
            this.open(textarea.value, currentValue => {
                textarea.value = currentValue;
            });
        });
    },

    _createKeys() {
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

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = key.toLowerCase();
                    let temp = document.createElement('div');
                    keyElement.appendChild(temp);

                    keyElement.addEventListener("click", () => {
                        const arr = textarea.value.split('');
                        const position = textarea.selectionStart;
                        if(position === 0) return;
                        arr.splice(position - 1, 1);
                        textarea.value = arr.join('');
                        textarea.selectionStart = textarea.selectionEnd;
                        textarea.selectionStart = position - 1;
                    });

                    break;

                case "del":
                    keyElement.classList.add("keyboard__key--del");
                    keyElement.textContent = key.toLowerCase();
                    let temp1 = document.createElement('div');
                    keyElement.appendChild(temp1);

                    keyElement.addEventListener("click", () => {
                        const arr = textarea.value.split('');
                        const position = textarea.selectionStart;
                        arr.splice(position, 1);
                        textarea.value = arr.join('');
                        textarea.selectionStart = textarea.selectionEnd;
                        textarea.selectionStart = position;
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.textContent = key.toLowerCase();
                    let temp2 = document.createElement('div');
                    keyElement.appendChild(temp2);

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                    case "shiftL":
                        keyElement.classList.add("keyboard__key--wide");
                        keyElement.textContent = "shift";   
                        let temp3 = document.createElement('div');
                        keyElement.appendChild(temp3);
                        break;

                    case "shift":
                        keyElement.classList.add("keyboard__key--shift");
                        keyElement.textContent = "shift";
                        let temp4 = document.createElement('div');
                        keyElement.appendChild(temp4);

                        break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = key.toLowerCase();
                    let temp5 = document.createElement('div');
                    keyElement.appendChild(temp5);

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;
    
                case "tab":
                    keyElement.classList.add("keyboard__key--tab");
                    keyElement.textContent = key.toLowerCase();
                    let temp6 = document.createElement('div');
                    keyElement.appendChild(temp6);
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "win":
                    keyElement.classList.add("keyboard__key--win");
                    keyElement.textContent = key.toLowerCase();
                    let temp7 = document.createElement('div');
                    keyElement.appendChild(temp7);

                    break;

                case "alt":
                    keyElement.classList.add("keyboard__key--alt");
                    keyElement.textContent = key.toLowerCase();
                    let temp8 = document.createElement('div');
                    keyElement.appendChild(temp8);

                    break;

                case "ctrl":
                    keyElement.classList.add("keyboard__key--ctrl");
                    keyElement.textContent = key.toLowerCase();
                    let temp9 = document.createElement('div');
                    keyElement.appendChild(temp9);

                    break;

                case "▲":
                    keyElement.classList.add("keyboard__key--ArrowUp");
                    keyElement.textContent = key.toLowerCase();
                    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▲";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "◄":
                    keyElement.classList.add("keyboard__key--ArrowLeft");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "◄";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "▼":
                    keyElement.classList.add("keyboard__key--ArrowDown");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "▼";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "►":
                    keyElement.classList.add("keyboard__key--ArrowRight");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "►";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
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

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        console.log('oninput', oninput);
    },
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
