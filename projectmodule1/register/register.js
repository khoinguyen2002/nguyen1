// Lấy các phần tử HTML cần thiết
let registerForm = document.getElementById("form");
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("psw");
let passwordRepeatInput = document.getElementById("re-password");
// console.log(
//   registerForm,
//   usernameInput,
//   emailInput,
//   passwordInput,
//   passwordRepeatInput
// );
// Lấy các phần tử HTML để hiển thị thông báo lỗi
let usernameError = document.getElementById("usernameError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let passwordRepeatError = document.getElementById("passwordConfirmError");
// console.log(usernameError, emailError, passwordError, passwordRepeatError);
// Hàm xóa lỗi
function deleteError() {
  usernameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  passwordRepeatError.innerText = "";
}
// Hàm kiểm tra định dạng email (search trên mạng)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Tạo ra 1 mảng để chứa đối tượng user khi khởi tạo thành công
let users = JSON.parse(localStorage.getItem("users")) || [];
// Hàm kiểm tra trùng username trong mảng users
function checkUsername(username) {
  // Tìm index của user có userName trùng với username được truyền vào
  let findUserIndex = users.findIndex((user) => user.userName === username);
  // Nếu tìm thấy user có userName trùng với username được truyền vào, trả về true, ngược lại trả về false
  return findUserIndex !== -1;
}

// Sự kiện onsubmit - submit
registerForm.onsubmit = function register(e) {
  e.preventDefault(); // ngăn chặn cách xử lý mặc định của trình duyệt khi xảy ra sự kiện
  // console.log("kiểm tra");
  // Lấy giá trị trong input
  let usernameValue = usernameInput.value;
  let emailValue = emailInput.value;
  let passwordValue = passwordInput.value;
  let passwordRepeatValue = passwordRepeatInput.value;
  // console.log(usernameValue, emailValue, passwordValue, passwordRepeatValue);
  if (checkUsername(usernameValue)) {
    usernameError.innerText = "Tên đăng nhập đã tồn tại";
  } else if (usernameValue === "") {
    usernameError.innerText = "Không được để trống tên đăng nhập";
  } else {
    deleteError();
    if (isValidEmail(emailValue)) {
      deleteError();
      if (passwordValue.length >= 6) {
        deleteError();
        if (passwordRepeatValue == passwordValue) {
          deleteError();
          // Tạo ra newUser để lưu thông tin của người dùng mới đăng ký
          let newUser = {
            id: Math.floor(Math.random() * 10000000),
            userName: usernameValue,
            email: emailValue,
            password: passwordValue,
          };
          users.push(newUser);
          // Lưu dữ liệu lên local
          localStorage.setItem("users", JSON.stringify(users));
          // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
          window.location.href = "../Login/login.html";
        } else {
          passwordRepeatError.innerText = "Mật khẩu không trùng khớp";
        }
      } else {
        passwordError.innerText = "Mật khẩu không đúng định dạng";
      }
    } else {
      emailError.innerText = "Email không đúng";
    }
  }
};