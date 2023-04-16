export function RegisterValidation(values){
    const errors = {};

    if(!values.username){
        errors.username = "Required";
    }else if(values.username.includes(" ")){
        errors.username = "Invalid Username...!"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

       // validation for password
       if(!values.password){
        errors.password = "Required";
    } else if(values.password.length < 6 || values.password.length > 12){
        errors.password = "Must be greater than 6 digit and less than 12 digit";
    } else if(values.password.includes(" ")){
        errors.password = "Invalid Password";
    }

    // validate confirm password
    if(!values.cpassword){
        errors.cpassword = "Required";
    } else if(values.password !== values.cpassword){
        errors.cpassword = "Password Not Match...!"
    } else if(values.cpassword.includes(" ")){
        errors.cpassword = "Invalid Confirm Password"
    }

    return errors;
}