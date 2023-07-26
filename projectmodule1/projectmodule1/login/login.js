// Lấy dữ liệu local về
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);
// Truy vấn các thẻ HTML form cần thiết
let formLogin = document.getElementById("login-form");
let userLogin = document.getElementById("username");
let passLogin = document.getElementById("psw");
// console.log(formLogin, userLogin, passLogin);

// Truy vấn các HTML báo lỗi
let usernameErr = document.getElementById("usernameErr");
let passErr = document.getElementById("passErr");

// Hàm xóa lỗi
function deleteErr() {
  usernameErr.innerText = "";
  passErr.innerText = "";
}

formLogin.onsubmit = function login(e) {
  e.preventDefault();
  //   console.log("kiểm tra");
  let userLoginValue = userLogin.value;
  let passLoginValue = passLogin.value;
  // Khai báo biến user bằng việc sử dụng phương thức find() với điều kiện theo username
  // Trả về toàn bộ thông tin (thuộc tính-giá trị) của đối tượng tìm thấy
  let user = users.find((user) => user.userName === userLoginValue);

  if (userLoginValue == "") {
    usernameErr.innerText = "Tên đăng nhập không được bỏ trống";
  } else if (!user) {
    deleteErr();
    usernameErr.innerText = "Tên đăng nhập không tồn tại";
  } else {
    deleteErr();
    if (passLoginValue !== user.password) {
      deleteErr();
      passErr.innerText = "Mật khẩu không đúng";
    } else {
      deleteErr();
      // Nếu đăng nhập thành công thì mọi người chuyển sang trang chủ
      alert("Thành công");
      // Ví dụ:
        window.location.href = "../index.html";
    }
  }
};