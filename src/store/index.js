import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shouldRefreshReport: false, // 是否刷新月报主页面
    // 某条月报记录的某天费用合计的更新数据
    expenseTotal: {
      day: 0,
      total: 0,
      projectCode: '',
    },
  },
  getters: {
  },
  mutations: {
    // 设置刷新月报主页面的状态
    setRefreshReport(state, value) {
      state.shouldRefreshReport = value;
    },
    // 设置某条月报记录的某天费用合计的更新数据
    setExpenseTotal(state, payload) {
      state.expenseTotal = payload;
    },
  },
  actions: {
    logout() {
      // 清除所有cookie
      document.cookie.split(";").forEach(cookie => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
      // commit('setIsLoggedIn', false); // 更新状态，设置为未登录状态
    },
  },
  modules: {
  }
})
