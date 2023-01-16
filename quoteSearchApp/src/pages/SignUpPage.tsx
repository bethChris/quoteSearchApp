import {FormInput} from  '../components/FormInput' 

export function SignUpPage(){
    return (
        <main>
            <h2>Sign Up!</h2>
            <form>
                <FormInput  >
                    Name
                </FormInput>

                <FormInput>
                    Email
                </FormInput>

                <FormInput>
                    Email Confirm
                </FormInput> 

                <FormInput type="password">
                    Password
                </FormInput>

                <FormInput type="password">
                    Password Confirm
                </FormInput>

                <div className='controls'>
                    <button>Sign Up</button>
                </div>
            </form>
        </main>
    );
}