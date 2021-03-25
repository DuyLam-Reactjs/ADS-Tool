import React, {useCallback, useEffect, useState} from 'react'
import {
  CBadge, CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow, CSwitch
} from '@coreui/react'

import usersData from '../../users/UsersData'
import CIcon from "@coreui/icons-react";




const getBadge = status => {
  switch (status) {
    case 'Active': return 'white'

    default: return 'white'
  }
}
const fields = ['name','Trạng Thái', 'Số Nội Dung', 'Ngày Tạo', 'Quản lý']

const TablesContentProviderList = () => {



  const [emailValue, setMail] = useState({
    email:'',
    password:'',
  })
  const [currentPage, setCurrentPage] = useState(1)


  return (
      <CRow className={'justify-content-between'}>
        <CCol>
          <CCard>
            <CCardBody>
            <CDataTable
              tableFilter
              items={usersData}
              fields={fields}
              itemsPerPage={10}
              pagination
              itemsPerPageSelect
              scopedSlots = {{
                'Trạng Thái':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item?.status === 'Active' ?
                        <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'} defaultChecked />
                        : <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}/>
                        }
                      </CBadge>
                    </td>
                  ),
                'Quản lý':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        <CButton block color="info" >
                          <CIcon size={'lg'} name={'cil-pencil'} />  Chỉnh sửa
                        </CButton>
                      </CBadge>
                    </td>
                  ),
              }}
            />

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
  )
}

export default TablesContentProviderList
