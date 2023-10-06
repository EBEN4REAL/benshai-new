import { IWeatherResponse } from "../types"
import { API_KEY, BASE_URL } from "../config";
import { WeatherMockData } from "./mockData"
import {
    fetchCityWeatherData,
    fetchCityWeatherForecast,
    Coords,
} from '../Services/cityService';


global.fetch = jest.fn() as unknown as (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

describe('Weather API functions', () => {
    const mockResponse = <T>(data: T) => {
        return Promise.resolve({
            json: () => Promise.resolve(data),
        });
    };

    beforeEach(() => {
        /*This Clears the mock function's calls before each test*/
        (global.fetch as jest.Mock).mockClear();
    });

    it('fetchCityWeatherData returns weather data', async () => {
        const coords: Coords = { latitude: 1.23, longitude: 4.56 };
        const units: string = 'metric';

        (global.fetch as jest.Mock).mockReturnValue(mockResponse<IWeatherResponse>(WeatherMockData));

        const weatherData: IWeatherResponse = await fetchCityWeatherData(coords, units);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            ` ${BASE_URL}/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=${units}`
        );
        expect(weatherData).toEqual(WeatherMockData);
    });

    it('fetchCityWeatherForecast returns weather forecast data', async () => {
        const coords: Coords = { latitude: 1.23, longitude: 4.56 };

        (global.fetch as jest.Mock).mockResolvedValue({
            json: async () => Promise.resolve({ /* Your mock response data here */ }),
        });

        const weatherForecast: IWeatherResponse = await fetchCityWeatherForecast(coords);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            `${BASE_URL}/data/2.5/forecast/daily?lat=${coords.latitude}&lon=${coords.longitude}&cnt=7&appid=${API_KEY}`
        );
        expect(weatherForecast).toEqual(weatherForecast);
    });
});