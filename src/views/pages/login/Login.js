import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { validateEmail, saveAccessToken } from "../../../helpers/common";
import {useDispatch} from "react-redux";
import UserApi from "../../../apis/userApi";
import ConfigCookie from "../../../config/ConfigCookie";
import * as Cookie from "lru-cache";



const Login = () => {

  const dispatch = useDispatch()
  const [emailValue, setEmail] = useState({
    email:'',
    password:'',
  })

  const [isToken, setToken] = useState(false)
  const [error, setError] = useState('')
  const [validatedEmail, setValidatedEmail] = useState(false)


  const onChangeUserName = (e) => {
    const value = e.target?.value
    const checkValueEmail = validateEmail(value)
    setValidatedEmail(checkValueEmail)
    setEmail({...emailValue, email: value})
  }

  const onChangePassWord = (e) => {
    const value = e.target.value
    setEmail({...emailValue, password: value})
  }

  const onLogin = async () => {
    if (validateEmail(emailValue?.email)) {
      await UserApi.login(emailValue.email, emailValue.password).then(res => {
          const data = res.data
          const accessToken = data?.accessToken
          if (accessToken){
            setToken(true)
            saveAccessToken(accessToken)
          }
        })
        .catch(error => console.log(error));
    } else {
      setError('Email không hợp lệ')
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={onChangeUserName} />
                    </CInputGroup>
                    {!validatedEmail &&
                      <label className="text" style={{color: 'red', textAlign: 'end'}}>{error}</label>
                    }
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={onChangePassWord} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                          <CButton to={isToken ? '/' : 'login'}  color="primary" className="px-4" onClick={onLogin}>Login</CButton>
                          {/*<CButton  color="primary" className="px-4" onClick={onLogin}>Login</CButton>*/}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
