import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';
import API from '../../API/Api';

// interface IFormState {
//   nameValue: string;
//   color: string;
// }

class Form extends Component {
  //   state: IFormState;

  //   constructor() {
  //     super();
  //     // this.state = {
  //     //   nameValue: '',
  //     //   color: '',
  //     // };
  //   }

  createCar(name: string, color: string) {
    API.createCar({ name, color }, () => {
      console.log('Hi', this);
    });
  }

  render() {
    const input = new VirtualNode<HTMLInputElement>('input', '', []);
    const color = new VirtualNode<HTMLInputElement>('input', '', []);
    color.element.type = 'color';
    input.element.required = true;
    input.element.minLength = 2;
    input.element.maxLength = 20;
    color.element.required = true;
    const element = new VirtualNode('form', '', [
      input,
      color,
      new VirtualNode('button', '', ['submit'], {
        type: 'click',
        callback: () => {
          if (input.element.validity.valid && color.element.validity.valid) {
            this.createCar(input.element.value, color.element.value);
            input.element.value = '';
            color.element.value = '#000000';
          }
        },
      }),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Form;
