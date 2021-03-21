import { Cell } from "./Cell.js";
import { NamedColors } from "./NamedColors.js";
export class OmniConsole {
    constructor(width, height, hostId, autoDraw = false, echo = false) {
        this.fore = NamedColors.White;
        this.back = NamedColors.Black;
        this.cursor = { x: 0, y: 0 };
        this.Echo = false;
        this.EchoFormat = (txt) => `>${txt}`;
        this.readString = "";
        this.width = width;
        this.height = height;
        this.autoDraw = autoDraw;
        this.Echo = echo;
        this.Cells = {};
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.Cells[`${x},${y}`] = new Cell();
            }
        }
        this.hostId = hostId;
        const canvas = document.getElementById(hostId);
        this.context = canvas.getContext("2d");
    }
    SetBackground(color) {
        const fontSize = 50;
        const fw = fontSize * 0.5;
        const fh = fontSize * 0.5;
        this.context.fillStyle = color.Color;
        this.context.fillRect(0, 0, this.width * fw, this.height * fh);
    }
    Draw() {
        const fontSize = 50;
        const fw = fontSize * 0.5;
        const fh = fontSize * 0.5;
        if (!this.autoDraw) {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this.width * fw, this.height * fh);
        }
        this.context.font = `${fontSize / 2}px monospace`;
        this.traverse((l, x, y) => {
            const cell = this.Cells[l];
            if (cell.Char !== " ") {
                this.context.fillStyle = cell.Back.Color;
                this.context.fillRect(fw * x, fh * y, fw, fh);
                this.context.fillStyle = cell.Fore.Color;
                this.context.fillText(cell.Char, fw * x + (fw / 4), fh * y + (fh / 1.2), fontSize);
            }
        });
    }
    set Fore(value) { this.fore = value; }
    get Fore() { return this.fore; }
    set Back(value) { this.back = value; }
    get Back() { return this.back; }
    MoveCursor(x, y) {
        this.cursor.x = x;
        this.cursor.y = y;
    }
    colorShift(action, fore = null, back = null) {
        let foreBackUp;
        if (fore !== null) {
            foreBackUp = this.Fore;
            this.Fore = fore;
        }
        let backBackUp;
        if (back !== null) {
            backBackUp = this.Back;
            this.Back = back;
        }
        action();
        if (foreBackUp) {
            this.Fore = foreBackUp;
        }
        if (backBackUp) {
            this.Back = backBackUp;
        }
    }
    Write(text, fore = null, back = null) {
        this.colorShift(() => {
            const chars = text.split("");
            chars.forEach(char => {
                const loc = `${this.cursor.x},${this.cursor.y}`;
                this.Cells[loc].Char = char;
                this.Cells[loc].Fore = this.Fore;
                this.Cells[loc].Back = this.Back;
                if (this.cursor.x < this.width) {
                    this.cursor.x++;
                }
                if (this.cursor.x >= this.width) {
                    this.cursor.y++;
                    this.cursor.x = 0;
                }
                if (this.cursor.y > this.width) {
                    this.cursor.y = this.height;
                }
            });
            if (this.autoDraw) {
                this.Draw();
            }
        }, fore, back);
    }
    WriteLine(text, fore = null, back = null) {
        this.colorShift(() => {
            const chars = text.split("");
            chars.forEach(char => {
                const loc = `${this.cursor.x},${this.cursor.y}`;
                this.Cells[loc].Char = char;
                this.Cells[loc].Fore = this.Fore;
                this.Cells[loc].Back = this.Back;
                if (this.cursor.x < this.width) {
                    this.cursor.x++;
                }
                if (this.cursor.x >= this.width) {
                    this.cursor.y++;
                    this.cursor.x = 0;
                }
                if (this.cursor.y > this.width) {
                    this.cursor.y = this.height;
                }
            });
            this.cursor.y++;
            this.cursor.x = 0;
            if (this.autoDraw) {
                this.Draw();
            }
        }, fore, back);
    }
    Read() {
        return "";
    }
    DrawRead() {
        this.Draw();
        const fontSize = 50;
        const fw = fontSize * 0.5;
        const fh = fontSize * 0.5;
        const chars = (">" + this.readString).split("");
        chars.forEach((c, i) => {
            this.context.fillStyle = this.Back.Color;
            this.context.fillRect(fw * (this.cursor.x + i), fh * this.cursor.y, fw, fh);
            this.context.fillStyle = this.Fore.Color;
            this.context.fillText(c, fw * (this.cursor.x + i) + (fw / 4), fh * this.cursor.y + (fh / 1.2), fontSize);
            this.context.fillStyle = this.Fore.Color;
        });
    }
    async ReadLine() {
        const promise = new Promise((resolve, reject) => {
            this.DrawRead();
            this.readString = "";
            document.onkeyup = n => {
                if (n.keyCode === 13) { //enter
                    if (this.Echo) {
                        this.WriteLine(this.EchoFormat(this.readString));
                    }
                    this.SetBackground(NamedColors.Black);
                    this.Draw();
                    resolve(this.readString);
                    this.readString = "";
                }
                else if (n.keyCode === 27) { //esc
                    reject();
                }
                else if (n.keyCode === 8) {
                    this.readString = this.readString.slice(0, -1);
                    this.Draw();
                    this.DrawRead();
                }
                else {
                    this.readString += n.key;
                    this.DrawRead();
                }
            };
        });
        return promise;
    }
    traverse(action) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                action(`${x},${y}`, x, y);
            }
        }
    }
    Clear() {
        this.cursor.x = 0;
        this.cursor.y = 0;
        this.traverse((loc, x, y) => {
            this.Cells[loc].Char = " ";
            this.Cells[loc].Back = NamedColors.Black;
            this.Cells[loc].Fore = NamedColors.White;
        });
    }
}
