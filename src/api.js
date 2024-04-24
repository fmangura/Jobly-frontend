import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = localStorage.getItem('user_token');

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getAllCompanies(search) {
    return search ? await this.request(`companies?name=${search.name}`)
              .then((res) => res.companies) : 
              await this.request(`companies`)
              .then((res) => res.companies);
  }

  // static async updateCompany(handle, data) {
  //   let res = await this.request(`companies/${handle}`, data=data, method='patch');
  //   return res.company;
  // }

  // static async delCompany(handle) {
  //   let res = await this.request(`companies/${handle}`, method='delete');
  //   return res.deleted;
  // }

  // static async addCompany(data) {
  //   let res = await this.request('companies', data=data, method = 'post');
  //   return res.company;
  // }

  static async getJobs(search) {
    return search ? await this.request(`jobs?title=${search.title}`)
              .then((res) => res.jobs) : 
              await this.request(`jobs`)
              .then((res) => res.jobs);
  }

  static async signUp(user) {
    try {
      console.log(user)
      await axios.post(`${BASE_URL}/auth/register`, user)
      .then(res => res.data.token);
    } catch(err) {
      return err; 
    }
  }

  static async Login(user) {
    try {
      return await axios.post(`${BASE_URL}/auth/token`, user)
      .then((res) => {
        localStorage.setItem('user_token', res.data.token)
        localStorage.setItem('user', user.username)
      });
    } catch(err) {
      return err;
    }
  }

  static async getCurrUser(user) {
    try {
      return await this.request(`users/${user}`)
                    .then((res) => res.user);
    } catch (err) {
      return err;
    }
  }

  static async updateUser(user, data) {
    let res = await axios.patch(`${BASE_URL}/users/${user}`, 
                              data, 
                              { headers: {Authorization: `Bearer ${JoblyApi.token}`} }
                            ).data;
    return res;
  }

  static async sendApp(user, id) {
    let res = await axios.post(`${BASE_URL}/users/${user}/jobs/${id}`, {}, 
                      { headers: {Authorization: `Bearer ${JoblyApi.token}`} });
    return res;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// if (localStorage.getItem('user_token')) {
//   JoblyApi.token = localStorage.getItem('user_token');
// }

export default JoblyApi;