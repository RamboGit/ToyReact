
import {createElement, Component, render} from './toy-react.js';
class MyComponent extends Component {

    render() {
        return <div>
        my Component
        {this.childrens}
        </div>
    }
}
render(<MyComponent id='1' class='2'>
    
    <div>Hello Change</div>
</MyComponent>, document.body);

