import axios from "axios"
import Swal from "sweetalert2"

const TOKEN_NAME = "user_token"

const Main = () => ({
  showSection: "loginSection",
  email: "",
  nickname: "",
  password: "",
  isLogin: false,
  init() {
    const token = localStorage.getItem(TOKEN_NAME)
    if (token) {
      this.isLogin = true
      this.showTaskInput()
    }
  },
  clearText() {
    this.email = ""
    this.nickname = ""
    this.password = ""
  },
  showLogin() {
    this.showSection = "loginSection"
  },
  showSignUp() {
    this.showSection = "signUpSection"
  },
  showTaskInput() {
    this.showSection = "taskSection"
  },
  async logout() {
    // 使用 delete 登出的 API
    const url = "https://todoo.5xcamp.us/users/sign_out"
    // 傳 token 給 API
    const token = localStorage.getItem(TOKEN_NAME)
    if (token) {
      axios.defaults.headers.common["Authorization"] = token
      const resp = await axios.delete(url)
      console.log(resp)
    }

    // 成功：
    //   isLogin = false
    //   清 localStorage
    //   換畫面到登入頁面
    // 失敗：
    //   isLogin = false
    //   清 localStorage
    //   換畫面到登入頁面
  },
  async login() {
    if (this.email != "" && this.password != "") {
      const userData = {
        user: {
          email: this.email,
          password: this.password,
        },
      }

      try {
        const resp = await axios.post("https://todoo.5xcamp.us/users/sign_in", userData)
        const token = resp.headers.authorization

        localStorage.setItem(TOKEN_NAME, token)
        this.clearText()
        this.isLogin = true
        this.showTaskInput()
      } catch (err) {
        console.log(err)
      }
    }
  },
  async signUp() {
    if (this.email != "" && this.nickname != "" && this.password != "") {
      const userData = {
        user: {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
        },
      }

      try {
        await axios.post("https://todoo.5xcamp.us/users", userData)
        this.clearText()
        this.showLogin()
      } catch (err) {
        const errText = err.response.data.error.join("<br />")
        Swal.fire({
          title: "系統發生錯誤",
          html: errText,
          icon: "error",
          confirmButtonText: "確認",
        })
      }
    }
  },
})

export default Main
