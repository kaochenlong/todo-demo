import axios from "axios"
import Swal from "sweetalert2"

const Main = () => ({
  showSection: "loginSection",
  email: "",
  nickname: "",
  password: "",
  showLogin() {
    this.showSection = "loginSection"
  },
  clearText() {
    this.email = ""
    this.nickname = ""
    this.password = ""
  },
  showSignUp() {
    this.showSection = "signUpSection"
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

        localStorage.setItem("user_token", token)
        this.clearText()
        console.log("ok")
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
