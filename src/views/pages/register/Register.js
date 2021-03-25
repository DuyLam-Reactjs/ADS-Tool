import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow, CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {validateEmail} from "../../../helpers/common";
import axios from "axios";

const Register = () => {
  const [emailValue, setEmail] = useState({
    email:'',
    password:'',
    role: {
      read: true,
      write: false,
      is_admin: false
    }
  })

  const [validatedEmail, setValidatedEmail] = useState(false)
  let [error, setError] = useState('')

  useEffect(()=>{
    if (emailValue.isCheckedPower){
      let disable = false
      dataCheckPower.forEach((element, key) => {
        if (element) {
          disable = true
        }
      })
      setEmail(prevState => ({
        ...prevState,
        isCheckedPower: disable,
      }))
    }
  },[emailValue?.isCheckedPower])


  const onChangEmail = (e) => {
    const value = e.target.value
    const checkValueEmail = validateEmail(value)
    setValidatedEmail(checkValueEmail)
    setEmail({...emailValue, email: value})
  }
  const onChangPassWord = (e) => {
    const value = e.target.value
    setEmail({...emailValue, password: value})
  }

  const onClickCreatAccount = async () => {
    if (validateEmail(emailValue?.email)) {
      await axios.post(`https://dev-api.vieon.vn/backend/admin-ads/users`, { emailValue })
        .then(res => {
          const data = res.data;
          console.log('data',data)
          // setState({ data })
        })
        .catch(error => console.log(error));
    } else {
      setError('Email không hợp lệ')
    }
  }
  const onSelectPowerUser = (e, item) => {
    let isChecked = e.target.checked
    let itemName = e.target.name
    if (itemName  === item?.name){
      setEmail({
        ...emailValue,
        isCheckedPower: isChecked,
        role: {
          read: isChecked,
          write: isChecked,
          is_admin: isChecked,
        }
      })
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email" onChange={onChangEmail}/>
                  </CInputGroup>
                  {!validatedEmail && <p className="" style={{color: 'red', textAlign: 'end'}}>{error}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={onChangPassWord} />
                  </CInputGroup>
                  <CRow className="p-2">
                    {
                      dataCheckPower && (dataCheckPower || []).map((item, index)=> {
                        return(
                          <CCol xs="12" sm="4">
                            <span>{item?.name}</span>
                            <CSwitch className={'mx-2'}
                                     variant={'3d'} color={'primary'}
                                     defaultChecked
                                     size={'sm'}
                                     name={item.name}
                                     onChange={(e)=>onSelectPowerUser(e, item)}/>
                          </CCol>
                        )
                      })
                    }
                  </CRow>
                  <CButton color="success" block onClick={onClickCreatAccount}>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
const dataCheckPower = [
  {id: 1, name: 'Read'},
  {id: 2, name: 'Write'},
  {id: 3, name: 'Admin'}
]


export default Register
