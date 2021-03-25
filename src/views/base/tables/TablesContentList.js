import React, {useState} from 'react'
import {
  CBadge, CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CRow, CSwitch
} from '@coreui/react'
import usersDataContentList from "../../users/UsersDataContentList";

const getBadge = status => {
  switch (status) {
    case 'Active': return 'white'
    default: return 'white'
  }
}
const fields = [
  'Tên Nội Dung',
  'Loại Nội Dung',
  'Trạng Thái Nội Dung',
  'Content Provider',
  'Ads Group',
  'Trạng Thái',
  'Ngày Cập Nhật',
  'Action']

const TablesContentProviderList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
      <CRow className={'justify-content-between'}>
        <CCol>
          <CCard>
            <CCardBody>
            <CDataTable
              items={usersDataContentList}
              fields={fields}
              itemsPerPage={10}
              pagination
              itemsPerPageSelect
              scopedSlots = {{
                'Tên Nội Dung':(item)=>(
                  <td>
                    {item?.name}
                  </td>
                ),
                'Loại Nội Dung': (item)=>(
                  <td>
                    {item?.type}
                  </td>
                ),
                'Trạng Thái Nội Dung': (item)=>(
                  <td>
                    {item?.statusContent}
                  </td>
                ),
                'Ads Group': ()=>(
                  <td>
                    <CDropdown className="m-1" disabled>
                      <CDropdownToggle>
                        default
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem disabled>Action Disabled</CDropdownItem>
                        <CDropdownItem>Action</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </td>
                ),
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
                        <CButton block color="info" >Lưu</CButton>
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
