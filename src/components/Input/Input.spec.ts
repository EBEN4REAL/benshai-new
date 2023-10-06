import Input from "./Input.vue"
import { mount } from "@vue/test-utils"

describe('Input.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(Input);
        expect(wrapper.exists()).toBe(true);
        const inputElement = wrapper.find('#el-input').element as HTMLInputElement;
        inputElement.value = 'Test Value';
        expect(inputElement.value).toBe('Test Value');
    });
});