import Axios from "../../utils/axiosConfig";

class TenantService {
    registerTenant(data){
        return Axios.post(`admin/tenants`, data);
    }

  getPublicPlans() {
    return Axios.get("crm/subscription-plans/public");
  }

  getMySubscription() {
    return Axios.get('/subscription/me');
  }

}

export default new TenantService();