export const checkValidData = (email,password,name)=>{
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    // const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isPasswordValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    // const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    // const isnameValid = /^[a-zA-Z ]{2,30}$/.test(name);

    if(!isEmailValid) return "Email Id not valid";
    if(!isPasswordValid) return "Password is not valid";
    // if(!isnameValid) return "Name is not valid";


    return null;

}