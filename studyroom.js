import http from "../http-common";

class StudyroomDataService {
    getAll(page = 1) {
        return http.get(`?pages=${page}`);
    }

    find(query, by = "building", page = 0) {
        return http.get(`?${by}=${query}&page=${page}&isOpen=true`);
    }

    findNotOpen(query, by = "building", page = 0) {
        return http.get(`?${by}=${query}&page=${page}&isOpen=false`);
    }

    findAllInBuilding(query, by = "building", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReservation(data) {
        return http.post("/reserve", data);
    }

}

export default new StudyroomDataService();
