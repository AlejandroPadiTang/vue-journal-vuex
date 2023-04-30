import { shallowMount } from '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';
import { journalState } from '../../../mocks/test-journal-state';

describe('Pruebas en Entry Component', () => {

  // eslint-disable-next-line no-unused-vars
  let wrapper;
  const mockRouter = {
    push: jest.fn()
  };

    wrapper = shallowMount(Entry, {
      global: {
        mocks: {
          $router: mockRouter
        }
      },
      props: {
        entry: journalState.entries[0]
      }
    });

  test('debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('debe de redireccionar al hacer click en entry-container', () => {
    const div = wrapper.find('.entry-container');
    // console.log(div);
    div.trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: {
        id: journalState.entries[0].id
      }
    });
  });

  test('prubas en las propiedades computadas', () => {
    const day = wrapper.vm.day;
    const month = wrapper.vm.month;
    const yearDay = wrapper.vm.yearDay;

    expect(day).toBe(9);
    expect(month).toBe('Marzo');
    expect(yearDay).toBe('2023, Jueves');
  });
})