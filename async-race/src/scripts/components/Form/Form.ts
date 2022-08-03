import Component from '../../../core/component/Component';
import VirtualNode from '../../../core/virtual-node/VirtualNode';

interface IFormState {
  nameValue: string;
  color: string;
}

class Form extends Component {
  state: IFormState;

  constructor() {
    super();
    this.state = {
      nameValue: '',
      color: '',
    };
  }

  render() {
    console.log('render');
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
        callback(e) {
          console.log(input.element.validity);
          console.log(color.element.value);
          console.log(e);
        },
      }),
    ]);
    if (!this.element) this.element = element;
    return element;
  }
}

export default Form;
