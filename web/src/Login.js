import { useState } from "react";

const Login = () => {

    const formDataInit = {
        email: 'pero@perovski.com',
        password: 'pero'
    };

    const [formData, setFormData] = useState(formDataInit);

    const submit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            let res = await fetch('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-type': 'application/json'
                }
            });
            if(!res.ok) {
                throw 'Error logging in';
            }
            let data = await res.json();
            localStorage.setItem('jwt', data.token);
        } catch(err) {
            alert(err);
        }
    };

    const inputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={submit}>
            <label>
                <span>Username (email)</span>
                <input type="email" name="email" value={formData.email} onChange={inputChange}/>
            </label>
            <br />
            <label>
                <span>Password</span>
                <input type="password" name="password" value={formData.password} onChange={inputChange}/>
            </label>
            <br />
            <br />
            <button type="submit">Log in</button>
        </form>
    );
};

export default Login;