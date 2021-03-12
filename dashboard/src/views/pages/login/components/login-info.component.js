import React, { Fragment } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CLink,
} from '@coreui/react'

const LoginInfo = () => {
    return (
        <Fragment>
            <h4>تکنولوژی ها استفاده شده : </h4>
            <div>
                <h5>ReactJs</h5>
                <h5>Node.js</h5>
                <h5>React Native</h5>

                <CLink className="c-subheader-nav-link" href="https://github.com/mahmoudrezenaseri/digikala">
                    <CButton color="primary" className="mt-3" active tabIndex={-2}>پروژه در گیت هاب!</CButton>
                </CLink>
                <CLink className="c-subheader-nav-link" href="mahmoudreza.naseri@gmail.com">
                    <CButton color="success" className="mt-3" active tabIndex={-2}>ارتباط با ما</CButton>
                </CLink>
            </div>
        </Fragment>
    )
}

export default LoginInfo