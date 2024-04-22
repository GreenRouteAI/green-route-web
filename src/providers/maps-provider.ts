import axios from "axios";
import { Coordinate } from "../interfaces";

const MAPS_BASE_URL= import.meta.env.VITE_MAPS_API_BASE_URL;
const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

const mapBase = axios.create({
    baseURL: MAPS_BASE_URL,
})


export const mapProvider = {
    async getLocationNameByCoordinates({latitude, longitude}: Coordinate){
        const { data } =  await mapBase.get(`/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
        if(data && data.results && data.results.length > 0){
            return data.results[0].formatted_address
        } else {
            return null;
        }
    } 
};
