import { register } from '../api';
import axios from 'axios';

const sendSms = async (to, message) => {
    const apiEndpoint = 'https://ej6ppn.api.infobip.com/sms/2/text/advanced';
    const apiKey = '1bcf8cd9a2f9ab4fbe49897c1ec138b2-00276fad-780e-4a77-a3d7-a45472745061';
    
    // const mobnum = countrycode.value + mobilenumber.value;
    // const message = `Welcome ${username.value}! You are now registered into Recipal. Enjoy!`;
    try {
      const response = await axios.post(
        apiEndpoint,
        {
          messages: [
            {
              from: 'InfoSMS',
              destinations: [
                { to: to },
              ],
              text: message,
            },
          ],
        },
        {
          headers: {
            'Authorization': `App ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
          );

          console.log('HTTP code:', response.status);
          console.log('Response body:', response.data);
        } catch (error) {
          console.error('Error sending SMS:', error);
          alert('Error sending SMS:', error);
        }
      };

const Register = () => {
     const handleRegister = async (e) => {
        e.preventDefault();
        const { username, firstname, lastname, email, mobilenumber, password, confirmPassword, countrycode } = e.target.elements;
        const mobnum = countrycode.value + mobilenumber.value;
        const message = `Welcome Mr/Ms. ${lastname.value}, ${firstname.value} to ReciPal! This message is to confirm that your registration is successful. Enjoy!`;

        if(password.value !== confirmPassword.value){
            alert('Password does not match!');

        }
        else{
        //sendSms(mobnum, message);
        register(username.value, firstname.value, lastname.value, email.value, mobilenumber.value, password.value)
        
        .then(async () => {
          try {
            alert(`You may now login ${username.value}, Thank you for registering!`);
            await sendSms(mobnum, message);
            window.location.replace('/');
          } catch (error) {
            alert('Error sending SMS:', error);
          }
        })
        .catch((error) => {
            alert('Registration Error: Username or Email is already taken!');
        });
        
       
        }
      
          
    };

    return (
        <>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <h1>Register</h1>
        </div>
        </div>

        <div className="row mb-5">
        <div className="col-sm-12 primarycolor">
        <form onSubmit={handleRegister}>
        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="form-control" required />
        </div>
        <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" className="form-control" required />
        </div>
        <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" className="form-control" required />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="form-control" required />
        </div>
        <div className="form-group">
        <label htmlFor="mobilenumber">Mobile Number:</label>
        
        <div className="input-group">
          <select id="countrycode" name="countrycode" className="form-control" style={{ width: '1%' }} required>
          <option value="63">+63 (PH)</option>
            <option value="1">+1 (USA)</option>
            <option value="44">+44 (UK)</option>
            <option value="91">+91 (India)</option>
            
          </select>
          <input type="tel" id="mobilenumber" name="mobilenumber" className="form-control" style={{ width: '80%' }} maxLength="11" pattern="[0-9]+" required />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="form-control" required />
        </div>
        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" required />
        </div>
        </div>
        <div className="text-right">
            <button type="submit" className="btn btn-outline-light">Register</button>
            <br /><br />
            <a href="/login" className="primarycolor" style={{'textDecoration':'underline'}}>Already have an account? Login</a>
        </div>
        </form>
        </div>
        </div>

        </>
    );
};

export default Register;
