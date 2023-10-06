import { mount } from '@vue/test-utils';
import SelectInput from './SelectInput.vue'; 

describe('SelectInput.vue', () => {
  it('renders select options correctly', async () => {
    const options = [
      { value: 'Europe', label: 'Europe' },
      { value: 'Africa', label: 'Africa' },
      { value: 'Asia', label: 'Asia' },
    ];

    const wrapper = mount(SelectInput, {
      props: {
        options: options,
        value: ""
      },
    });

    const selectElement = wrapper.find('select');
    expect(selectElement.exists()).toBe(true);

    const optionElements = wrapper.findAll('option');
    expect(optionElements.length).toBe(options.length);

    options.forEach((option, index) => {
      expect(optionElements[index].attributes('value')).toBe(option.value);
      expect(optionElements[index].text()).toBe(option.label);
    });

    await selectElement.setValue('Asia');

    expect(wrapper.vm.selectedOption).toBe('Asia');
  });
});