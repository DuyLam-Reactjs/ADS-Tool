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
import {validateEmail} from "../../../helpers/common";

const ChangePassWord = () => {

  const [emailValue, setEmail] = useState({
    userName:'',
    passWord:'',
  })
  let [error, setError] = useState('')
  let [validatedEmail, setValidatedEmail] = useState(false)


  const onChangeUserName = (e) => {
    const value = e.target?.value
    const checkValueEmail = validateEmail(value)
    setValidatedEmail(checkValueEmail)
    setEmail({...emailValue, userName: value})
  }

  const onChangePassWord = (e) => {
    const value = e.target.value
    setEmail({...emailValue, passWord: value})
  }
  let login = ''
  const onLogin = () => {
    login = '/login'
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
                    <h1>Đổi Mật Khẩu</h1>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Old Password" autoComplete="current-password" onChange={onChangePassWord} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="New Password" autoComplete="current-password" onChange={onChangePassWord} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" to={login} onClick={onLogin}>Xác nhận</CButton>
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

export default ChangePassWord
