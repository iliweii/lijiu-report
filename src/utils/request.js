// import Vue from "vue";
import axios from "axios";
import router from '@/router'
// import store from "@/store";
import {
  VueAxios
} from "./axios";
import {
  Notify,
  // Toast
} from "vant";
import { setCookie, getCookie } from "./cookie";

/**
 * 【指定 axios的 baseURL】
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
let apiBaseUrl = window._CONFIG["domianURL"];
//console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // api base_url
  timeout: 900000, // 请求超时时间
  withCredentials: true//访问允许携带cookie
});

const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    // const token = Vue.ls.get('X_TOKEN');
    switch (error.response.status) {
      case 302:
        Notify({
          type: "danger",
          message: "登录已过期，请重新登录"
        });
        setTimeout(() => {
          router.replace({ name: "login" });
        }, 500);
        break;
      case 403:
        Notify({
          type: "danger",
          message: "拒绝访问"
        });
        break;
      case 500: {
        const type = error.response.request.responseType;
        if (type === "blob") {
          blobToJson(data);
          break;
        }
        // if (token && data.message.includes("Token失效")) {
        //   store.dispatch("Logout").then(() => {
        //     router.push('/home');
        //   });
        // }
        break;
      }
      case 404:
        Notify({
          type: "danger",
          message: "请求错误,未找到该资源"
        });
        break;
      case 504:
        Notify({
          type: "danger",
          message: "网关超时"
        });
        break;
      case 401:
        Notify({
          type: "danger",
          message: "未授权，请重新登录"
        });
        break;
      default:
        Notify({
          type: "danger",
          message: `系统提示:${data.message}`
        });
        break;
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(
  (config) => {
    // const token = Vue.ls.get('X_TOKEN');
    const token = getCookie("X-Token");
    if (token) {
      config.headers["X-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    // config.headers['tenant_id'] = 0
    // if (config.method === "get") {
    //   if (config.url.indexOf("sys/dict/getDictItems") < 0) {
    //     config.params = {
    //       _t: Date.parse(new Date()) / 1000,
    //       ...config.params,
    //     };
    //   }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use((response) => {
  const setCookieValue = response.headers['set-cookie'];
  if (setCookieValue) {
    // Vue.ls.set('X_TOKEN', setCookie);
    // localStorage.setItem('X-Token', setCookie);
    setCookie("X-Token", setCookieValue, 30);
  }

  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  //   loadingType: 'spinner',
  //   duration: '100'
  // });
  return response.data;
}, err);

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service);
  },
};
/**
 * Blob解析
 * @param data
 */
function blobToJson(data) {
  let fileReader = new FileReader();
  // let token = Vue.ls.get('X_TOKEN');
  fileReader.onload = function () {
    try {
      let jsonData = JSON.parse(this.result); // 说明是普通对象数据，后台转换失败
      // console.log("jsonData", jsonData);
      if (jsonData.status === 500) {
        // console.log("token----------》", token);
        // if (token && jsonData.message.includes("Token失效")) {
        //   console.error({
        //     title: "登录已过期",
        //     content: "很抱歉，登录已过期，请重新登录",
        //     okText: "重新登录",
        //     mask: false,
        //     onOk: () => {
        //       store.dispatch("Logout").then(() => {
        //         Vue.ls.remove('X_TOKEN');
        //         window.location.reload();
        //       });
        //     },
        //   });
        // }
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      console.log("blob解析fileReader返回err", err);
    }
  };
  fileReader.readAsText(data);
}

export {
  installer as VueAxios, service as axios
};