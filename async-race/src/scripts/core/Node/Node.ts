// import GarageModel from '../models/GarageModel';

// interface IRoot {
//   el: HTMLElement;
//   children: (IRoot | string)[];
//   update: () => void;
//   render: () => HTMLElement;
// }

type EventType = {
  type: string;
  callback(): void;
};

class VirtualNode {
  element: HTMLElement;

  constructor(tag: string, children: (VirtualNode | string)[] = [], event: EventType | null = null) {
    this.element = document.createElement(tag);
  }
}

// class Root implements IRoot {
//   el: HTMLElement;

//   children: (IRoot | string)[];

//   constructor(
//     tag: string,
//     children: (Root | string)[] = [],
//     event: {
//       type: string;
//       callback: () => void;
//     } | null = null,
//   ) {
//     this.el = document.createElement(tag);
//     this.children = children;
//     if (event) {
//       this.el.addEventListener(event.type, () => {
//         event.callback();
//       });
//     }
//   }

//   update() {
//     this.el.innerHTML = '';
//     this.children.forEach((item) => {
//       if (typeof item === 'string') {
//         this.el.insertAdjacentText('beforeend', item);
//         return;
//       }
//       this.el.insertAdjacentElement('beforeend', item.render());
//     });
//   }

//   render(): HTMLElement {
//     this.update();
//     return this.el;
//   }
// }

// export default Root;
