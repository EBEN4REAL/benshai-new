import { mount } from '@vue/test-utils';
import City from './Cities.vue'; 
import { ICity } from '../../types';

describe('Cities.vue', () => {
  it('renders a list of cities when there are filtered cities', async () => {
    const filteredCities: ICity[] = [
        {
            "distance": 0,
            "name": "Barcelona",
            "continent": "Europe",
            "active": true,
            "country": "Spain",
            "temp": 234,
            "description": "Barcelona (/ˌbɑːrsəˈloʊnə/ BAR-sə-LOH-nə, Catalan: [bəɾsəˈlonə], Spanish",
            "image": "https://picsum.photos/id/402/500/500",
            "coords": {
                "lat": 41.390205,
                "lng": 2.154007
            }
        },
    ];

    const wrapper = mount(City, {
      props: {
        filteredCities,
      },
    });

    /*Wait for Vue to update the DOM*/
    await wrapper.vm.$nextTick();

    /*Assert that the cities are rendered correctly*/
    const cityElements = wrapper.findAll('.city');
    expect(cityElements.length).toBe(filteredCities.length);
  });

  it('renders "No cities found" when there are no filtered cities', async () => {
    const filteredCities: ICity[] = [];

    const wrapper = mount(City, {
      props: {
        filteredCities,
      },
    });

    await wrapper.vm.$nextTick();

    /*Assert that the "No cities found" message is rendered*/
    const noCitiesFoundElement = wrapper.find('.no-cities-found');
    expect(noCitiesFoundElement.text()).toBe('No cities found');
  });
});