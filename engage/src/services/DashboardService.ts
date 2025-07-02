import DataService from "./utils/dataservice/DataService"

class DashboardDataService extends DataService {
    constructor() {
        super()
    }

    async getDashboardData() {
        return this.get('engage')
    }

}

// Create a single instance
const dashboardDataService = new DashboardDataService()
export default dashboardDataService
