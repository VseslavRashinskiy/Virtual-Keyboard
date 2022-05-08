        const Keyboard = {
            elements: {
                main: null,
                keysContainer: null,
                keys: []
            },
        
            eventHandlers: {
                oninput: null,
                onclose: null
            },
        
            properties: {
                value: "",
                capsLock: false
            },
        
            init() {
                // Create main elements
                this.elements.main = document.createElement("div");
                this.elements.keysContainer = document.createElement("div");
        
                // Setup main elements
                this.elements.main.classList.add("keyboard", "keyboard--hidden");
                this.elements.keysContainer.classList.add("keyboard__keys");
                this.elements.keysContainer.appendChild(this._createKeys());
        
                this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        
                // Add to DOM
                this.elements.main.appendChild(this.elements.keysContainer);
                document.body.appendChild(this.elements.main);
        
                document.querySelectorAll(".body-textarea").forEach(element => {
                    element.addEventListener("focus", () => {
                        this.open(element.value, currentValue => {
                            element.value = currentValue;
                        });
                    });
                });
            },
        

        };
        
        window.addEventListener("DOMContentLoaded", function () {
            Keyboard.init();
        });
        