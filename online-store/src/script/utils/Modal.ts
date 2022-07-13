// export interface IModal {
//     modal: HTMLDivElement;
//     closeButton: HTMLButtonElement | null;
//     openButton: HTMLElement | null;
//     content: HTMLDivElement | null;
//     create(): void;
//     open(): void;
//     close(): void;
// }

// export class Modal {
//     modal: HTMLDivElement;
//     closeButton: HTMLButtonElement | null;
//     openButton: HTMLElement | null;
//     content: HTMLDivElement | null;
//     constructor(id: string, openButton?: HTMLElement) {
//         this.modal = document.createElement("div");
//         this.modal.id = id;
//         this.openButton = null;
//         this.closeButton = null;
//         this.content = null;
//         if (openButton) {
//             this.openButton = openButton;
//         }
//         this.closeButton = document.createElement("button");
//         this.closeButton.innerText = "Закрыть";
//         this.content = document.createElement("div");
//         this.modal.insertAdjacentElement("beforeend", this.content);
//         this.modal.insertAdjacentElement("beforeend", this.closeButton);
//         if (this.openButton) {
//             this.openButton.addEventListener("click", () => {
//                 this.open();
//             });
//         }
//         this.closeButton.addEventListener("click", () => {
//             this.close();
//         });
//         this.close();
//         document.body.insertAdjacentElement("beforeend", this.modal);
//     }
//     create() {
//         this.closeButton = document.createElement("button");
//         this.closeButton.innerText = "Закрыть";
//         this.content = document.createElement("div");
//         this.modal.insertAdjacentElement("beforeend", this.content);
//         this.modal.insertAdjacentElement("beforeend", this.closeButton);
//         if (this.openButton) {
//             this.openButton.addEventListener("click", () => {
//                 this.open();
//             });
//         }
//         this.closeButton.addEventListener("click", () => {
//             this.close();
//         });
//         this.close();
//         document.body.insertAdjacentElement("beforeend", this.modal);
//     }
//     close() {
//         this.modal.style.display = "none";
//     }
//     open() {
//         this.modal.style.display = "block";
//     }
// }
