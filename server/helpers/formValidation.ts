export function signupValidator(data: signUpData) : boolean {
    const username = /^[A-Za-z]+$/i.test(data.userName);
    const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.userEmail);
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(data.passWord);
    const confirmPassword = data.passWord === data.confirmPassword;
  
    return username && email && password && confirmPassword
  }
  
  type signUpData = {
    userName: string;
    userEmail: string;
    mobileNo: string;
    passWord: string;
    confirmPassword: string;
  };
  