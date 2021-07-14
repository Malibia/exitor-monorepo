import * as React from "react";
import * as Antd from 'antd';
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { validUserSchema } from "@exitor-workspace/common";
import { InputField } from "../../shared/InputField";

// TO:DO yarn add -D @types/yup

const { Form: AntForm, Icon, Button } = Antd;
const FormItem = Form.item;
// To add Algorand
// Wallet Address
interface FormValues {
    email: string;
    password: string;
}
/* interface FormValues {
      email: string;
      walletAddress: string
}
*/

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}


// TO: DO; Require Algorand Wallet Address
// Wrapped with a higher-order component
class C extends React.PureComponent<FormikProps<FormValues> & Props> {
    render() {
        return (
           <form style={{ display: "flex" }} onSubmit={handleSubmit}>
               <div style={{ width: 400, margin: "auto" }}>
                   <Field 
                    name="email"
                    // tslint:disable-next-line:jsx-no-multiline-js
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} /> as any
                      // tslint:disable-next-line:jsx-curly-spacing
                    }
                    placeholder="Email"
                    component={InputField}
                    />
                    <Field 
                      name="password"
                      type="password"
                      // tslint:disable-next-line:jsx-no-multiline-js
                      prefix={
                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} as any
                        // tslint:disable-next-line:jsx-curly-spacing
                      }
                      placeholder="Password"
                      component={InputField}
                      />
                      <FormItem>
                        <a className="login-form-forgot" href="">
                          Forgot password
                        </a>
                      </FormItem>
                      <FormItem>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          >
                            Register

                        </Button>
                      </FormItem>
                      <FormItem>
                        Or <a href="">login now!</a>
                      </FormItem>
                      </div>
                      </form>
        );
    }
}

export const RegisterView = withFormik<FormikProps, FormValues>({
    validationSchema: validUserSchema,
    //validateOnChange: false,
    //validateOnBlur: false,
    mapPropsToValues: () => ({ email: "", password: ""}),
    handleSubmit: async ( values, { props, setErrors }) => {
        const errors = await props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    }
})(C);

// TO:DO;
// yarn add antd
// yarn add formik